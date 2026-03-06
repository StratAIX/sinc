-- ============================================================
-- Sinc 管理者機能 追加SQL
-- Supabase SQL Editor で実行してください
-- ============================================================

-- 1. usersテーブルに管理者フラグを追加
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT false;

-- 2. お知らせテーブル
CREATE TABLE IF NOT EXISTS announcements (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id   UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title      TEXT NOT NULL CHECK (char_length(title) <= 100),
  content    TEXT NOT NULL CHECK (char_length(content) <= 2000),
  is_pinned  BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "announcements_select" ON announcements FOR SELECT USING (true);
CREATE POLICY "announcements_insert" ON announcements FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true));
CREATE POLICY "announcements_update" ON announcements FOR UPDATE
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true));
CREATE POLICY "announcements_delete" ON announcements FOR DELETE
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true));

-- 3. 管理者向けRLSポリシー追加

-- users: 管理者は全ユーザーを更新可能（BAN操作・is_admin付与など）
CREATE POLICY "admin_users_update" ON users FOR UPDATE
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true));

-- reports: 管理者は全通報を閲覧・更新可能
CREATE POLICY "admin_reports_select" ON reports FOR SELECT
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true));
CREATE POLICY "admin_reports_update" ON reports FOR UPDATE
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true));

-- posts: 管理者は全投稿を更新・削除可能
CREATE POLICY "admin_posts_update" ON posts FOR UPDATE
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true));
CREATE POLICY "admin_posts_delete" ON posts FOR DELETE
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true));

-- threads: 管理者は全スレッドを更新・削除可能
CREATE POLICY "admin_threads_update" ON threads FOR UPDATE
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true));
CREATE POLICY "admin_threads_delete" ON threads FOR DELETE
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true));

-- boards: 管理者は板を更新・削除可能
CREATE POLICY "admin_boards_update" ON boards FOR UPDATE
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true));
CREATE POLICY "admin_boards_delete" ON boards FOR DELETE
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true));

-- ============================================================
-- 4. 自分のアカウントを管理者に設定（メールアドレスで特定）
--    ★ 実行前に自分のauth.users.idを確認して置き換えること
--    確認方法: Supabase Dashboard > Authentication > Users
-- ============================================================
-- UPDATE users SET is_admin = true WHERE id = '【自分のユーザーID】';
