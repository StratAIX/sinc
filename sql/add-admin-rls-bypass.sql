-- ============================================================
-- 管理者向け RLS バイパスポリシー
-- admin.html から全データを閲覧できるようにする
-- ============================================================

-- posts: 管理者は全投稿を閲覧可
CREATE POLICY "posts_select_admin" ON posts FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
  );

-- threads: 管理者は全スレッドを閲覧可
CREATE POLICY "threads_select_admin" ON threads FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
  );

-- boards: 管理者は全板を閲覧可
CREATE POLICY "boards_select_admin" ON boards FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
  );

-- ============================================================
-- last_active_at 列追加（DAU/MAU/翌日継続率の計算用）
-- ユーザーがログイン・投稿・スレッド作成したときに更新する
-- ============================================================
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS last_active_at TIMESTAMPTZ;

-- 既存ユーザーの初期値をupdated_atで埋める
UPDATE users SET last_active_at = updated_at WHERE last_active_at IS NULL;

-- posts作成時にlast_active_atを更新するトリガー
CREATE OR REPLACE FUNCTION update_last_active()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE users SET last_active_at = now() WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER trg_posts_last_active
  AFTER INSERT ON posts
  FOR EACH ROW EXECUTE FUNCTION update_last_active();

CREATE OR REPLACE TRIGGER trg_threads_last_active
  AFTER INSERT ON threads
  FOR EACH ROW EXECUTE FUNCTION update_last_active();
