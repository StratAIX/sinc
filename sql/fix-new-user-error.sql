-- ============================================================
-- 「Database error saving new user」エラー修正
-- 症状: 新規登録時に "Database error saving new user" が出てアカウント作成不能
-- 原因: handle_new_auth_user() が display_id を含めずに INSERT するため
--       users.display_id NOT NULL 制約に違反する可能性がある
-- 対策: display_id の生成ロジックをトリガー関数内に直接組み込む
--
-- Supabase Dashboard > SQL Editor で実行してください（1回だけ）
-- ============================================================

-- ============================================================
-- STEP 1: 診断用クエリ（実行して確認してください）
-- ============================================================
-- 以下を実行して on_user_insert トリガーが存在するか確認:
-- SELECT trigger_name, event_manipulation, action_timing
-- FROM information_schema.triggers
-- WHERE event_object_table = 'users';
--
-- handle_new_user 関数が存在するか確認:
-- SELECT proname FROM pg_proc WHERE proname IN ('handle_new_user','handle_new_auth_user','generate_display_id');

-- ============================================================
-- STEP 2: handle_new_auth_user を堅牢版に差し替え
-- display_id 生成を関数内で完結させ、BEFORE INSERT トリガーへの依存をなくす
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER AS $$
DECLARE
  v_display_id TEXT;
  chars        TEXT    := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  attempt      INT     := 0;
  i            INT;
BEGIN
  -- display_id を生成（最大10回衝突リトライ）
  LOOP
    v_display_id := '#';
    FOR i IN 1..4 LOOP
      v_display_id := v_display_id
        || substr(chars, floor(random() * length(chars) + 1)::int, 1);
    END LOOP;

    -- 衝突がなければ脱出
    EXIT WHEN NOT EXISTS (
      SELECT 1 FROM public.users WHERE display_id = v_display_id
    );

    attempt := attempt + 1;
    IF attempt >= 10 THEN
      -- フォールバック: UUID先頭8文字を使って確実に一意にする
      v_display_id := '#' || upper(substr(replace(NEW.id::text, '-', ''), 1, 7));
      EXIT;
    END IF;
  END LOOP;

  -- users テーブルに行がない場合のみ INSERT
  INSERT INTO public.users (id, display_id, created_at, updated_at)
  VALUES (NEW.id, v_display_id, NOW(), NOW())
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- STEP 3: トリガーを再アタッチ（念のため DROP → CREATE）
-- ============================================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_auth_user();

-- ============================================================
-- STEP 4: generate_display_id / handle_new_user も念のため再作成
-- (on_user_insert トリガーが残っていても問題ないよう両立させる)
-- ============================================================
CREATE OR REPLACE FUNCTION generate_display_id()
RETURNS TEXT AS $$
DECLARE
  chars  TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  result TEXT := '#';
  i      INT;
BEGIN
  FOR i IN 1..4 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  new_display_id TEXT;
  max_attempts   INT := 10;
  attempt        INT := 0;
BEGIN
  LOOP
    new_display_id := generate_display_id();
    IF NOT EXISTS (SELECT 1 FROM users WHERE display_id = new_display_id) THEN
      NEW.display_id := new_display_id;
      EXIT;
    END IF;
    attempt := attempt + 1;
    IF attempt >= max_attempts THEN
      RAISE EXCEPTION 'display_id の生成に失敗しました（衝突が続いています）';
    END IF;
  END LOOP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_user_insert ON users;
CREATE TRIGGER on_user_insert
  BEFORE INSERT ON users
  FOR EACH ROW
  WHEN (NEW.display_id IS NULL)
  EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- STEP 5: 動作確認（実行後に以下で確認）
-- ============================================================
-- SELECT trigger_name, event_object_table, action_timing, action_orientation
-- FROM information_schema.triggers
-- WHERE event_object_table IN ('users')
--    OR trigger_name = 'on_auth_user_created'
-- ORDER BY event_object_table, trigger_name;
