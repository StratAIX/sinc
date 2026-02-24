-- ============================================================
-- Storage プライベートバケット設定SQL
-- Supabase SQL Editor で実行してください
-- ============================================================

-- ============================================================
-- STEP 1: dms バケットをプライベートで作成
-- ※ Supabase Dashboard > Storage からも作成可能
--   「New bucket」→ 名前「dms」→ Public をOFF
-- ============================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'dms',
  'dms',
  false,              -- プライベート（パブリックURL なし）
  5242880,            -- 5MB 上限
  ARRAY['image/jpeg','image/png','image/webp','image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = false,
  file_size_limit = 5242880;

-- ============================================================
-- STEP 2: dms バケットの RLS ポリシー
-- 送信者・受信者のみアクセス可能
-- ============================================================

-- アップロード：自分のフォルダ（dms/{user_id}/...）にのみ書き込み可
DROP POLICY IF EXISTS "dms_upload" ON storage.objects;
CREATE POLICY "dms_upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'dms'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- 閲覧：DMの会話相手のみ（conversation_idに自分のIDが含まれる場合）
-- シンプル版：自分がアップロードしたファイル or DMの受信者
DROP POLICY IF EXISTS "dms_select" ON storage.objects;
CREATE POLICY "dms_select" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'dms'
    AND (
      -- 自分がアップロードした
      auth.uid()::text = (storage.foldername(name))[1]
      -- または、自分が受信者であるDMに添付されている
      OR EXISTS (
        SELECT 1 FROM public.dms
        WHERE media_url LIKE '%' || name || '%'
          AND receiver_id = auth.uid()
      )
    )
  );

-- 削除：自分のファイルのみ
DROP POLICY IF EXISTS "dms_delete" ON storage.objects;
CREATE POLICY "dms_delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'dms'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
