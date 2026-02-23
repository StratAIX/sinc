-- ============================================================
-- Phase 4: マッチング機能改修 - DBスキーマ追加
-- Supabase SQL Editor で実行してください
-- ============================================================

-- ============================================================
-- STEP 1: users テーブルに位置情報・マッチング関連カラム追加
-- ============================================================
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS gender TEXT CHECK (gender IN ('male', 'female', 'other', 'secret')),
  ADD COLUMN IF NOT EXISTS prefecture TEXT,          -- 都道府県
  ADD COLUMN IF NOT EXISTS geo_lat DECIMAL(9,6),     -- 緯度（本人確認後のみ設定）
  ADD COLUMN IF NOT EXISTS geo_lng DECIMAL(9,6),     -- 経度
  ADD COLUMN IF NOT EXISTS matching_enabled BOOLEAN NOT NULL DEFAULT false, -- 法的確認後にtrue
  ADD COLUMN IF NOT EXISTS age_verified BOOLEAN NOT NULL DEFAULT false;     -- 年齢確認済み

-- ============================================================
-- STEP 2: マッチング申請テーブル
-- ============================================================
CREATE TABLE IF NOT EXISTS matches (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id  UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  target_id     UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  match_type    TEXT        NOT NULL CHECK (match_type IN ('friend', 'love')),
  status        TEXT        NOT NULL DEFAULT 'pending'
                            CHECK (status IN ('pending', 'accepted', 'rejected', 'expired')),
  score         INTEGER,    -- 相性スコア（0-100）
  cost_paid     INTEGER     NOT NULL DEFAULT 0,  -- 支払ったポイント
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (requester_id, target_id, match_type)
);

ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "matches_select" ON matches;
CREATE POLICY "matches_select" ON matches
  FOR SELECT USING (auth.uid() = requester_id OR auth.uid() = target_id);
DROP POLICY IF EXISTS "matches_insert" ON matches;
CREATE POLICY "matches_insert" ON matches
  FOR INSERT WITH CHECK (auth.uid() = requester_id);
DROP POLICY IF EXISTS "matches_update" ON matches;
CREATE POLICY "matches_update" ON matches
  FOR UPDATE USING (auth.uid() = target_id OR auth.uid() = requester_id);

-- ============================================================
-- STEP 3: インデックス
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_matches_requester ON matches(requester_id, status);
CREATE INDEX IF NOT EXISTS idx_matches_target    ON matches(target_id, status);
CREATE INDEX IF NOT EXISTS idx_users_matching    ON users(matching_enabled) WHERE matching_enabled = true;
