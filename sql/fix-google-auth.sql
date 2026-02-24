-- ============================================================
-- Google OAuth 対応 SQL
-- Supabase SQL Editor で実行してください
-- ============================================================

-- ============================================================
-- STEP 1: auth.users 登録時に users テーブルを自動作成するトリガー
-- Google OAuth / メール両方で動作します
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER AS $$
BEGIN
  -- users テーブルに行が存在しない場合のみ INSERT
  INSERT INTO public.users (id, created_at, updated_at)
  VALUES (NEW.id, NOW(), NOW())
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- auth.users への INSERT 後に実行
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_auth_user();

-- ============================================================
-- STEP 2: 既存の auth.users に対応する users 行がない場合の補完
-- 既存ユーザーで欠落があるときに1回だけ実行してください
-- ============================================================

INSERT INTO public.users (id, created_at, updated_at)
SELECT id, created_at, NOW()
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.users)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- STEP 3: マッチング解放フロー用に birthdate カラムを追加
-- add-matching-features.sql を実行済みの場合のみ必要
-- ============================================================
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS birthdate DATE;  -- 生年月日（マッチング年齢確認用）

-- ============================================================
-- Supabase Dashboard 設定手順（SQL ではなく管理画面で設定）
-- ============================================================
-- 1. Supabase Dashboard → Authentication → Providers → Google を有効化
-- 2. Google Cloud Console で OAuth 2.0 クライアントを作成
--    - 承認済みリダイレクト URI:
--      https://<your-project>.supabase.co/auth/v1/callback
-- 3. Client ID / Client Secret を Supabase の Google プロバイダー設定に貼り付け
-- 4. Supabase Dashboard → Authentication → URL Configuration:
--    - Site URL: https://<your-github-pages-url>/
--    - Redirect URLs に以下を追加:
--        https://<your-github-pages-url>/board.html
--        http://localhost:3000/board.html  （ローカルテスト用）
-- ============================================================
