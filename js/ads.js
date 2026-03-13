/**
 * ads.js
 * 広告管理 + ポイント付与ユーティリティ
 *
 * Web     → Google AdSense (バナー)
 * Native  → AdMob (バナー / リワード動画 / インタースティシャル)
 *
 * ポイント設計（既存 SQL に従う）:
 *   +5pt  : 動画広告視聴  (reason = 'ad_reward')
 *   -3pt  : スレ立て      (reason = 'board_create')  ← 既存設定に従い任意消費
 *   -100pt: マッチング打診 (reason = 'matching')     ← 既存設定に従い任意消費
 *
 * ポイント付与は Supabase RPC 'earn_points' を呼び出す
 */
(function() {
'use strict';

// ============================================================
// AdMob 広告ユニット ID
// アプリID: ca-app-pub-7018374006710584~2397493507
// ============================================================
const AD_IDS = {
  // iOS用（未登録のためテストIDを使用）
  ios: {
    banner:           'ca-app-pub-3940256099942544/2934735716',
    interstitial:     'ca-app-pub-3940256099942544/4411468910',
    rewarded:         'ca-app-pub-3940256099942544/1712485313',
  },
  // Android用（本番ID）
  android: {
    banner:           'ca-app-pub-7018374006710584/7147732663',
    interstitial:     'ca-app-pub-3940256099942544/1033173712', // 未作成のためテストID
    rewarded:         'ca-app-pub-7018374006710584/6084622922',
  },
};

function getAdId(type) {
  const platform = window.Platform ? window.Platform.get() : 'web';
  const ids = AD_IDS[platform];
  return ids ? ids[type] : null;
}

// ============================================================
// インタースティシャル レート制限（1分に1回まで）
// ============================================================
let _lastInterstitialTime = 0;
const INTERSTITIAL_COOLDOWN_MS = 60 * 1000; // 60秒

// ============================================================
// AdMob (Native) ユーティリティ
// ============================================================
const AdMob = {
  isReady() {
    return !!(window.admob || (window.plugins && window.plugins.AdmobPlugin));
  },

  async showBanner(position) {
    if (!this.isReady()) return;
    const plugin = window.admob || window.plugins.AdmobPlugin;
    const adId = getAdId('banner');
    if (!adId) return;
    try {
      await plugin.showBanner({
        adId,
        isTesting: true, // 本番では false に変更
        position: position || 'bottom',
      });
    } catch(e) { console.warn('[Ads] banner error:', e); }
  },

  async hideBanner() {
    if (!this.isReady()) return;
    const plugin = window.admob || window.plugins.AdmobPlugin;
    try { await plugin.hideBanner(); } catch(e) {}
  },

  async showInterstitial() {
    if (!this.isReady()) return false;
    const now = Date.now();
    if (now - _lastInterstitialTime < INTERSTITIAL_COOLDOWN_MS) return false;
    const plugin = window.admob || window.plugins.AdmobPlugin;
    const adId = getAdId('interstitial');
    if (!adId) return false;
    try {
      await plugin.prepareInterstitial({ adId, isTesting: true });
      await plugin.showInterstitial();
      _lastInterstitialTime = Date.now();
      return true;
    } catch(e) {
      console.warn('[Ads] interstitial error:', e);
      return false;
    }
  },

  /** リワード動画を表示。視聴完了 = true を返す */
  async showRewarded() {
    if (!this.isReady()) return false;
    const plugin = window.admob || window.plugins.AdmobPlugin;
    const adId = getAdId('rewarded');
    if (!adId) return false;
    return new Promise(resolve => {
      try {
        plugin.prepareRewardVideoAd({ adId, isTesting: true });
        plugin.showRewardVideoAd();
        document.addEventListener('admob.rewardvideo.events.reward', () => resolve(true), { once: true });
        document.addEventListener('admob.rewardvideo.events.close',  () => resolve(false), { once: true });
      } catch(e) {
        console.warn('[Ads] rewarded error:', e);
        resolve(false);
      }
    });
  },
};

// ============================================================
// AdSense (Web) ユーティリティ
// ============================================================
const AdSense = {
  /**
   * AdSense バナーを挿入
   * @param {string} containerId - バナーを挿入する要素の ID
   * @param {string} [slotId]    - AdSense スロット ID（省略時はプレースホルダー表示）
   */
  insertBanner(containerId, slotId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = '';

    if (!slotId) {
      // スロット未設定: プレースホルダー
      el.innerHTML = `
        <div style="background:rgba(255,255,255,.04);border:1px dashed rgba(255,255,255,.1);
          border-radius:8px;height:60px;display:flex;align-items:center;justify-content:center;
          font-size:.7rem;color:rgba(255,255,255,.2);letter-spacing:.05em">
          広告スペース
        </div>`;
      return;
    }

    // AdSense タグ挿入
    el.innerHTML = `
      <ins class="adsbygoogle"
           style="display:block;width:100%;height:60px"
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot="${slotId}"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>`;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch(e) {}
  },
};

// ============================================================
// ポイント操作 (Supabase)
// ============================================================
const Points = {
  /** ポイントを加算する */
  async earn(amount, reason, refId) {
    if (!window.supabase) return null;
    try {
      const { data, error } = await supabase.rpc('earn_points', {
        p_amount: amount,
        p_reason: reason,
        p_ref_id: refId || null,
      });
      if (error) throw error;
      return data; // 新しい残高
    } catch(e) {
      console.warn('[Points] earn error:', e);
      return null;
    }
  },

  /** ポイントを消費する（残高不足時は false を返す） */
  async spend(amount, reason, refId) {
    if (!window.supabase) return false;
    try {
      const { data, error } = await supabase.rpc('spend_points', {
        p_amount: amount,
        p_reason: reason,
        p_ref_id: refId || null,
      });
      if (error) {
        // ポイント不足エラーはメッセージで判別
        if (error.message && error.message.includes('insufficient')) return false;
        throw error;
      }
      return data !== false; // 成功
    } catch(e) {
      console.warn('[Points] spend error:', e);
      return false;
    }
  },

  /** 現在のポイント残高を取得する */
  async getBalance() {
    if (!window.supabase) return 0;
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return 0;
      const { data, error } = await supabase
        .from('users')
        .select('point_balance')
        .eq('id', user.id)
        .single();
      if (error) throw error;
      return data.point_balance || 0;
    } catch(e) {
      console.warn('[Points] getBalance error:', e);
      return 0;
    }
  },
};

// ============================================================
// 公開 API
// ============================================================
const Ads = {
  AdMob,
  AdSense,
  Points,

  /**
   * バナーを表示（プラットフォーム自動判定）
   * @param {string} containerId - Web用 DIV の ID
   * @param {string} [adsenseSlot] - AdSense スロット ID
   */
  showBanner(containerId, adsenseSlot) {
    if (window.Platform && window.Platform.isNative()) {
      AdMob.showBanner('bottom');
    } else {
      AdSense.insertBanner(containerId, adsenseSlot || null);
    }
  },

  /**
   * インタースティシャル広告を表示（ページ遷移時に呼び出す）
   * Web では何もしない（ユーザー体験を損なわないため）
   */
  async showInterstitial() {
    if (window.Platform && window.Platform.isNative()) {
      return AdMob.showInterstitial();
    }
    return false;
  },

  /**
   * リワード動画を再生してポイントを付与する
   * @param {number} [rewardPoints=5] - 付与ポイント数
   * @param {Function} [onSuccess] - 付与完了コールバック(新残高)
   * @param {Function} [onDismiss] - 途中終了コールバック
   */
  async showRewardedVideo(rewardPoints, onSuccess, onDismiss) {
    const pts = rewardPoints || 5;
    let watched = false;

    if (window.Platform && window.Platform.isNative()) {
      watched = await AdMob.showRewarded();
    } else {
      // Web: AdSense はリワード動画非対応のため、デモ用モーダルを表示
      watched = await _showWebRewardModal(pts);
    }

    if (watched) {
      const newBalance = await Points.earn(pts, 'ad_reward', null);
      if (typeof onSuccess === 'function') onSuccess(newBalance);
    } else {
      if (typeof onDismiss === 'function') onDismiss();
    }
    return watched;
  },

  Points,
};

// ============================================================
// Web 用リワード動画デモモーダル
// （本番ではAdSense動画広告に置き換え。現時点ではUI確認用）
// ============================================================
function _showWebRewardModal(pts) {
  return new Promise(resolve => {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed;inset:0;background:rgba(0,0,0,.85);
      display:flex;align-items:center;justify-content:center;
      z-index:9999;padding:20px;`;

    let countdown = 5;
    overlay.innerHTML = `
      <div style="background:#1a1a2e;border:1px solid rgba(108,92,231,.4);border-radius:16px;
        padding:28px 24px;text-align:center;max-width:320px;width:100%">
        <div style="font-size:2rem;margin-bottom:8px">📺</div>
        <div style="font-weight:700;margin-bottom:4px">動画広告</div>
        <div style="font-size:.8rem;color:rgba(255,255,255,.5);margin-bottom:20px">
          視聴完了で +${pts}pt プレゼント
        </div>
        <div style="background:rgba(255,255,255,.06);border-radius:8px;
          height:80px;display:flex;align-items:center;justify-content:center;
          font-size:.7rem;color:rgba(255,255,255,.3);margin-bottom:20px">
          広告スペース（デモ）
        </div>
        <div id="_rwCountdown" style="font-size:.85rem;color:rgba(255,255,255,.4);margin-bottom:16px">
          あと ${countdown} 秒...
        </div>
        <button id="_rwCloseBtn" disabled
          style="width:100%;padding:12px;border-radius:10px;
            background:var(--accent,#6c5ce7);color:#fff;border:none;
            font-size:.9rem;font-weight:700;cursor:not-allowed;opacity:.4;
            font-family:inherit">
          視聴完了 (+${pts}pt)
        </button>
        <button id="_rwSkipBtn"
          style="margin-top:10px;background:none;border:none;
            color:rgba(255,255,255,.3);font-size:.75rem;cursor:pointer;
            font-family:inherit">
          スキップ（ポイントなし）
        </button>
      </div>`;

    document.body.appendChild(overlay);

    const closeBtn = overlay.querySelector('#_rwCloseBtn');
    const skipBtn  = overlay.querySelector('#_rwSkipBtn');
    const cdEl     = overlay.querySelector('#_rwCountdown');

    const timer = setInterval(() => {
      countdown--;
      if (countdown <= 0) {
        clearInterval(timer);
        cdEl.textContent = '視聴完了！';
        closeBtn.disabled = false;
        closeBtn.style.opacity = '1';
        closeBtn.style.cursor = 'pointer';
      } else {
        cdEl.textContent = 'あと ' + countdown + ' 秒...';
      }
    }, 1000);

    closeBtn.addEventListener('click', () => {
      document.body.removeChild(overlay);
      resolve(true);
    });
    skipBtn.addEventListener('click', () => {
      clearInterval(timer);
      document.body.removeChild(overlay);
      resolve(false);
    });
  });
}

window.Ads = Ads;
window.Points = Ads.Points;
})();
