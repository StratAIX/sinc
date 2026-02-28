// ============================================================
// Doppelganger - 国際化 (i18n)
// 使用方法:
//   1. HTML要素に data-i18n="key" 属性を付与
//   2. このファイルをロードするだけで自動適用される
//   3. 言語の切替: I18n.setLang('en') / I18n.setLang('ja')
// ============================================================

const I18n = (() => {
  'use strict';

  // ——————————————————————————————
  // 翻訳テーブル
  // ——————————————————————————————
  const translations = {
    ja: {
      // 共通ナビ
      'nav.board':    '掲示板',
      'nav.friends':  'フレンド',
      'nav.matching': 'マッチング',
      'nav.profile':  'マイページ',
      'nav.diagnosis':'性格診断',
      'nav.logout':   'ログアウト',

      // 掲示板
      'board.title':        '掲示板',
      'board.subtitle':     'コミュニティ',
      'board.loading':      '読み込み中...',
      'board.empty':        'まだ投稿がありません',
      'board.new_thread':   '＋ スレッド作成',
      'board.new_board':    '＋ 板を作成',
      'board.categories':   'カテゴリー',
      'board.type_room':    'タイプ別',
      'board.family_room':  'ファミリー別',
      'board.back':         '戻る',

      // スレッド
      'thread.reply':       '返信',
      'thread.send':        '送信',
      'thread.placeholder': 'メッセージを入力...',
      'thread.locked':      'このスレッドはロックされています',

      // 投稿
      'post.like':    'いいね',
      'post.reply':   '返信',
      'post.report':  '通報',
      'post.delete':  '削除',

      // フレンド
      'friends.title':       'フレンド',
      'friends.subtitle':    'フレンド申請・DM管理',
      'friends.tab_friends': 'フレンド',
      'friends.tab_sent':    '申請中',
      'friends.tab_received':'受信',
      'friends.add':         'フレンドを追加',
      'friends.search_ph':   '@ユーザー名 または 招待コード',
      'friends.search':      '検索',
      'friends.invite_link': '招待リンクを共有',
      'friends.copy':        'コピー',
      'friends.empty':       'フレンドがいません',
      'friends.dm':          'DM',
      'friends.profile':     'プロフィール',
      'friends.accept':      '承認',
      'friends.reject':      '拒否',
      'friends.cancel':      'キャンセル',
      'friends.apply':       '申請する',
      'friends.pending_title':'申請中',

      // チャット
      'chat.placeholder':   'メッセージを入力...',
      'chat.send':          '送信',
      'chat.profile':       'プロフィール',

      // マッチング
      'matching.title':       'マッチング',
      'matching.mode_friend': '👫 友人を探す',
      'matching.mode_love':   '💕 恋人を探す',
      'matching.dist_all':    '無制限',
      'matching.dist_1000':   '1,000km以内',
      'matching.dist_300':    '300km以内',
      'matching.reload':      '🔄 更新',
      'matching.score_label': '相性スコア',
      'matching.legal_title': 'マッチング機能 準備中',
      'matching.legal_desc':  '法的手続き完了後に開放されます',
      'matching.candidates':  '友人候補（相性80%以上）',
      'matching.candidates_love':'恋人候補（相性80%以上）',

      // プロフィール
      'profile.title':       'マイページ',
      'profile.edit':        'プロフィール編集',
      'profile.save':        '保存',
      'profile.cancel':      'キャンセル',
      'profile.nickname':    'ニックネーム',
      'profile.bio':         '自己紹介',
      'profile.hobbies':     '趣味・興味',
      'profile.diagnosis_score': '診断スコア',

      // 性格診断
      'diagnosis.start':    '診断スタート',
      'diagnosis.subtitle': '最新AIが導き出すあなたの本当の性格',
      'diagnosis.continue': '続きから',
      'diagnosis.restart':  '最初から',
      'diagnosis.go_board': '✨ コミュニティ掲示板へ進む →',
      'diagnosis.logo_sub': 'Personality Architecture',
      'diagnosis.subtitle_html': '最新AIが導き出す<strong>あなたの本当の性格</strong>を知り、<br>最高の仲間たちと楽しめる<strong>世界唯一の掲示板</strong>へ',
      'diagnosis.start_sub': 'タイプ判定は気分や状況によって変わることがあります。定期的に受け直すことで、今の自分をより深く知れます。<br>本サービスの分析は娯楽・自己理解を目的とするものであり、医学的・心理学的診断ではありません。',
      'diagnosis.start_btn': '診断を始める',
      'diagnosis.start_info': '136問 ｜ 所要時間 約35〜45分<br>途中で戻ることもできます',

      // ログインページ
      'index.intro_html': '136の問いがあなたの思考・行動パターンを解き明かす。<br>同じ魂を持つ者たちが集う掲示板へ。',
      'auth.tab_login': 'ログイン',
      'auth.tab_register': '新規登録',
      'auth.label_email': 'メールアドレス',
      'auth.label_password': 'パスワード',
      'auth.password_hint': '8文字以上の英数字',
      'auth.password_confirm': 'パスワード（確認）',
      'auth.forgot_pw': 'パスワードを忘れた方',
      'auth.agree_html': 'アカウント作成により<a href="legal/terms.html">利用規約</a>および<a href="legal/privacy.html">プライバシーポリシー</a>に同意したものとみなされます',
      'auth.reset_title': 'パスワードリセット',
      'auth.reset_desc': '登録済みのメールアドレスを入力してください。パスワードリセット用のリンクをお送りします。',
      'auth.reset_send': '送信',
      'auth.cancel': 'キャンセル',

      // 認証
      'auth.login':    'ログイン',
      'auth.register': 'アカウント作成',
      'auth.email':    'メールアドレス',
      'auth.password': 'パスワード',
      'auth.logout':   'ログアウト',

      // アプリ・フッター
      'app.tagline':       'あなたの本当の自分',
      'footer.privacy':    'プライバシーポリシー',
      'footer.terms':      '利用規約',
      'footer.tokusho':    '特定商取引法',
      'footer.tokusho_full':'特定商取引法に基づく表示',
      'footer.disclaimer': '本サービスの性格分析は娯楽・自己理解を目的とするものであり、医学的・心理学的診断ではありません。',

      // 共通
      'common.loading': '読み込み中...',
      'common.error':   'エラーが発生しました',
      'common.ok':      'OK',
      'common.yes':     'はい',
      'common.no':      'いいえ',
    },

    en: {
      // Common nav
      'nav.board':    'Board',
      'nav.friends':  'Friends',
      'nav.matching': 'Matching',
      'nav.profile':  'My Page',
      'nav.diagnosis':'Personality Test',
      'nav.logout':   'Logout',

      // Board
      'board.title':        'Board',
      'board.subtitle':     'Community',
      'board.loading':      'Loading...',
      'board.empty':        'No posts yet',
      'board.new_thread':   '+ New Thread',
      'board.new_board':    '+ Create Board',
      'board.categories':   'Categories',
      'board.type_room':    'By Type',
      'board.family_room':  'By Family',
      'board.back':         'Back',

      // Thread
      'thread.reply':       'Reply',
      'thread.send':        'Send',
      'thread.placeholder': 'Type a message...',
      'thread.locked':      'This thread is locked',

      // Post
      'post.like':    'Like',
      'post.reply':   'Reply',
      'post.report':  'Report',
      'post.delete':  'Delete',

      // Friends
      'friends.title':       'Friends',
      'friends.subtitle':    'Friend Requests & DMs',
      'friends.tab_friends': 'Friends',
      'friends.tab_sent':    'Sent',
      'friends.tab_received':'Received',
      'friends.add':         'Add Friend',
      'friends.search_ph':   '@username or invite code',
      'friends.search':      'Search',
      'friends.invite_link': 'Share Invite Link',
      'friends.copy':        'Copy',
      'friends.empty':       'No friends yet',
      'friends.dm':          'DM',
      'friends.profile':     'Profile',
      'friends.accept':      'Accept',
      'friends.reject':      'Decline',
      'friends.cancel':      'Cancel',
      'friends.apply':       'Send Request',
      'friends.pending_title':'Pending',

      // Chat
      'chat.placeholder':   'Type a message...',
      'chat.send':          'Send',
      'chat.profile':       'Profile',

      // Matching
      'matching.title':       'Matching',
      'matching.mode_friend': '👫 Find Friends',
      'matching.mode_love':   '💕 Find Partner',
      'matching.dist_all':    'Unlimited',
      'matching.dist_1000':   'Within 1,000km',
      'matching.dist_300':    'Within 300km',
      'matching.reload':      '🔄 Refresh',
      'matching.score_label': 'Compatibility',
      'matching.legal_title': 'Matching Feature Coming Soon',
      'matching.legal_desc':  'Will be available after legal procedures are completed',
      'matching.candidates':  'Friend Candidates (80%+ match)',
      'matching.candidates_love': 'Partner Candidates (80%+ match)',

      // Profile
      'profile.title':       'My Page',
      'profile.edit':        'Edit Profile',
      'profile.save':        'Save',
      'profile.cancel':      'Cancel',
      'profile.nickname':    'Nickname',
      'profile.bio':         'Bio',
      'profile.hobbies':     'Hobbies & Interests',
      'profile.diagnosis_score': 'Diagnosis Scores',

      // Diagnosis
      'diagnosis.start':    'Start Test',
      'diagnosis.subtitle': 'Discover your true personality with AI',
      'diagnosis.continue': 'Continue',
      'diagnosis.restart':  'Start Over',
      'diagnosis.go_board': '✨ Go to Community Board →',
      'diagnosis.logo_sub': 'Personality Architecture',
      'diagnosis.subtitle_html': 'Discover <strong>your true personality</strong> with AI,<br>and join the <strong>world\'s only community board</strong> for your type',
      'diagnosis.start_sub': 'Your personality type may shift with mood or context. Retake periodically to understand yourself better.<br>This analysis is for entertainment and self-understanding, not a medical or psychological diagnosis.',
      'diagnosis.start_btn': 'Start Assessment',
      'diagnosis.start_info': '136 questions | Est. 35–45 min<br>You can go back at any time',

      // Login page
      'index.intro_html': '136 questions to reveal your thinking and behavioral patterns.<br>Join the community board of kindred souls.',
      'auth.tab_login': 'Login',
      'auth.tab_register': 'Sign Up',
      'auth.label_email': 'Email',
      'auth.label_password': 'Password',
      'auth.password_hint': 'At least 8 characters',
      'auth.password_confirm': 'Confirm Password',
      'auth.forgot_pw': 'Forgot password?',
      'auth.agree_html': 'By creating an account, you agree to our <a href="legal/terms.html">Terms of Service</a> and <a href="legal/privacy.html">Privacy Policy</a>.',
      'auth.reset_title': 'Password Reset',
      'auth.reset_desc': 'Enter your registered email address. We will send you a password reset link.',
      'auth.reset_send': 'Send',
      'auth.cancel': 'Cancel',

      // Auth
      'auth.login':    'Login',
      'auth.register': 'Create Account',
      'auth.email':    'Email',
      'auth.password': 'Password',
      'auth.logout':   'Logout',

      // App & Footer
      'app.tagline':       'Your true self',
      'footer.privacy':    'Privacy Policy',
      'footer.terms':      'Terms of Service',
      'footer.tokusho':    'Commercial Transactions',
      'footer.tokusho_full':'Commercial Transactions Act',
      'footer.disclaimer': 'The personality analysis is for entertainment and self-understanding only, not a medical or psychological diagnosis.',

      // Common
      'common.loading': 'Loading...',
      'common.error':   'An error occurred',
      'common.ok':      'OK',
      'common.yes':     'Yes',
      'common.no':      'No',
    },
  };

  // ——————————————————————————————
  // 対応地域（英語対応国 = 英語話者50%以上の国）
  // ——————————————————————————————
  const ENGLISH_REGIONS = [
    'US', 'GB', 'CA', 'AU', 'NZ', 'IE', 'PH', 'SG', 'IN',
    'NG', 'ZA', 'GH', 'KE', 'JM', 'TT',
  ];

  // ——————————————————————————————
  // 内部状態
  // ——————————————————————————————
  const STORAGE_KEY = 'doppelganger_lang';
  let currentLang = localStorage.getItem(STORAGE_KEY) || 'ja';

  // ——————————————————————————————
  // 翻訳テキストを取得
  // ——————————————————————————————
  function t(key) {
    const dict = translations[currentLang] || translations.ja;
    return dict[key] || translations.ja[key] || key;
  }

  // ——————————————————————————————
  // ページ内の data-i18n 要素を全て更新
  // ——————————————————————————————
  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const text = t(key);
      if (el.dataset.i18nAttr) {
        el.setAttribute(el.dataset.i18nAttr, text);
      } else {
        el.textContent = text;
      }
    });

    // HTMLを含む翻訳（リンクなど）
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.dataset.i18nHtml;
      el.innerHTML = t(key);
    });

    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.dataset.i18nPh;
      el.placeholder = t(key);
    });
  }

  // ——————————————————————————————
  // 言語を切替
  // ——————————————————————————————
  function setLang(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    applyTranslations();
    document.documentElement.lang = lang;

    // 言語切替ボタンの表示を更新
    const btn = document.getElementById('i18n-toggle-btn');
    if (btn) btn.textContent = lang === 'ja' ? '🇺🇸 EN' : '🇯🇵 JA';
  }

  // ——————————————————————————————
  // 位置情報から初期言語を自動判定
  // ——————————————————————————————
  async function detectLangFromGeo() {
    // すでに手動設定済みならスキップ
    if (localStorage.getItem(STORAGE_KEY)) return;

    try {
      const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) });
      const data = await res.json();
      if (ENGLISH_REGIONS.includes(data.country_code)) {
        setLang('en');
      }
    } catch (e) {
      // 位置情報取得失敗 → デフォルトは ja のまま
    }
  }

  // ——————————————————————————————
  // 言語切替ボタンを nav.js のサイドバーに追加
  // ——————————————————————————————
  function addLangToggleButton() {
    // サイドバーのフッターに追加
    const footer = document.querySelector('.sidebar-footer');
    if (!footer) return;

    const existing = document.getElementById('i18n-toggle-btn');
    if (existing) return;

    const btn = document.createElement('button');
    btn.id = 'i18n-toggle-btn';
    btn.className = 'sb-logout-btn';
    btn.style.marginBottom = '8px';
    btn.textContent = currentLang === 'ja' ? '🇺🇸 EN' : '🇯🇵 JA';
    btn.addEventListener('click', () => {
      setLang(currentLang === 'ja' ? 'en' : 'ja');
    });

    footer.insertBefore(btn, footer.firstChild);
  }

  // ——————————————————————————————
  // 初期化
  // ——————————————————————————————
  function init() {
    applyTranslations();
    detectLangFromGeo();

    // サイドバー生成後に言語ボタンを追加（少し遅延）
    setTimeout(addLangToggleButton, 200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ——————————————————————————————
  // 公開API
  // ——————————————————————————————
  return { t, setLang, applyTranslations, getLang: () => currentLang };
})();
