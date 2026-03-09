// ============================================================
// Sinc - 国際化 (i18n)
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
      'diagnosis.start_info': '136問 ｜ 所要時間 15〜30分<br>途中で戻ることもできます',

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
      'common.cancel':  'キャンセル',
      'common.save':    '保存する',
      'common.create':  '作成する',
      'common.back':    '戻る',
      'common.send':    '送信',
      'common.delete':  '削除',
      'common.report':  '通報',
      'common.search':  '検索',
      'common.copy':    'コピー',

      // 掲示板TOP（追加）
      'board.section_area':    '🚪 どのエリアに入る？',
      'board.type_room_desc':  '完全に同じタイプの人だけの密な空間',
      'board.family_desc_architects': '分析・論理・構造を愛する者たちの広場',
      'board.family_desc_mystics':    '感性・没入・世界観を共有する者たちの広場',
      'board.family_desc_commanders': '企画・攻略・情報整理で楽しむ者たちの広場',
      'board.family_desc_catalysts':  '体験・共有・盛り上がりを愛する者たちの広場',
      'board.recommend_title': '⭐ おすすめのカテゴリー',
      'board.recommend_hint':  'あなたの趣味設定に基づいています',
      'board.hobby_setup_title': '🌟 趣味を設定しよう',
      'board.hobby_setup_hint':  '趣味を設定すると、おすすめのカテゴリーが表示されます',
      'board.hobby_setup_btn':   '趣味を設定する →',
      'board.my_boards':    '📌 自分が作成した板',
      'board.posted_boards':'✏️ 書き込みした板',
      'board.viewed_boards':'👁️ 閲覧した板',
      // 板作成モーダル
      'board.create_modal_title':  '新しい板を作る',
      'board.label_board_name':    '板のタイトル',
      'board.placeholder_board_name': '例: フェス好き集まれ！',
      'board.label_board_desc':    '説明（任意）',
      'board.placeholder_board_desc': 'この板について一言',
      'board.label_board_icon':    'アイコン（絵文字1文字）',
      // スレッド作成モーダル
      'board.create_thread_title': '新しいスレッドを立てる',
      'board.label_thread_title':  'タイトル',
      'board.placeholder_thread_title': 'スレッドのタイトル',
      'board.label_thread_body':   '本文',
      'board.placeholder_thread_body':  '最初の投稿を書いてください',

      // マッチング（追加）
      'matching.test_banner': 'テストモード: サンプルユーザーとのマッチング体験です。実際の課金は発生しません。',
      'matching.unlock_title': 'マッチング機能を解放しよう',
      'matching.unlock_desc':  '年齢確認（18歳以上）を完了すると、相性の良い相手と繋がれます。<br>女性は無料・男性は¥990の機能解放パスが必要です。',
      'matching.unlock_btn':   '💕 マッチング機能を解放する',
      'matching.searching':    '候補を探しています...',
      'matching.no_candidates':'相性80%以上のユーザーが見つかりませんでした<br>距離範囲を広げるか、更新ボタンを押してみてください',
      'matching.payment_title':'🔓 マッチングする',
      'matching.payment_desc': 'この相手とマッチングすると、個人チャットが解放されます。',
      'matching.payment_fee':  'マッチング打診料',
      'matching.store_fee':    'App Store / Google Play 手数料',
      'matching.total':        '合計',
      'matching.confirm_btn':  '💳 打診する（¥990）',
      'matching.success_title':'マッチ成立！',
      'matching.success_desc': 'おめでとうございます！<br>個人チャットが解放されました。<br>メッセージを送ってみましょう。',
      'matching.go_chat_btn':  '💬 チャットを始める',
      'matching.back_list_btn':'候補一覧に戻る',
      'matching.unlock_request':'🔓 マッチングを解放して打診する',
      'matching.open_chat':    '💬 チャットを開く',

      // プロフィール（追加）
      'profile.welcome_title': 'ようこそ！',
      'profile.welcome_desc':  'まず、あなたのプロフィールを設定しましょう。<br>その後、性格診断へと進みます。',
      'profile.edit_title':    '✏️ プロフィール編集',
      'profile.setup_title':   '🎨 プロフィール設定',
      'profile.avatar_label':  'アイコン画像',
      'profile.avatar_hint':   'アップロード後に範囲を指定できます',
      'profile.select_image':  '📷 画像を選択',
      'profile.username_label':'アカウントID（必須・変更不可）',
      'profile.username_hint': '一度設定したら変更できません',
      'profile.nickname_label':'ニックネーム（必須）',
      'profile.bio_label':     '自己紹介（任意）',
      'profile.gender_label':  '性別（任意・マッチングで使用）',
      'profile.gender_male':   '👨 男性',
      'profile.gender_female': '👩 女性',
      'profile.gender_other':  '🧑 その他',
      'profile.gender_private':'🔒 非公開',
      'profile.gender_hint':   'マッチング相手の絞り込みに使用されます。後から変更可能です。',
      'profile.hobbies_label': '好きなカテゴリー（最大3つ）',
      'profile.hobbies_hint':  '掲示板のTOPに、選んだカテゴリーが優先表示されます。',
      'profile.crop_title':    'アイコンの範囲を選択',
      'profile.crop_hint':     'ドラッグで位置・ピンチ（スクロール）で拡大縮小',
      'profile.history_title': '診断履歴（直近3回）',
      'profile.scores_title':  '診断スコア（非公開）',
      'profile.show_more':     'もっと見る ▼',
      'profile.show_less':     '閉じる ▲',
      'profile.post_count':    '投稿数',
      'profile.likes_received':'もらった ❤️',
      'profile.verify_title':  '🪪 本人確認',
      'profile.verify_desc':   'マッチング機能を利用するには18歳以上であることの確認が必要です。',
      'profile.age_check':     '私は18歳以上です',
      'profile.verify_later':  '後で行う',
      'profile.verify_confirm':'確認完了',
      'profile.verified_banner':'本人確認済み',
      'profile.verified_desc': 'マッチング機能が利用できます',
      'profile.unverified_banner':'本人確認が未完了',
      'profile.unverified_desc':'マッチング機能を利用するには年齢確認が必要です',
      'profile.retake_label':  '診断をやり直す',
      'profile.to_board_label':'掲示板へ',
      'profile.set_hobbies':   '趣味・カテゴリーを設定',
      'profile.share_results': '診断結果をシェア',
      'profile.history_latest':'最新',
      'profile.history_prev1': '1回前',
      'profile.history_prev2': '2回前',
      'profile.menu_title':    'メニュー',
      'profile.crop_confirm':  'この範囲で決定',
      'profile.verify_open':   '確認する',
      'profile.edit_btn':      '✏️ プロフィール編集',
      'profile.verify_desc_full': 'マッチング機能を利用するには18歳以上であることの確認が必要です。<br><small>※ 出会い系サイト規制法に基づく義務です。</small>',
      'profile.unlock_matching_btn':     '💕 マッチング機能を解放する',
      'profile.unlock_matching_confirm': 'マッチング機能を解放しますか？\n（掲示板でフレンドを作り、個人チャットとマッチングが利用可能になります）',
      'profile.matching_unlocked_label': '✅ マッチング解放済み',

      // フレンド（追加）
      'friends.page_title':   '👥 フレンド',
      'friends.page_subtitle':'フレンド申請・DM管理',
      'friends.add_title':    'フレンドを追加',
      'friends.search_label': 'IDで検索',

      // スレッド（追加）
      'thread.reply_placeholder': '返信を書く...',
      'thread.pinned':     '📌 固定スレッド',
      'thread.locked_tag': '🔒 ロック中',
      'thread.locked_notice': '🔒 このスレッドはロックされています',
      'thread.no_posts':   'まだ投稿がありません',
      'thread.delete_confirm': 'この投稿を削除しますか？',

      // 掲示板追加キー
      'board.threads_list': 'スレッド一覧',
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
      'diagnosis.start_info': '136 questions | Est. 15–30 min<br>You can go back at any time',

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
      'common.cancel':  'Cancel',
      'common.save':    'Save',
      'common.create':  'Create',
      'common.back':    'Back',
      'common.send':    'Send',
      'common.delete':  'Delete',
      'common.report':  'Report',
      'common.search':  'Search',
      'common.copy':    'Copy',

      // Board TOP (added)
      'board.section_area':    '🚪 Which area would you like to enter?',
      'board.type_room_desc':  'An intimate space exclusively for people of your exact type',
      'board.family_desc_architects': 'A plaza for those who love analysis, logic, and structure',
      'board.family_desc_mystics':    'A plaza for those who share sensibility, immersion, and world-views',
      'board.family_desc_commanders': 'A plaza for those who enjoy planning, strategy, and information',
      'board.family_desc_catalysts':  'A plaza for those who love experiences, sharing, and excitement',
      'board.recommend_title': '⭐ Recommended Categories',
      'board.recommend_hint':  'Based on your hobby settings',
      'board.hobby_setup_title': '🌟 Set Up Your Hobbies',
      'board.hobby_setup_hint':  'Set your hobbies to see recommended categories',
      'board.hobby_setup_btn':   'Set Hobbies →',
      'board.my_boards':    '📌 My Created Boards',
      'board.posted_boards':'✏️ Boards I Posted In',
      'board.viewed_boards':'👁️ Recently Viewed',
      // Board create modal
      'board.create_modal_title':  'Create a New Board',
      'board.label_board_name':    'Board Title',
      'board.placeholder_board_name': 'e.g. Festival Lovers Unite!',
      'board.label_board_desc':    'Description (optional)',
      'board.placeholder_board_desc': 'A brief description of this board',
      'board.label_board_icon':    'Icon (single emoji)',
      // Thread create modal
      'board.create_thread_title': 'Create a New Thread',
      'board.label_thread_title':  'Title',
      'board.placeholder_thread_title': 'Thread title',
      'board.label_thread_body':   'Content',
      'board.placeholder_thread_body':  'Write your first post',

      // Matching (added)
      'matching.test_banner': 'Test mode: This is a sample experience. No actual payment will be charged.',
      'matching.unlock_title': 'Unlock Matching Feature',
      'matching.unlock_desc':  'Complete age verification (18+) to connect with compatible people.<br>Free for women · ¥990 access pass required for men.',
      'matching.unlock_btn':   '💕 Unlock Matching Feature',
      'matching.searching':    'Searching for candidates...',
      'matching.no_candidates':'No users with 80%+ compatibility found<br>Try expanding the distance range or tap Refresh',
      'matching.payment_title':'🔓 Match with This Person',
      'matching.payment_desc': 'Matching with this person will unlock a private chat.',
      'matching.payment_fee':  'Matching fee',
      'matching.store_fee':    'App Store / Google Play fee',
      'matching.total':        'Total',
      'matching.confirm_btn':  '💳 Send Match Request (¥990)',
      'matching.success_title':'It\'s a Match! 🎉',
      'matching.success_desc': 'Congratulations!<br>Private chat has been unlocked.<br>Send them a message!',
      'matching.go_chat_btn':  '💬 Start Chat',
      'matching.back_list_btn':'Back to Candidates',
      'matching.unlock_request':'🔓 Unlock & Send Match Request',
      'matching.open_chat':    '💬 Open Chat',

      // Profile (added)
      'profile.welcome_title': 'Welcome!',
      'profile.welcome_desc':  'Let\'s set up your profile first.<br>Then you can proceed to the personality test.',
      'profile.edit_title':    '✏️ Edit Profile',
      'profile.setup_title':   '🎨 Profile Setup',
      'profile.avatar_label':  'Profile Picture',
      'profile.avatar_hint':   'You can crop the image after uploading',
      'profile.select_image':  '📷 Select Image',
      'profile.username_label':'Account ID (required, cannot be changed)',
      'profile.username_hint': 'Cannot be changed once set',
      'profile.nickname_label':'Nickname (required)',
      'profile.bio_label':     'Bio (optional)',
      'profile.gender_label':  'Gender (optional, used for matching)',
      'profile.gender_male':   '👨 Male',
      'profile.gender_female': '👩 Female',
      'profile.gender_other':  '🧑 Other',
      'profile.gender_private':'🔒 Private',
      'profile.gender_hint':   'Used to filter matching candidates. Can be changed later.',
      'profile.hobbies_label': 'Favorite Categories (up to 3)',
      'profile.hobbies_hint':  'Selected categories will be prioritized on the board top.',
      'profile.crop_title':    'Select Profile Picture Area',
      'profile.crop_hint':     'Drag to move · Pinch/scroll to zoom',
      'profile.history_title': 'Test History (Last 3)',
      'profile.scores_title':  'Diagnosis Scores (Private)',
      'profile.show_more':     'Show More ▼',
      'profile.show_less':     'Collapse ▲',
      'profile.post_count':    'Posts',
      'profile.likes_received':'Likes Received ❤️',
      'profile.verify_title':  '🪪 Age Verification',
      'profile.verify_desc':   'You must be 18 or older to use the matching feature.',
      'profile.age_check':     'I am 18 or older',
      'profile.verify_later':  'Do it later',
      'profile.verify_confirm':'Verify',
      'profile.verified_banner':'Verified ✓',
      'profile.verified_desc': 'You can use the matching feature',
      'profile.unverified_banner':'Not Verified',
      'profile.unverified_desc':'Age verification is required to use matching',
      'profile.retake_label':  'Retake the Test',
      'profile.to_board_label':'Go to Board',
      'profile.set_hobbies':   'Set Hobbies & Categories',
      'profile.share_results': 'Share Results',
      'profile.history_latest':'Latest',
      'profile.history_prev1': '1 test ago',
      'profile.history_prev2': '2 tests ago',
      'profile.menu_title':    'Menu',
      'profile.crop_confirm':  'Confirm Crop',
      'profile.verify_open':   'Verify',
      'profile.edit_btn':      '✏️ Edit Profile',
      'profile.verify_desc_full': 'You must be 18 or older to use the matching feature.<br><small>※ Required by the Dating Site Regulation Law.</small>',
      'profile.unlock_matching_btn':     '💕 Unlock Matching Feature',
      'profile.unlock_matching_confirm': 'Unlock matching?\n(Make friends on the board to use personal chat and matching.)',
      'profile.matching_unlocked_label': '✅ Matching Unlocked',

      // Friends (added)
      'friends.page_title':   '👥 Friends',
      'friends.page_subtitle':'Friend Requests & DM Management',
      'friends.add_title':    'Add a Friend',
      'friends.search_label': 'Search by ID',

      // Thread (added)
      'thread.reply_placeholder': 'Write a reply...',
      'thread.pinned':     '📌 Pinned Thread',
      'thread.locked_tag': '🔒 Locked',
      'thread.locked_notice': '🔒 This thread is locked',
      'thread.no_posts':   'No posts yet',
      'thread.delete_confirm': 'Are you sure you want to delete this post?',

      // Board extra keys
      'board.threads_list': 'Thread List',
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

    // デスクトップ言語ボタンを更新
    const btn = document.getElementById('i18n-toggle-btn');
    if (btn) btn.textContent = lang === 'ja' ? '🇺🇸 EN' : '🇯🇵 JA';

    // モバイル言語ボタンを更新
    const mobileBtn = document.getElementById('lang-toggle-mobile-btn');
    if (mobileBtn) mobileBtn.textContent = lang === 'ja' ? '🇺🇸' : '🇯🇵';

    // ログインページの言語ボタンを更新
    const authBtn = document.getElementById('auth-lang-btn');
    if (authBtn) authBtn.textContent = lang === 'ja' ? '🇺🇸 EN' : '🇯🇵 JA';
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
