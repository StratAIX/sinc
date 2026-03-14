// ============================================================
// Sinc - 共通ナビゲーション
// モバイル（<768px）: 下部タブバー（各ページに記述）
// デスクトップ（≥768px）: 左サイドバー（このファイルで生成）
// ============================================================

(function () {
  'use strict';

  function getCurrentPage() {
    return location.pathname.split('/').pop() || 'index.html';
  }

  function isActive(pages) {
    const current = getCurrentPage();
    return pages.includes(current) ? 'active' : '';
  }

  // ——————————————————————————————
  // テーマ管理
  // ——————————————————————————————
  function getCurrentTheme() {
    return localStorage.getItem('theme') || 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const icon  = document.getElementById('sb-theme-icon');
    const mIcon = document.getElementById('sb-theme-icon-mobile');
    const label = document.getElementById('sb-theme-label');
    const isDark = theme === 'dark';
    if (icon)  icon.textContent  = isDark ? '☀️' : '🌙';
    if (mIcon) mIcon.textContent = isDark ? '☀️' : '🌙';
    if (label) label.textContent = isDark ? 'ライトモード' : 'ダークモード';
  }

  function toggleTheme() {
    localStorage.setItem('themeUserSet', '1');
    applyTheme(getCurrentTheme() === 'light' ? 'dark' : 'light');
  }

  // ——————————————————————————————
  // サイドバー生成
  // ——————————————————————————————
  function buildSidebar() {
    const aside = document.createElement('aside');
    aside.className = 'sidebar';
    aside.id = 'main-sidebar';
    aside.setAttribute('aria-label', 'メインメニュー');

    const isDark = getCurrentTheme() === 'dark';

    aside.innerHTML = `
      <div class="sidebar-logo">
        <div class="sb-logo-text">Sinc</div>
        <div class="sb-logo-sub" data-i18n="app.tagline">あなたの本当の自分</div>
      </div>

      <div class="sidebar-user" id="sb-user" role="button" tabindex="0"
           onclick="location.href='profile.html'"
           onkeydown="if(event.key==='Enter')location.href='profile.html'">
        <div class="sb-avatar-wrap" id="sb-avatar">
          <div class="sb-avatar-emoji" style="width:36px;height:36px;border-radius:50%;background:var(--surface2);border:1px solid var(--surface3);display:flex;align-items:center;justify-content:center;font-size:1.2rem">👤</div>
        </div>
        <div class="sb-user-info">
          <div class="sb-nickname" id="sb-nickname" data-i18n="common.loading">読み込み中...</div>
          <div class="sb-type" id="sb-type"></div>
        </div>
      </div>

      <nav class="sidebar-nav" aria-label="メインナビ">
        <a href="board.html" class="sb-item ${isActive(['board.html','thread.html'])}">
          <span class="sb-icon" aria-hidden="true">💬</span>
          <span class="sb-label" data-i18n="nav.board">掲示板</span>
        </a>
        <a href="friends.html" class="sb-item ${isActive(['friends.html','chat.html','user-profile.html'])}">
          <span class="sb-icon" aria-hidden="true">👥</span>
          <span class="sb-label" data-i18n="nav.friends">フレンド</span>
          <span class="sb-badge" id="sb-badge-fr" title="未読"></span>
        </a>
        <a href="matching.html" class="sb-item ${isActive(['matching.html'])}${typeof ALPHA_MODE !== 'undefined' && ALPHA_MODE ? ' sb-item-locked' : ''}" id="sb-matching-link">
          <span class="sb-icon" aria-hidden="true">💕</span>
          <span class="sb-label" data-i18n="nav.matching">マッチング</span>
          <span class="sb-badge" id="sb-badge-match" title="未読"></span>
          ${typeof ALPHA_MODE !== 'undefined' && ALPHA_MODE ? '<span class="sb-soon">SOON</span>' : ''}
        </a>
        <a href="profile.html" class="sb-item ${isActive(['profile.html'])}">
          <span class="sb-icon" aria-hidden="true">👤</span>
          <span class="sb-label" data-i18n="nav.profile">マイページ</span>
        </a>
        <a href="doppelganger-diagnosis.index.html" class="sb-item ${isActive(['doppelganger-diagnosis.index.html'])}">
          <span class="sb-icon" aria-hidden="true">🧬</span>
          <span class="sb-label" data-i18n="nav.diagnosis">性格診断</span>
        </a>
      </nav>

      <div class="sb-points-area" id="sb-points-area" style="display:none">
        <span class="sb-points-icon">💎</span>
        <span class="sb-points-val" id="sb-points-val">0</span>
        <span class="sb-points-unit">pt</span>
      </div>

      <div class="sidebar-footer">
        <button class="sb-logout-btn" id="sb-logout-btn" type="button" data-i18n="nav.logout">ログアウト</button>
        <button class="sb-theme-btn" id="sb-theme-btn" type="button">
          <span id="sb-theme-icon">${isDark ? '☀️' : '🌙'}</span>
          <span id="sb-theme-label">${isDark ? 'ライトモード' : 'ダークモード'}</span>
        </button>
        <div class="sb-legal-links">
          <a href="legal/privacy.html" class="sb-legal-link" data-i18n="footer.privacy">プライバシーポリシー</a>
          <a href="legal/terms.html" class="sb-legal-link" data-i18n="footer.terms">利用規約</a>
        </div>
        <div class="sb-copyright">© 2026 StratAIX</div>
      </div>
    `;
    return aside;
  }

  // ページ下部フッター（モバイル用）
  function buildPageFooter() {
    const footer = document.createElement('footer');
    footer.className = 'page-footer';
    footer.innerHTML = `
      <div class="page-footer-inner">
        <div class="page-footer-links">
          <a href="legal/privacy.html" data-i18n="footer.privacy">プライバシーポリシー</a>
          <span class="pf-sep">·</span>
          <a href="legal/terms.html" data-i18n="footer.terms">利用規約</a>
        </div>
        <p class="page-footer-disclaimer" data-i18n="footer.disclaimer">本サービスの性格分析は娯楽・自己理解を目的とするものであり、医学的・心理学的診断ではありません。</p>
        <p class="page-footer-copy">© 2026 StratAIX</p>
      </div>
    `;
    return footer;
  }

  // モバイル用テーマトグルボタン
  function buildMobileThemeBtn() {
    const btn = document.createElement('button');
    btn.className = 'theme-toggle-mobile';
    btn.id = 'sb-theme-btn-mobile';
    btn.title = 'テーマ切替';
    btn.innerHTML = `<span id="sb-theme-icon-mobile">${getCurrentTheme() === 'dark' ? '☀️' : '🌙'}</span>`;
    btn.addEventListener('click', toggleTheme);
    return btn;
  }

  // モバイル用言語切替ボタン
  function buildMobileLangBtn() {
    const btn = document.createElement('button');
    btn.className = 'lang-toggle-mobile';
    btn.id = 'lang-toggle-mobile-btn';
    btn.title = '言語切替 / Switch Language';
    const lang = localStorage.getItem('doppelganger_lang') || 'ja';
    btn.textContent = lang === 'ja' ? '🇺🇸' : '🇯🇵';
    btn.addEventListener('click', () => {
      if (typeof I18n !== 'undefined') {
        const newLang = I18n.getLang() === 'ja' ? 'en' : 'ja';
        I18n.setLang(newLang);
        btn.textContent = newLang === 'ja' ? '🇺🇸' : '🇯🇵';
      }
    });
    return btn;
  }

  // ユーザー情報をサイドバーに反映
  async function loadSidebarUser() {
    try {
      if (typeof getMyProfile !== 'function') return;
      const profile = await getMyProfile();
      if (!profile) {
        // 未ログイン時、ゲストアクセス可能ページではサイドバー・ナビバーを非表示
        const page = getCurrentPage();
        if (page === 'doppelganger-diagnosis.index.html' || page === 'compat-matrix.html') {
          const sidebar = document.getElementById('main-sidebar');
          if (sidebar) sidebar.style.display = 'none';
          document.body.classList.remove('has-sidebar');
          document.querySelectorAll('.nav-bar').forEach(function(el){ el.style.display = 'none'; });
        }
        return;
      }

      const avatarEl   = document.getElementById('sb-avatar');
      const nicknameEl = document.getElementById('sb-nickname');
      const typeEl     = document.getElementById('sb-type');
      const pointsArea = document.getElementById('sb-points-area');
      const pointsVal  = document.getElementById('sb-points-val');

      if (avatarEl) {
        if (typeof renderUserAvatar === 'function') {
          avatarEl.innerHTML = renderUserAvatar(profile, 36);
        } else if (profile.avatar_url) {
          avatarEl.innerHTML = `<img src="${profile.avatar_url}" alt="" style="width:36px;height:36px;border-radius:50%;object-fit:cover">`;
        }
      }
      if (nicknameEl) {
        nicknameEl.removeAttribute('data-i18n');
        nicknameEl.textContent = profile.nickname || 'ユーザー';
      }
      if (typeEl && profile.type_name) {
        typeEl.textContent = profile.type_name;
      }
      if (pointsArea && profile.point_balance != null) {
        pointsArea.style.display = 'flex';
        if (pointsVal) pointsVal.textContent = Number(profile.point_balance).toLocaleString('ja-JP');
      }

      // マッチング解放状態をlocalStorageに保存してナビに反映
      const unlocked = !!profile.matching_unlocked;
      localStorage.setItem('doppelganger_matching', unlocked ? '1' : '0');
      window.updateMatchingNav(unlocked);
    } catch (e) { /* 無視 */ }
  }

  // ——————————————————————————————
  // αテストバナー（ALPHA_MODE=true の場合のみ表示）
  // ——————————————————————————————
  function buildAlphaBanner() {
    if (typeof ALPHA_MODE === 'undefined' || !ALPHA_MODE) return null;
    const div = document.createElement('div');
    div.id = 'alpha-top-banner';
    div.style.cssText = [
      'position:fixed', 'top:0', 'left:0', 'right:0', 'z-index:9999',
      'background:#6c5ce7', 'color:#fff', 'font-size:.72rem',
      'text-align:center', 'padding:5px 36px', 'line-height:1.5',
      'box-shadow:0 2px 8px rgba(0,0,0,.25)', 'font-weight:500'
    ].join(';');
    div.innerHTML = '🧪 <strong>αテスト実施中</strong> — 未完成の部分があります。不具合・ご意見は'
      + ' <a href="mailto:support@strataix.net" style="color:#a29bfe">support@strataix.net</a> まで'
      + '<button onclick="var b=document.getElementById(\'alpha-top-banner\');if(b)b.remove();"'
      + ' style="position:absolute;right:10px;top:50%;transform:translateY(-50%);'
      + 'background:none;border:none;color:rgba(255,255,255,.7);cursor:pointer;'
      + 'font-size:1.1rem;line-height:1;padding:0" title="閉じる">×</button>';
    return div;
  }

  // ——————————————————————————————
  // 初期化
  // ——————————————————————————————
  function init() {
    // 旧デフォルト 'dark' を 'light' に移行（ユーザーが明示的に設定していない場合のみ）
    if (!localStorage.getItem('themeUserSet')) {
      localStorage.setItem('theme', 'light');
    }
    // テーマ即時適用（チラつき防止）
    applyTheme(getCurrentTheme());

    // αバナー挿入（ALPHA_MODE=true のとき、legal/ページ以外に表示）
    if (!location.pathname.includes('/legal/')) {
      const alphaBanner = buildAlphaBanner();
      if (alphaBanner) document.body.prepend(alphaBanner);
    }

    // サイドバー挿入
    document.body.prepend(buildSidebar());
    document.body.classList.add('has-sidebar');

    // ログアウト
    const logoutBtn = document.getElementById('sb-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', async () => {
        try { if (typeof supabase !== 'undefined') await supabase.auth.signOut(); } catch (e) {}
        window.location.href = 'index.html';
      });
    }

    // テーマトグル
    const themeBtn = document.getElementById('sb-theme-btn');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    loadSidebarUser();

    // マッチング未解放なら即時非表示（localStorageで判断してチラつき防止）
    if (localStorage.getItem('doppelganger_matching') !== '1') {
      window.updateMatchingNav(false);
    }

    // フッター・モバイルテーマボタン（legal/ 配下は除外）
    // 言語切替ボタンは profile.html のみ表示（他のページではボタンと干渉するため）
    if (!location.pathname.includes('/legal/')) {
      document.body.append(buildPageFooter());
      document.body.append(buildMobileThemeBtn());
      if (getCurrentPage() === 'profile.html') {
        document.body.append(buildMobileLangBtn());
      }
    }

    // ALPHA_MODE: モバイルナビのマッチングに SOON バッジを付与
    if (typeof ALPHA_MODE !== 'undefined' && ALPHA_MODE) {
      document.querySelectorAll('.nav-bar a[href="matching.html"]').forEach(function(el) {
        el.classList.add('nav-item-soon');
        el.style.opacity = '.65';
      });
    }

    // i18n が既にロード済みなら翻訳を再適用
    if (typeof I18n !== 'undefined') I18n.applyTranslations();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // マッチングナビ表示/非表示
  window.updateMatchingNav = function (unlocked) {
    // サイドバー
    const sbMatch = document.getElementById('sb-matching-link');
    if (sbMatch) sbMatch.style.display = unlocked ? '' : 'none';
    // モバイルナビバー
    document.querySelectorAll('.nav-bar a[href="matching.html"]').forEach(function(el) {
      el.style.display = unlocked ? '' : 'none';
    });
  };

  // 通知バッジ更新（サイドバー + モバイル下部ナビ共用）
  // type: 'friends' | 'matching'
  window.updateNavBadge = function (type, count) {
    // ── サイドバーバッジ ──
    const sbMap = { friends: 'sb-badge-fr', matching: 'sb-badge-match' };
    const sbEl = document.getElementById(sbMap[type]);
    if (sbEl) {
      if (count > 0) { sbEl.textContent = count > 99 ? '99+' : count; sbEl.classList.add('show'); }
      else sbEl.classList.remove('show');
    }

    // ── モバイル下部ナビ ● ドット ──
    const hrefMap = { friends: 'friends.html', matching: 'matching.html' };
    const href = hrefMap[type];
    if (!href) return;
    document.querySelectorAll('.nav-bar a[href="' + href + '"]').forEach(function (link) {
      let dot = link.querySelector('.nav-notify-dot');
      if (count > 0) {
        if (!dot) {
          dot = document.createElement('span');
          dot.className = 'nav-notify-dot';
          link.style.position = 'relative';
          link.appendChild(dot);
        }
        dot.style.display = '';
      } else {
        if (dot) dot.style.display = 'none';
      }
    });
  };

})();
