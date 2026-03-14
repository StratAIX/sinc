-- ============================================================
-- 退会時の全データ削除 RPC
-- Supabase の SQL Editor で実行してください
-- ============================================================

-- 削除済みアカウントの監査テーブル
-- （auth.users のメールは残るが、誰が退会したかの記録用）
CREATE TABLE IF NOT EXISTS deleted_accounts (
  id               BIGSERIAL    PRIMARY KEY,
  original_user_id UUID         NOT NULL,
  email            TEXT         NOT NULL,
  deleted_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- 管理者のみ閲覧可能
ALTER TABLE deleted_accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "deleted_accounts_admin_only" ON deleted_accounts
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
  );

-- ============================================================
-- 自分のアカウントデータを全削除する関数
-- SECURITY DEFINER: RLS をバイパスして確実に削除
-- ============================================================
CREATE OR REPLACE FUNCTION delete_my_account()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid   UUID := auth.uid();
  v_email TEXT;
BEGIN
  -- 未ログインはエラー
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- auth.users からメールアドレスを取得（監査ログ用）
  SELECT email INTO v_email FROM auth.users WHERE id = v_uid;

  -- 削除済みアカウントとして記録
  INSERT INTO deleted_accounts (original_user_id, email)
  VALUES (v_uid, COALESCE(v_email, ''));

  -- users を削除 → ON DELETE CASCADE により以下が自動削除:
  --   threads / posts / likes / reports
  --   friends / dms
  --   matches（ON DELETE CASCADE 設定済み）
  DELETE FROM users WHERE id = v_uid;

  -- ※ auth.users は残す（同メールで再登録時に新規ユーザーとして扱われる）
  -- ※ Storage（avatar / DM画像）はクライアント側で削除済み
END;
$$;

-- 実行権限: 認証済みユーザーのみ
GRANT EXECUTE ON FUNCTION delete_my_account() TO authenticated;
