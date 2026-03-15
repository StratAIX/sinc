// ============================================================
// Sinc - Supabase 接続設定
// ============================================================

// AdSense（全ページ共通読み込み）
(function(){
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7018374006710584';
  s.setAttribute('crossorigin','anonymous');
  document.head.appendChild(s);
})();

// ============================================================
// アルファ版フラグ — false に変更するだけで全機能解放
// ============================================================
const ALPHA_MODE = true;

const SUPABASE_URL = 'https://ddabcnvxdheuyeqelffx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkYWJjbnZ4ZGhldXllcWVsZmZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2NDY5NTYsImV4cCI6MjA4NzIyMjk1Nn0.211clga5DD-BvSosAosGVa04QBL3SdEQuQlC6do--C4';

// ※ const → var に変更（CDNのSDKと変数名が衝突するため）
var supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================================
// 共通ユーティリティ
// ============================================================

async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}

let _cachedProfile = null;
async function getMyProfile(forceRefresh = false) {
  if (_cachedProfile && !forceRefresh) return _cachedProfile;
  const user = await getCurrentUser();
  if (!user) return null;
  try {
    _cachedProfile = await getUserProfile(user.id);
  } catch (e) {
    // users行が存在しない場合（Google OAuth新規ユーザー等 / 退会後の再ログイン）は自動作成
    if (e.code === 'PGRST116') {
      const agreedAt = localStorage.getItem('sincAlphaAgreedAt') || new Date().toISOString();
      await supabase.from('users').insert({ id: user.id, alpha_agreed_at: agreedAt }).select().single();
      const { data } = await supabase.from('users').select('*').eq('id', user.id).single();
      _cachedProfile = data;
    } else {
      throw e;
    }
  }

  // BANされたアカウントは強制サインアウト
  if (_cachedProfile?.ban_status === 'banned') {
    _cachedProfile = null;
    await supabase.auth.signOut();
    alert('このアカウントは利用停止中です。\nご不明な点は support@strataix.net までお問い合わせください。');
    location.href = 'index.html';
    return null;
  }

  return _cachedProfile;
}

function clearProfileCache() {
  _cachedProfile = null;
}

function onAuthChange(callback) {
  supabase.auth.onAuthStateChange((event, session) => {
    clearProfileCache();
    callback(event, session);
  });
}

// ============================================================
// ゲスト診断結果の自動同期（ログイン/新規登録時）
// ============================================================
supabase.auth.onAuthStateChange(async (event, session) => {
  if (event === 'SIGNED_IN' && session?.user) {
    const userId = session.user.id;

    // ── ゲスト診断結果の自動同期 ──────────────────────────────
    try {
      const raw = localStorage.getItem('sincGuestResult');
      if (raw) {
        const g = JSON.parse(raw);
        if (g && g.code) {
          const { data: existing } = await supabase
            .from('users').select('diagnosis_completed_at').eq('id', userId).single();
          if (!(existing?.diagnosis_completed_at &&
              new Date(existing.diagnosis_completed_at) > new Date(g.timestamp || 0))) {
            const { error } = await supabase.from('users').update({
              type_code: g.code,
              type_number: g.typeNumber,
              type_name: g.typeName,
              family: g.family,
              diagnosis_scores: g.scores,
              diagnosis_completed_at: new Date(g.timestamp || Date.now()).toISOString(),
            }).eq('id', userId);
            if (!error) localStorage.removeItem('sincGuestResult');
          } else {
            localStorage.removeItem('sincGuestResult');
          }
        }
      }
    } catch(e) { /* サイレント */ }

    // ── 招待リンク経由フレンド自動登録 ───────────────────────
    try {
      const inviterId = localStorage.getItem('sincPendingRef');
      if (inviterId && inviterId !== userId) {
        // 既にフレンド関係がないか確認
        const { data: existing } = await supabase
          .from('friends')
          .select('id')
          .or(`and(requester_id.eq.${inviterId},receiver_id.eq.${userId}),and(requester_id.eq.${userId},receiver_id.eq.${inviterId})`)
          .maybeSingle();
        if (!existing) {
          await supabase.from('friends').insert({
            requester_id: userId,   // auth.uid()=自分がrequesterでないとRLSに弾かれる
            receiver_id: inviterId,
            status: 'accepted',
            source: 'invite',
          });
        }
        localStorage.removeItem('sincPendingRef');
      }
    } catch(e) { /* サイレント */ }
  }
});

// ブロック済みユーザーIDリストを取得（セッション内キャッシュあり）
let _blockedIdsCache = null;
async function getBlockedUserIds() {
  if (_blockedIdsCache !== null) return _blockedIdsCache;
  const user = await getCurrentUser();
  if (!user) return (_blockedIdsCache = []);
  const { data } = await supabase
    .from('friends')
    .select('receiver_id')
    .eq('requester_id', user.id)
    .eq('status', 'blocked');
  _blockedIdsCache = (data || []).map(r => r.receiver_id);
  return _blockedIdsCache;
}
// ブロックキャッシュをリセット（ブロック/解除操作後に呼ぶ）
function clearBlockedCache() { _blockedIdsCache = null; }

async function requireAuth(redirectTo = 'index.html') {
  const user = await getCurrentUser();
  if (!user) {
    window.location.href = redirectTo;
    return null;
  }
  return user;
}

async function requireDiagnosis(redirectTo = 'doppelganger-diagnosis.index.html') {
  const profile = await getMyProfile(true); // 常にDBから最新を取得（キャッシュ不使用）
  if (!profile || !profile.diagnosis_completed_at) {
    window.location.href = redirectTo;
    return null;
  }
  return profile;
}

function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'fadeOut .3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

function timeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'たった今';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}分前`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}時間前`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}日前`;

  return date.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' });
}

function familyClass(family) {
  return family ? `badge-${family.toLowerCase()}` : '';
}

function familyColor(family) {
  const colors = {
    Architects: 'var(--fam-architects)',
    Mystics: 'var(--fam-mystics)',
    Commanders: 'var(--fam-commanders)',
    Catalysts: 'var(--fam-catalysts)',
  };
  return colors[family] || 'var(--fam-architects)';
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

async function updateMyProfile(updates) {
  const user = await getCurrentUser();
  if (!user) throw new Error('ログインが必要です');

  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', user.id)
    .select()
    .single();

  if (error) throw error;
  clearProfileCache();
  return data;
}

function renderUserAvatar(user, sizePx = 32) {
  if (user && user.avatar_url) {
    return `<img src="${escapeHtml(user.avatar_url)}" alt="" class="user-avatar" style="width:${sizePx}px;height:${sizePx}px" loading="lazy">`;
  }
  const emoji = typeof getTypeEmoji === 'function' ? getTypeEmoji(user?.type_number) : '👤';
  const fam = user?.family || 'Architects';
  return `<div class="user-avatar user-avatar-emoji" style="width:${sizePx}px;height:${sizePx}px;background:rgba(${_familyColorRGB(fam)},.12);border:1px solid rgba(${_familyColorRGB(fam)},.3);font-size:${Math.round(sizePx * 0.55)}px">${emoji}</div>`;
}

function _familyColorRGB(family) {
  const c = {
    Architects: '108,92,231',
    Mystics: '232,67,147',
    Commanders: '0,184,148',
    Catalysts: '253,203,110'
  };
  return c[family] || '108,92,231';
}

async function initNavUser() {
  try {
    const profile = await getMyProfile();
    if (!profile) return;

    const avatarEl = document.getElementById('nav-my-avatar');
    const nameEl = document.getElementById('nav-my-name');
    if (avatarEl) {
      if (profile.avatar_url) {
        avatarEl.innerHTML = `<img src="${escapeHtml(profile.avatar_url)}" alt="" class="nav-avatar-img">`;
      } else if (profile.type_number) {
        avatarEl.textContent = getTypeEmoji(profile.type_number);
      }
    }
    if (nameEl && profile.nickname) {
      nameEl.textContent = profile.nickname;
    }
  } catch(e) {
    // 未ログイン等は無視
  }
}

// ============================================================
// メンテナンスモードチェック（全ページ共通）
// ============================================================
async function checkMaintenanceMode() {
  try {
    const { data } = await supabase
      .from('maintenance_mode')
      .select('*')
      .order('id')
      .limit(1)
      .single();
    if (!data || !data.is_active) return null;
    const now = new Date();
    if (data.start_at && now < new Date(data.start_at)) return null;
    if (data.end_at && now > new Date(data.end_at)) return null;
    return data;
  } catch(e) {
    return null;
  }
}

// ページロード時に自動チェック（admin / profile / index はスキップ）
(async function() {
  const filename = location.pathname.split('/').pop() || 'index.html';
  // admin: 管理者作業用、profile: メンテ中もマイページは見られる、index: 独自バナーあり
  if (['admin.html','profile.html','index.html'].includes(filename)) return;

  const m = await checkMaintenanceMode();
  if (!m) return;

  // 管理者はバイパス
  try {
    const me = await getMyProfile();
    if (me?.is_admin) return;
  } catch(e) {}

  // メンテ中 → リダイレクトせず、その場でオーバーレイを表示
  function fmtJa(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    return `${d.getMonth()+1}月${d.getDate()}日 ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  }
  const endText = m.end_at ? `<div style="font-size:.78rem;color:rgba(255,255,255,.45);margin-top:12px">終了予定: ${fmtJa(m.end_at)}</div>` : '';
  const overlay = document.createElement('div');
  overlay.id = 'maint-overlay';
  overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:99999;background:rgba(14,10,28,.96);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px;text-align:center';
  overlay.innerHTML = `
    <div style="font-size:2.8rem;margin-bottom:18px">🔧</div>
    <div style="font-size:1.15rem;font-weight:800;color:#fff;margin-bottom:14px">メンテナンス中</div>
    <div style="font-size:.88rem;color:rgba(255,255,255,.68);line-height:1.8;max-width:300px">
      ${m.message ? m.message.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>') : 'サービスを一時停止しています。<br>しばらくお待ちください。'}
    </div>
    ${endText}
  `;
  document.body.appendChild(overlay);
})();
