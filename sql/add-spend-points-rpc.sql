-- ============================================================
-- SEC-05: ポイント消費アトミック化
-- spend_points(user_id, amount, reason, ref_id) RPC
-- ・残高確認 → 消費 → 台帳記録 を1トランザクションで実行
-- ・残高不足の場合はエラーを返す（ロールバック）
-- ============================================================

CREATE OR REPLACE FUNCTION spend_points(
  p_user_id UUID,
  p_amount   INTEGER,
  p_reason   TEXT,
  p_ref_id   UUID DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_balance INTEGER;
BEGIN
  -- 残高を行ロックして取得（SELECT FOR UPDATE で同時実行を防ぐ）
  SELECT point_balance INTO v_balance
  FROM users
  WHERE id = p_user_id
  FOR UPDATE;

  IF v_balance IS NULL THEN
    RAISE EXCEPTION 'ユーザーが見つかりません' USING ERRCODE = 'P0001';
  END IF;

  IF v_balance < p_amount THEN
    RAISE EXCEPTION 'ポイントが不足しています（必要: %pt / 残高: %pt）', p_amount, v_balance
      USING ERRCODE = 'P0001';
  END IF;

  -- ポイント消費
  UPDATE users
  SET point_balance = point_balance - p_amount
  WHERE id = p_user_id;

  -- 台帳に記録
  INSERT INTO point_ledger (user_id, amount, reason, ref_id)
  VALUES (p_user_id, -p_amount, p_reason, p_ref_id);
END;
$$;
