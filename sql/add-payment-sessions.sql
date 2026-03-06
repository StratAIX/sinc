-- ============================================================
-- Sinc 決済セッション管理テーブル
-- Stripe Webhook連携用
-- Supabase SQL Editor で実行してください
-- ============================================================

CREATE TABLE IF NOT EXISTS payment_sessions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_session_id TEXT NOT NULL UNIQUE,   -- Stripe の cs_xxx セッションID
  product_id      TEXT NOT NULL,            -- 'matching_unlock' | 'matching_proposal'
  amount          INT NOT NULL,             -- 金額（円）
  status          TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending','completed','cancelled','expired')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at    TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_payment_sessions_user ON payment_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_sessions_stripe ON payment_sessions(stripe_session_id);

ALTER TABLE payment_sessions ENABLE ROW LEVEL SECURITY;

-- ユーザーは自分のセッションのみ閲覧可能
CREATE POLICY "payment_sessions_select_own" ON payment_sessions FOR SELECT
  USING (auth.uid() = user_id);

-- 作成はサービス経由のみ（Edge Functionがservice_roleで実行）
-- ユーザーは直接insertできない
CREATE POLICY "payment_sessions_insert_own" ON payment_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);
