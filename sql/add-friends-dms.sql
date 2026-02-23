-- ============================================================
-- Phase 3: フレンド・DM機能 - DBスキーマ追加
-- Supabase SQL Editor で実行してください
-- ============================================================

-- ============================================================
-- STEP 1: フレンド申請テーブル
-- ============================================================
CREATE TABLE IF NOT EXISTS friends (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  receiver_id  UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status       TEXT        NOT NULL DEFAULT 'pending'
                           CHECK (status IN ('pending', 'accepted', 'rejected', 'blocked')),
  source       TEXT        NOT NULL DEFAULT 'search'
                           CHECK (source IN ('search', 'match', 'invite')),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (requester_id, receiver_id)
);

ALTER TABLE friends ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "friends_select" ON friends;
CREATE POLICY "friends_select" ON friends
  FOR SELECT USING (
    auth.uid() = requester_id OR auth.uid() = receiver_id
  );
DROP POLICY IF EXISTS "friends_insert" ON friends;
CREATE POLICY "friends_insert" ON friends
  FOR INSERT WITH CHECK (
    auth.uid() = requester_id
    AND requester_id <> receiver_id
  );
DROP POLICY IF EXISTS "friends_update" ON friends;
CREATE POLICY "friends_update" ON friends
  FOR UPDATE USING (
    auth.uid() = receiver_id OR auth.uid() = requester_id
  );

-- ============================================================
-- STEP 2: DM（ダイレクトメッセージ）テーブル
-- ============================================================
CREATE TABLE IF NOT EXISTS dms (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id TEXT        NOT NULL,  -- "小さいUUID_大きいUUID" で一意なペア
  sender_id       UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  receiver_id     UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content         TEXT,
  media_url       TEXT,
  is_read         BOOLEAN     NOT NULL DEFAULT false,
  is_deleted      BOOLEAN     NOT NULL DEFAULT false,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE dms ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "dms_select" ON dms;
CREATE POLICY "dms_select" ON dms
  FOR SELECT USING (
    auth.uid() = sender_id OR auth.uid() = receiver_id
  );
DROP POLICY IF EXISTS "dms_insert" ON dms;
CREATE POLICY "dms_insert" ON dms
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id
    AND EXISTS (
      SELECT 1 FROM friends
      WHERE status = 'accepted'
        AND (
          (requester_id = auth.uid() AND receiver_id = dms.receiver_id)
          OR
          (receiver_id = auth.uid() AND requester_id = dms.receiver_id)
        )
    )
  );
DROP POLICY IF EXISTS "dms_update" ON dms;
CREATE POLICY "dms_update" ON dms
  FOR UPDATE USING (auth.uid() = receiver_id OR auth.uid() = sender_id);

-- ============================================================
-- STEP 3: 招待コードをユーザーに付与
-- ============================================================
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS invite_code TEXT UNIQUE;

-- 既存ユーザーに invite_code を付与
UPDATE users SET invite_code = LOWER(SUBSTRING(id::text FROM 1 FOR 8))
WHERE invite_code IS NULL;

-- 新規ユーザーには自動付与（トリガー関数を拡張）
CREATE OR REPLACE FUNCTION handle_auth_user_created()
RETURNS TRIGGER AS $$
DECLARE
  v_display_id TEXT;
  v_num        INTEGER;
BEGIN
  -- display_id 生成
  SELECT COALESCE(MAX(CAST(SUBSTRING(display_id FROM 2) AS INTEGER)), 999) + 1
  INTO v_num FROM public.users;
  v_display_id := '#' || LPAD(v_num::TEXT, 6, '0');

  INSERT INTO public.users (id, display_id, invite_code)
  VALUES (
    NEW.id,
    v_display_id,
    LOWER(SUBSTRING(NEW.id::text FROM 1 FOR 8))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- STEP 4: インデックス
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_friends_requester ON friends(requester_id, status);
CREATE INDEX IF NOT EXISTS idx_friends_receiver  ON friends(receiver_id, status);
CREATE INDEX IF NOT EXISTS idx_dms_conversation  ON dms(conversation_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_dms_receiver_unread ON dms(receiver_id, is_read) WHERE is_read = false;
