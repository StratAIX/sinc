// ============================================================
// Doppelganger - 共通ナビゲーション
// モバイル（<768px）: 下部タブバー（各ページに記述）
// デスクトップ（≥768px）: 左サイドバー（このファイルで生成）
// ============================================================

(function () {
  'use strict';

  // 現在のページファイル名を取得
  function getCurrentPage() {
    return location.pathname.split('/').pop() || 'index.html';
  }

  // nav-itemのアクティブクラス判定
  function isActive(pages) {
    const current = getCurrentPage();
    return pages.includes(current) ? 'active' : '';
  }

  // サイドバーHTMLを生成して返す
  function buildSidebar() {
    const aside = document.createElement('aside');
    aside.className = 'sidebar';
    aside.id = 'main-sidebar';
    aside.setAttribute('aria-label', 'メインメニュー');

    aside.innerHTML = `
      <div class="sidebar-logo">
        <div class="sb-logo-text">Doppelganger</div>
        <div class="sb-logo-sub">あなたの本当の自分</div>
      </div>

      <div class="sidebar-user" id="sb-user" role="button" tabindex="0" onclick="location.href='profile.html'" onkeydown="if(event.key==='Enter')location.href='profile.html'">
        <div class="sb-avatar-wrap" id="sb-avatar">
          <div class="sb-avatar-emoji" style="width:36px;height:36px;border-radius:50%;background:var(--surface2);border:1px solid var(--surface3);display:flex;align-items:center;justify-content:center;font-size:1.2rem">👤</div>
        </div>
        <div class="sb-user-info">
          <div class="sb-nickname" id="sb-nickname">読み込み中...</div>
          <div class="sb-type" id="sb-type"></div>
        </div>
      </div>

      <nav class="sidebar-nav" aria-label="メインナビ">
        <a href="board.html" class="sb-item ${isActive(['board.html', 'thread.html'])}">
          <span class="sb-icon" aria-hidden="true">💬</span>
          <span class="sb-label">掲示板</span>
        </a>
        <a href="friends.html" class="sb-item ${isActive(['friends.html', 'chat.html', 'user-profile.html'])}">
          <span class="sb-icon" aria-hidden="true">👥</span>
          <span class="sb-label">フレンド</span>
          <span class="sb-badge" id="sb-badge-fr" title="未読"></span>
        </a>
        <a href="matching.html" class="sb-item ${isActive(['matching.html'])}">
          <span class="sb-icon" aria-hidden="true">💕</span>
          <span class="sb-label">マッチング</span>
        </a>
        <a href="profile.html" class="sb-item ${isActive(['profile.html'])}">
          <span class="sb-icon" aria-hidden="true">👤</span>
          <span class="sb-label">マイページ</span>
        </a>
        <a href="doppelganger-diagnosis.index.html" class="sb-item ${isActive(['doppelganger-diagnosis.index.html'])}">
          <span class="sb-icon" aria-hidden="true">🧬</span>
          <span class="sb-label">性格診断</span>
        </a>
      </nav>

      <div class="sb-points-area" id="sb-points-area" style="display:none">
        <span class="sb-points-icon">💎</span>
        <span class="sb-points-val" id="sb-points-val">0</span>
        <span class="sb-points-unit">pt</span>
      </div>

      <div class="sidebar-footer">
        <button class="sb-logout-btn" id="sb-logout-btn" type="button">ログアウト</button>
      </div>
    `;
    return aside;
  }

  // ユーザー情報を非同期でサイドバーに反映
  async function loadSidebarUser() {
    try {
      if (typeof getMyProfile !== 'function') return;
      const profile = await getMyProfile();
      if (!profile) return;

      const avatarEl = document.getElementById('sb-avatar');
      const nicknameEl = document.getElementById('sb-nickname');
      const typeEl = document.getElementById('sb-type');
      const pointsArea = document.getElementById('sb-points-area');
      const pointsVal = document.getElementById('sb-points-val');

      if (avatarEl) {
        if (typeof renderUserAvatar === 'function') {
          avatarEl.innerHTML = renderUserAvatar(profile, 36);
        } else if (profile.avatar_url) {
          avatarEl.innerHTML = `<img src="${profile.avatar_url}" alt="" style="width:36px;height:36px;border-radius:50%;object-fit:cover">`;
        }
      }
      if (nicknameEl) {
        nicknameEl.textContent = profile.nickname || 'ユーザー';
      }
      if (typeEl && profile.type_name) {
        typeEl.textContent = profile.type_name;
      }
      if (pointsArea && profile.point_balance != null) {
        pointsArea.style.display = 'flex';
        if (pointsVal) pointsVal.textContent = Number(profile.point_balance).toLocaleString('ja-JP');
      }
    } catch (e) {
      // ログインしていない場合などは無視
    }
  }

  // ——————————————————————————————
  // 初期化
  // ——————————————————————————————
  function init() {
    // サイドバーを body の先頭に挿入
    const sidebar = buildSidebar();
    document.body.prepend(sidebar);
    document.body.classList.add('has-sidebar');

    // ログアウトボタン
    const logoutBtn = document.getElementById('sb-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', async () => {
        try {
          if (typeof supabase !== 'undefined') {
            await supabase.auth.signOut();
          }
        } catch (e) { /* 無視 */ }
        window.location.href = 'index.html';
      });
    }

    // ユーザー情報を非同期でロード
    loadSidebarUser();
  }

  // DOMロード後に実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ——————————————————————————————
  // 通知バッジ更新（Phase 2以降で使用）
  // ——————————————————————————————
  window.updateNavBadge = function (type, count) {
    const map = { friends: 'sb-badge-fr' };
    const el = document.getElementById(map[type]);
    if (!el) return;
    if (count > 0) {
      el.textContent = count > 99 ? '99+' : count;
      el.classList.add('show');
    } else {
      el.classList.remove('show');
    }
  };

})();
