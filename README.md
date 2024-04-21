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

[2024-04-14] 피드백<br>
현재는 name에 image의 고유 아이디와 경로등의 여러가지 역활을 수행한다.<br>
table의 id필드를 이용해서 아이디를 분리 <br>
경로는 destination을 통해서 따로 저장 (저번에 못함)<br>

DB
CREATE TABLE images (
  createDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  title VARCHAR(255),
  user_Id VARCHAR(255),
  gallery_Id VARCHAR(255),
  image_Id VARCHAR(255)
);

CREATE TABLE gallery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  gallery_Id VARCHAR(255),
  theme VARCHAR(255),
  user_Id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  type TINYINT DEFAULT 0
);
