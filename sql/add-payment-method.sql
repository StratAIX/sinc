-- ============================================================
-- 課金・ポイント補完 SQL
-- Supabase の SQL Editor で実行してください
-- （add-board-features.sql のポイント設計を前提とします）
-- ============================================================

-- ============================================================
-- STEP 1: users テーブルに payment_method 列を追加
-- ============================================================
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS payment_method TEXT;
-- 値: NULL(未購入) | 'stripe' | 'apple' | 'google' | 'free'

COMMENT ON COLUMN users.payment_method IS
  '機能解放時の決済手段: stripe/apple/google/free';

-- ============================================================
-- STEP 2: ポイント加算 RPC (earn_points)
--   呼び出し: supabase.rpc('earn_points', { p_amount, p_reason, p_ref_id })
--   戻り値: 加算後の残高 (integer)
-- ============================================================
CREATE OR REPLACE FUNCTION earn_points(
  p_amount  INTEGER,
  p_reason  TEXT,
  p_ref_id  UUID DEFAULT NULL
)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_new_balance INTEGER;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- point_ledger に加算行を追加
  INSERT INTO point_ledger (user_id, amount, reason, ref_id)
  VALUES (v_user_id, p_amount, p_reason, p_ref_id);

  -- users.point_balance を更新
  UPDATE users
  SET point_balance = point_balance + p_amount
  WHERE id = v_user_id
  RETURNING point_balance INTO v_new_balance;

  RETURN v_new_balance;
END;
$$;

-- ============================================================
-- STEP 3: ポイント消費 RPC (spend_points)
--   呼び出し: supabase.rpc('spend_points', { p_amount, p_reason, p_ref_id })
--   戻り値: TRUE(消費成功) / FALSE(残高不足)
--   注意: 残高不足の場合は RAISE EXCEPTION で 'insufficient points' を返す
-- ============================================================
CREATE OR REPLACE FUNCTION spend_points(
  p_amount  INTEGER,
  p_reason  TEXT,
  p_ref_id  UUID DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id     UUID := auth.uid();
  v_cur_balance INTEGER;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- 現在残高を取得（行ロック）
  SELECT point_balance INTO v_cur_balance
  FROM users
  WHERE id = v_user_id
  FOR UPDATE;

  IF v_cur_balance < p_amount THEN
    RAISE EXCEPTION 'insufficient points: need % but have %', p_amount, v_cur_balance;
  END IF;

  -- 消費行を記録（amount は負数で格納）
  INSERT INTO point_ledger (user_id, amount, reason, ref_id)
  VALUES (v_user_id, -p_amount, p_reason, p_ref_id);

  -- 残高を減算
  UPDATE users
  SET point_balance = point_balance - p_amount
  WHERE id = v_user_id;

  RETURN TRUE;
END;
$$;

-- ============================================================
-- STEP 4: 匿名ユーザーが RPC を呼べないよう EXECUTE 権限を付与
-- ============================================================
REVOKE EXECUTE ON FUNCTION earn_points(INTEGER, TEXT, UUID)  FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION spend_points(INTEGER, TEXT, UUID) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION earn_points(INTEGER, TEXT, UUID)  TO authenticated;
GRANT  EXECUTE ON FUNCTION spend_points(INTEGER, TEXT, UUID) TO authenticated;
