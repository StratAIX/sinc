-- ============================================================
-- メンテナンスモード テーブル
-- admin.html から強制メンテナンスを設定する
-- ============================================================

CREATE TABLE IF NOT EXISTS maintenance_mode (
  id          SERIAL PRIMARY KEY,
  is_active   BOOLEAN      NOT NULL DEFAULT false,
  start_at    TIMESTAMPTZ,
  end_at      TIMESTAMPTZ,
  message     TEXT,
  updated_at  TIMESTAMPTZ  DEFAULT now()
);

-- 初期レコード（1行のみ使用）
INSERT INTO maintenance_mode (is_active) VALUES (false);

-- RLS 設定
ALTER TABLE maintenance_mode ENABLE ROW LEVEL SECURITY;

-- 全ユーザー（anonを含む）がSELECT可（メンテ確認用）
CREATE POLICY "maintenance_select_all" ON maintenance_mode FOR SELECT
  USING (true);

-- 管理者のみ UPDATE 可
CREATE POLICY "maintenance_update_admin" ON maintenance_mode FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
  );
