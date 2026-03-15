-- ============================================================
-- fix-reports-rls.sql
-- 通報管理に通報が表示されない問題の修正
-- 管理者が reports テーブルの全行を SELECT できるようにする
-- ============================================================

-- 既存ポリシーを DROP してから再作成（冪等）
DROP POLICY IF EXISTS "admin_reports_select" ON reports;
DROP POLICY IF EXISTS "admin_reports_update" ON reports;

CREATE POLICY "admin_reports_select" ON reports FOR SELECT
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "admin_reports_update" ON reports FOR UPDATE
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true));

-- boards の管理者 DELETE（うんちなどシステム板も削除できるようにする）
DROP POLICY IF EXISTS "admin_boards_delete" ON boards;
CREATE POLICY "admin_boards_delete" ON boards FOR DELETE
  USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true));
