-- ============================================================
-- posts テーブルに画像URL列を追加
-- ============================================================
ALTER TABLE posts
  ADD COLUMN IF NOT EXISTS media_url TEXT;

-- ============================================================
-- Storage: posts バケット作成（Supabase Dashboard で実行 or SQL）
-- ============================================================
-- ※ Supabase Dashboard > Storage > New bucket で
--    名前: posts, Public: true にして作成してください
-- （SQL で直接バケット作成はできないため Dashboard 操作が必要）

-- ============================================================
-- Storage RLS ポリシー（posts バケット）
-- ============================================================
-- 読み取り: 全員可（public バケットなので不要だが念のため）
-- 書き込み: ログイン済みユーザーのみ、自分のフォルダに限定

-- INSERT ポリシー
CREATE POLICY "posts_storage_insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'posts'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- SELECT ポリシー（public バケットは不要だが明示）
CREATE POLICY "posts_storage_select"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'posts');

-- DELETE ポリシー（自分の投稿画像のみ削除可）
CREATE POLICY "posts_storage_delete"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'posts'
  AND (storage.foldername(name))[1] = auth.uid()::text
);
