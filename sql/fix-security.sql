-- ============================================================
-- セキュリティ修正SQL（レビュー対応）
-- Supabase SQL Editor で実行してください
-- ============================================================

-- ============================================================
-- STEP 1: 通知テーブルのRLS修正
-- 問題：from_user_id IS NULL を許可していたため誰でも任意ユーザーへ通知送信可能だった
-- ============================================================
DROP POLICY IF EXISTS "notifications_insert" ON notifications;
CREATE POLICY "notifications_insert" ON notifications
  FOR INSERT WITH CHECK (auth.uid() = from_user_id);
-- ↑ IS NULL 条件を削除。自分が送信者でなければ通知を作れない

-- ============================================================
-- STEP 2: friends テーブルに削除ポリシー追加
-- 問題：BAN・ブロック後にレコードを削除できなかった
-- ============================================================
DROP POLICY IF EXISTS "friends_delete" ON friends;
CREATE POLICY "friends_delete" ON friends
  FOR DELETE USING (auth.uid() = requester_id OR auth.uid() = receiver_id);

-- ============================================================
-- STEP 3: ブロック機能用テーブル
-- ============================================================
CREATE TABLE IF NOT EXISTS blocks (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  blocker_id  UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  blocked_id  UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (blocker_id, blocked_id)
);

ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "blocks_select" ON blocks;
CREATE POLICY "blocks_select" ON blocks
  FOR SELECT USING (auth.uid() = blocker_id);

DROP POLICY IF EXISTS "blocks_insert" ON blocks;
CREATE POLICY "blocks_insert" ON blocks
  FOR INSERT WITH CHECK (auth.uid() = blocker_id AND blocker_id <> blocked_id);

DROP POLICY IF EXISTS "blocks_delete" ON blocks;
CREATE POLICY "blocks_delete" ON blocks
  FOR DELETE USING (auth.uid() = blocker_id);

-- ============================================================
-- STEP 4: 診断スコアを本人のみ取得できるRPC（サーバー関数）
-- PostgreSQL の行レベルセキュリティはカラム単位では制御できないため
-- サーバー側関数でスコアを分離する
-- ============================================================
CREATE OR REPLACE FUNCTION get_my_diagnosis_scores()
RETURNS JSON AS $$
DECLARE
  v_scores JSON;
BEGIN
  SELECT diagnosis_scores INTO v_scores
  FROM public.users
  WHERE id = auth.uid();

  RETURN v_scores;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 他ユーザープロフィール取得（スコア除外）用RPC
CREATE OR REPLACE FUNCTION get_user_public_profile(target_user_id UUID)
RETURNS JSON AS $$
DECLARE
  v_result JSON;
BEGIN
  SELECT json_build_object(
    'id',          u.id,
    'nickname',    u.nickname,
    'display_id',  u.display_id,
    'username',    u.username,
    'type_name',   u.type_name,
    'type_number', u.type_number,
    'family',      u.family,
    'avatar_url',  u.avatar_url,
    'bio',         u.bio,
    'hobbies',     u.hobbies
    -- diagnosis_scores, diagnosis_history, gender 等の非公開フィールドは含めない
  )
  INTO v_result
  FROM public.users u
  WHERE u.id = target_user_id;

  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- STEP 5: インデックス追加
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_blocks_blocker ON blocks(blocker_id);
CREATE INDEX IF NOT EXISTS idx_blocks_blocked ON blocks(blocked_id);

-- ============================================================
-- STEP 6: 掲示板・スレッド投稿でブロックユーザーを除外するためのヘルパー関数
-- ============================================================
CREATE OR REPLACE FUNCTION is_blocked_by(target_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM blocks
    WHERE (blocker_id = auth.uid() AND blocked_id = target_id)
       OR (blocker_id = target_id AND blocked_id = auth.uid())
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
