-- ============================================================
-- マッチング解放フラグ追加
-- Supabase の SQL Editor で実行してください
-- ============================================================

-- users テーブルに matching_unlocked 列を追加
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS matching_unlocked BOOLEAN NOT NULL DEFAULT FALSE;

-- インデックス（マッチング対象ユーザーの絞り込みに使用）
CREATE INDEX IF NOT EXISTS idx_users_matching_unlocked
  ON users (matching_unlocked)
  WHERE matching_unlocked = TRUE;
