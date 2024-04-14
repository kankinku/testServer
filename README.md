mysql<br>
DB name : readimg<br>
table : files<br>
----------------<br>
+--------------+--------------+------+-----+-------------------+-------------------+<br>
| Field        | Type         | Null | Key | Default           | Extra             |<br>
+--------------+--------------+------+-----+-------------------+-------------------+<br>
| id           | int          | NO   | PRI | NULL              | auto_increment    |<br>
| name         | varchar(255) | NO   |     | NULL              |                   |<br>
| thema        | varchar(255) | YES  |     | NULL              |                   |<br>
| create_date  | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |<br>
| originalname | varchar(255) | YES  |     | NULL              |                   |<br>
+--------------+--------------+------+-----+-------------------+-------------------+<br>

[2024-04-14] 피드백
현재는 name에 image의 고유 아이디와 경로등의 여러가지 역활을 수행한다.
table의 id필드를 이용해서 아이디를 분리 
경로는 destination을 통해서 따로 저장 (저번에 못함)

DB
CREATE TABLE images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    gallery_id INT,
    title VARCHAR(255),
    tag TEXT,
    descript TEXT,
    url VARCHAR(255)
);

CREATE TABLE gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    theme VARCHAR(255),
    descript TEXT,
    admin_id INT,
    created_at TIMESTAMP,
    modified_at TIMESTAMP
);
