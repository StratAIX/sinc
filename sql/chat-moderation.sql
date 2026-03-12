-- ============================================================
-- チャット モデレーション テーブル
-- Supabase Dashboard > SQL Editor で実行してください（1回のみ）
-- ============================================================

-- 1. users テーブルにチャット利用規約同意フラグを追加
ALTER TABLE users ADD COLUMN IF NOT EXISTS chat_agreed_at timestamptz;

-- 2. dms テーブルに soft-delete カラムを追加（未追加の場合）
ALTER TABLE dms ADD COLUMN IF NOT EXISTS is_deleted boolean DEFAULT false;
ALTER TABLE dms ADD COLUMN IF NOT EXISTS deleted_at timestamptz;

-- 3. chat_reports テーブル（DMの通報専用）
CREATE TABLE IF NOT EXISTS chat_reports (
  id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  reporter_id     uuid REFERENCES users(id) ON DELETE SET NULL,
  message_id      uuid REFERENCES dms(id) ON DELETE SET NULL,
  conversation_id text,
  message_content text,            -- 通報時点のメッセージ内容スナップショット
  message_type    text DEFAULT 'text',  -- 'text' / 'image'
  media_path      text,            -- 画像の場合のストレージパス
  sender_id       uuid REFERENCES users(id) ON DELETE SET NULL,
  reason          text NOT NULL,
  status          text DEFAULT 'pending'
                    CHECK (status IN ('pending','reviewed','actioned','dismissed')),
  admin_note      text,
  created_at      timestamptz DEFAULT now()
);

-- RLS: ユーザーは自分の通報のみINSERT可、管理者のみSELECT/UPDATE可
ALTER TABLE chat_reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users_insert_chat_report" ON chat_reports;
CREATE POLICY "users_insert_chat_report" ON chat_reports
  FOR INSERT WITH CHECK (auth.uid() = reporter_id);

DROP POLICY IF EXISTS "admin_select_chat_reports" ON chat_reports;
CREATE POLICY "admin_select_chat_reports" ON chat_reports
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
  );

DROP POLICY IF EXISTS "admin_update_chat_reports" ON chat_reports;
CREATE POLICY "admin_update_chat_reports" ON chat_reports
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
  );

-- 4. action_logs テーブル（警察提出対応の管理者アクションログ）
CREATE TABLE IF NOT EXISTS action_logs (
  id               uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id         uuid REFERENCES users(id),
  target_user_id   uuid REFERENCES users(id),
  action_type      text NOT NULL,
    -- 'ban' / 'unban' / 'warn' / 'delete_dm' / 'delete_post'
  reason           text,
  metadata         jsonb,           -- 削除メッセージの内容スナップショット等
  created_at       timestamptz DEFAULT now()
);

ALTER TABLE action_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admin_all_action_logs" ON action_logs;
CREATE POLICY "admin_all_action_logs" ON action_logs
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
  );

-- ============================================================
-- 確認クエリ（実行後に動作確認）
-- ============================================================
-- SELECT table_name FROM information_schema.tables
-- WHERE table_schema = 'public'
--   AND table_name IN ('chat_reports','action_logs');
--
-- SELECT column_name FROM information_schema.columns
-- WHERE table_name = 'users' AND column_name = 'chat_agreed_at';
--
-- SELECT column_name FROM information_schema.columns
-- WHERE table_name = 'dms' AND column_name IN ('is_deleted','deleted_at');
