-- ============================================================
-- Phase 2: 掲示板改修 - DBスキーマ追加
-- Supabase SQL Editor で以下の順番に実行してください
-- ============================================================

-- ============================================================
-- STEP 1: posts テーブルにカラム追加
-- ============================================================
ALTER TABLE posts
  ADD COLUMN IF NOT EXISTS post_number INTEGER,
  ADD COLUMN IF NOT EXISTS reply_to_number INTEGER,
  ADD COLUMN IF NOT EXISTS board_id UUID REFERENCES boards(id);

-- ============================================================
-- STEP 2: 自動採番トリガー（board ごとに post_number 連番）
-- ============================================================
CREATE OR REPLACE FUNCTION assign_post_number()
RETURNS TRIGGER AS $$
DECLARE
  v_board_id UUID;
  v_max_num  INTEGER;
BEGIN
  -- thread 経由で board_id を取得
  SELECT board_id INTO v_board_id
  FROM threads WHERE id = NEW.thread_id;

  -- board_id を直接セット
  NEW.board_id := v_board_id;

  -- その板での最大番号を取得して +1
  SELECT COALESCE(MAX(post_number), 0) INTO v_max_num
  FROM posts WHERE board_id = v_board_id;

  NEW.post_number := v_max_num + 1;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_assign_post_number ON posts;
CREATE TRIGGER trg_assign_post_number
  BEFORE INSERT ON posts
  FOR EACH ROW
  EXECUTE FUNCTION assign_post_number();

-- ============================================================
-- STEP 3: 通知テーブル
-- ============================================================
CREATE TABLE IF NOT EXISTS notifications (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type         TEXT        NOT NULL CHECK (type IN (
                 'reply', 'mention', 'friend_request', 'friend_accept', 'match', 'dm'
               )),
  from_user_id UUID        REFERENCES users(id) ON DELETE SET NULL,
  post_id      UUID        REFERENCES posts(id) ON DELETE CASCADE,
  thread_id    UUID        REFERENCES threads(id) ON DELETE CASCADE,
  board_id     UUID        REFERENCES boards(id) ON DELETE CASCADE,
  message      TEXT,
  is_read      BOOLEAN     NOT NULL DEFAULT false,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "notifications_select" ON notifications;
CREATE POLICY "notifications_select" ON notifications
  FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "notifications_update" ON notifications;
CREATE POLICY "notifications_update" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "notifications_insert" ON notifications;
CREATE POLICY "notifications_insert" ON notifications
  FOR INSERT WITH CHECK (auth.uid() = from_user_id OR from_user_id IS NULL);

-- ============================================================
-- STEP 4: ポイント残高（users テーブルに追加）
-- ============================================================
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS point_balance INTEGER NOT NULL DEFAULT 0;

-- ============================================================
-- STEP 5: ポイント履歴テーブル
-- ============================================================
CREATE TABLE IF NOT EXISTS point_ledger (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount     INTEGER     NOT NULL,  -- 正=加算、負=消費
  reason     TEXT        NOT NULL,  -- 'board_create', 'matching', 'ad_reward' など
  ref_id     UUID,                  -- 関連リソースのID
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE point_ledger ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "point_ledger_select" ON point_ledger;
CREATE POLICY "point_ledger_select" ON point_ledger
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================================
-- STEP 6: インデックス
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_posts_board_number
  ON posts(board_id, post_number);
CREATE INDEX IF NOT EXISTS idx_notifications_user
  ON notifications(user_id, is_read, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_point_ledger_user
  ON point_ledger(user_id, created_at DESC);
