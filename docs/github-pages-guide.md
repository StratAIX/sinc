# GitHub Pages 公開ガイド（GitHub Desktop 版）

## 現在の環境（2026-03-02 確定）
- **GitHubユーザー**: StratAIX
- **リポジトリ**: `https://github.com/StratAIX/sinc`（Public）
- **ローカルクローン**: `C:\Users\hondo\OneDrive\ドキュメント\PJドッペルゲンガー\github`
- **GitHub Pages URL**: `https://strataix.github.io/sinc/`
- **カスタムドメイン**: `sinc.strataix.net`（CNAME設定済み）

---

## GitHub Desktop でのプッシュ手順

### 毎回のファイル更新フロー

1. **GitHub Desktop を開く**
2. 左側の「Changes」タブに変更ファイルが表示されていることを確認
3. 左下の「Summary」欄にコミットメッセージを入力
   - 例: `feat: 課金・広告・ポイントシステム実装`
4. **「Commit to main」** ボタンをクリック
5. 右上の **「Push origin」** ボタンをクリック
6. GitHub の `StratAIX/sinc` リポジトリを確認し、ファイルが更新されていればOK

---

## GitHub Pages の設定確認（初回のみ）

1. `https://github.com/StratAIX/sinc` を開く
2. 上部タブ「Settings」→ 左サイドバー「Pages」をクリック
3. **Build and deployment** を確認:
   - **Source**: 「Deploy from a branch」
   - **Branch**: 「main」、フォルダ「/ (root)」
4. **Custom domain** 欄に `sinc.strataix.net` と入力して「Save」
   - ⚠️ DNS 伝播まで最大48時間かかる場合がある
5. `Enforce HTTPS` にチェックを入れる（ある場合）

---

## 各ページURL

| ページ | GitHub Pages URL | カスタムドメイン |
|-------|-----------------|--------------|
| ログイン | `https://strataix.github.io/sinc/` | `https://sinc.strataix.net/` |
| 性格診断 | `.../doppelganger-diagnosis.index.html` | 同左 |
| 掲示板 | `.../board.html` | 同左 |
| マッチング | `.../matching.html` | 同左 |
| 32タイプ一覧 | `.../types.html` | 同左 |

---

## アップロードが必要なファイル一覧（全量プッシュ時）

```
【HTMLページ】
index.html
doppelganger-diagnosis.index.html
board.html
thread.html
matching.html
matching-unlock.html
profile.html
friends.html
chat.html
user-profile.html
types.html
CNAME

【フォルダ】
css/         → common.css
js/          → supabase-config.js, auth.js, nav.js, i18n.js,
               diagnosis-en.js, board.js, matching.js,
               platform.js, payment.js, ads.js,
               moderation.js, avatar.js
sql/         → schema.sql, add-board-features.sql,
               add-friends-dms.sql, add-matching-features.sql,
               add-matching-unlock.sql, add-payment-method.sql,
               add-username-history.sql
docs/        → このファイル群
```

⚠️ **アップロード不要なもの**:
- `.git/` フォルダ
- `CLAUDE.md`（開発者メモ）
- `.claude/` フォルダ

---

## Supabase 設定（デプロイ後に必要）

1. `js/supabase-config.js` の `SUPABASE_URL` と `SUPABASE_ANON_KEY` を本番値に設定
2. Supabase Dashboard で `sql/` 内のSQLを順番に実行:
   - `schema.sql` → `add-board-features.sql` → `add-friends-dms.sql`
   - `add-matching-features.sql` → `add-matching-unlock.sql`
   - `add-payment-method.sql`（★最新・未実行）
3. Supabase の Authentication → URL Configuration で `sinc.strataix.net` を許可

---

## Stripe / AdMob 設定（本番リリース時）

- `js/payment.js`: `stripePriceId` の `price_XXXX` を本番Price IDに差し替え
- `js/ads.js`: `AD_IDS` のテスト用IDを本番AdMob IDに差し替え
- `js/ads.js`: `data-ad-client` の `ca-pub-XXXX` を本番AdSense Publisher IDに差し替え
- Supabase Edge Functions に `create-checkout-session` をデプロイ

---

## よくあるトラブル

| 症状 | 原因 | 対処 |
|-----|------|------|
| 404 Not Found | Pages未有効化 / デプロイ中 | Settings→Pages確認・2分待つ |
| デザイン崩れ | `css/` フォルダ未プッシュ | GitHub上でcssfォルダの存在確認 |
| ログイン不可 | Supabase URL未設定 | `supabase-config.js` 確認 |
| カスタムドメイン不可 | DNS未伝播 | 最大48時間待つ |
