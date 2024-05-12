CREATE TABLE images (
  createDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  title VARCHAR(255),
  user_Id VARCHAR(255),
  gallery_Id VARCHAR(255),
  image_Id VARCHAR(255),
  main_tag VARCHAR(255),
  sub_tag VARCHAR(255)
);

CREATE TABLE gallery (
  id SERIAL PRIMARY KEY,
  gallery_id VARCHAR(255),
  user_id VARCHAR(255), t
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  type TINYINT DEFAULT 0,
  theme VARCHAR(255) NOT NULL,
);

<!-- CREATE TABLE theme (
  theme SERIAL PRIMARY KEY,
  theme_name VARCHAR(255)
); --> 아직 미구현

CREATE TABLE tag (
  tag_id SERIAL PRIMARY KEY,
  main_tag VARCHAR(255),
  theme VARCHAR(255),
);

1. theme에서 theme를 선택한다고 생각하자 -> 어차피 theme는 운영진이 제공함
2. theme에 DB에는 테마의 이름, 테마별 선택 가능한 main_tag를 저장한다.
3. image의 sub_tag를 넣어서 user가 자유롭게 tag를 넣도록 만들고 싶은데;;


------------------------------------------------
주석 포함

-- 갤러리 테이블 생성
CREATE TABLE gallery (
  id SERIAL PRIMARY KEY, -- 갤러리 아이템의 고유 식별자
  gallery_id VARCHAR(255), -- 갤러리 아이템의 ID
  user_id VARCHAR(255), -- 갤러리 아이템을 소유한 사용자의 ID
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 갤러리 아이템의 생성 일시, 기본값은 현재 시간
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- 갤러리 아이템의 수정 일시, 기본값은 현재 시간 및 업데이트 시 자동 업데이트
  type TINYINT DEFAULT 0, -- 갤러리 아이템의 유형, 기본값은 0
  theme_id INT REFERENCES theme(theme_id) -- 갤러리 아이템의 테마를 나타내는 외래 키, 테마 테이블의 theme_id와 연결됨
);

-- 테마 테이블 생성
CREATE TABLE theme (
  theme_id SERIAL PRIMARY KEY, -- 테마의 고유 식별자
  theme_name VARCHAR(255) -- 테마의 이름
);

-- 태그 테이블 생성
CREATE TABLE tag (
  tag_id SERIAL PRIMARY KEY, -- 태그의 고유 식별자
  main_tag INT REFERENCES theme(theme_id), -- 주 태그를 나타내는 외래 키, 테마 테이블의 theme_id와 연결됨
  sub_tag VARCHAR(255) -- 하위 태그
);

-- 갤러리 테이블에 삽입될 때마다 theme_id를 업데이트하는 트리거 생성
CREATE OR REPLACE FUNCTION update_gallery_theme()
RETURNS TRIGGER AS $$ -- PL/pgSQL 함수를 정의합니다.
BEGIN
    -- 테마 테이블에서 해당 theme_name에 해당하는 theme_id를 찾습니다
    SELECT theme_id INTO NEW.theme_id
    FROM theme
    WHERE theme_name = NEW.theme_name;

    -- 트리거 함수는 항상 NEW를 반환해야 합니다
    RETURN NEW;
END;
$$ LANGUAGE plpgsql; -- PL/pgSQL 언어를 사용하여 함수를 작성합니다.

CREATE TRIGGER update_gallery_theme_trigger -- 트리거 생성
BEFORE INSERT OR UPDATE ON gallery -- 갤러리 테이블에 삽입되거나 업데이트되기 전에 트리거가 실행됩니다.
FOR EACH ROW -- 각 행마다 트리거가 실행됩니다.
EXECUTE FUNCTION update_gallery_theme(); -- update_gallery_theme 함수를 실행하는 트리거를 생성합니다.
