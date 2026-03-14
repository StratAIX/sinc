-- ============================================================
-- SEC-02: 投稿レート制限
-- posts  : 1分間に3件まで
-- threads: 10分間に3件まで
-- dms    : 1分間に10件まで
-- friends: 1時間に20件まで（申請スパム防止）
-- boards : 1時間に5件まで（FREE_BOARD_CREATION時も有効）
-- ============================================================

-- posts レート制限トリガー関数
CREATE OR REPLACE FUNCTION check_post_rate_limit()
RETURNS TRIGGER AS $$
BEGIN
  IF (
    SELECT COUNT(*)
    FROM posts
    WHERE user_id = NEW.user_id
      AND created_at > NOW() - INTERVAL '1 minute'
  ) >= 3 THEN
    RAISE EXCEPTION 'rate_limit_exceeded: 投稿は1分間に3件までです。少し待ってから再度お試しください。'
      USING ERRCODE = 'P0001';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- posts トリガー登録
DROP TRIGGER IF EXISTS posts_rate_limit ON posts;
CREATE TRIGGER posts_rate_limit
  BEFORE INSERT ON posts
  FOR EACH ROW
  EXECUTE FUNCTION check_post_rate_limit();

-- threads レート制限トリガー関数
CREATE OR REPLACE FUNCTION check_thread_rate_limit()
RETURNS TRIGGER AS $$
BEGIN
  IF (
    SELECT COUNT(*)
    FROM threads
    WHERE user_id = NEW.user_id
      AND created_at > NOW() - INTERVAL '10 minutes'
  ) >= 3 THEN
    RAISE EXCEPTION 'rate_limit_exceeded: スレッドは10分間に3件までです。少し待ってから再度お試しください。'
      USING ERRCODE = 'P0001';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- threads トリガー登録
DROP TRIGGER IF EXISTS threads_rate_limit ON threads;
CREATE TRIGGER threads_rate_limit
  BEFORE INSERT ON threads
  FOR EACH ROW
  EXECUTE FUNCTION check_thread_rate_limit();

-- dms レート制限トリガー関数（1分間に10件まで）
CREATE OR REPLACE FUNCTION check_dm_rate_limit()
RETURNS TRIGGER AS $$
BEGIN
  IF (
    SELECT COUNT(*)
    FROM dms
    WHERE sender_id = NEW.sender_id
      AND created_at > NOW() - INTERVAL '1 minute'
  ) >= 10 THEN
    RAISE EXCEPTION 'rate_limit_exceeded: メッセージは1分間に10件までです。少し待ってから再度お試しください。'
      USING ERRCODE = 'P0001';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- dms トリガー登録
DROP TRIGGER IF EXISTS dms_rate_limit ON dms;
CREATE TRIGGER dms_rate_limit
  BEFORE INSERT ON dms
  FOR EACH ROW
  EXECUTE FUNCTION check_dm_rate_limit();

-- friends 申請レート制限トリガー関数（1時間に20件まで）
CREATE OR REPLACE FUNCTION check_friend_request_rate_limit()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'pending' AND (
    SELECT COUNT(*)
    FROM friends
    WHERE requester_id = NEW.requester_id
      AND created_at > NOW() - INTERVAL '1 hour'
  ) >= 20 THEN
    RAISE EXCEPTION 'rate_limit_exceeded: フレンド申請は1時間に20件までです。少し待ってから再度お試しください。'
      USING ERRCODE = 'P0001';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- friends トリガー登録
DROP TRIGGER IF EXISTS friends_rate_limit ON friends;
CREATE TRIGGER friends_rate_limit
  BEFORE INSERT ON friends
  FOR EACH ROW
  EXECUTE FUNCTION check_friend_request_rate_limit();

-- boards レート制限トリガー関数（1時間に5件まで・FREE_BOARD_CREATION時も有効）
CREATE OR REPLACE FUNCTION check_board_rate_limit()
RETURNS TRIGGER AS $$
BEGIN
  IF (
    SELECT COUNT(*)
    FROM boards
    WHERE created_by = NEW.created_by
      AND created_at > NOW() - INTERVAL '1 hour'
  ) >= 5 THEN
    RAISE EXCEPTION 'rate_limit_exceeded: 掲示板は1時間に5件まで作成できます。少し待ってから再度お試しください。'
      USING ERRCODE = 'P0001';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- boards トリガー登録
DROP TRIGGER IF EXISTS boards_rate_limit ON boards;
CREATE TRIGGER boards_rate_limit
  BEFORE INSERT ON boards
  FOR EACH ROW
  EXECUTE FUNCTION check_board_rate_limit();
