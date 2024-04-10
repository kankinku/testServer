mysql
DB name : readimg
table : files
----------------
+--------------+--------------+------+-----+-------------------+-------------------+
| Field        | Type         | Null | Key | Default           | Extra             |
+--------------+--------------+------+-----+-------------------+-------------------+
| id           | int          | NO   | PRI | NULL              | auto_increment    |
| name         | varchar(255) | NO   |     | NULL              |                   |
| thema        | varchar(255) | YES  |     | NULL              |                   |
| create_date  | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| originalname | varchar(255) | YES  |     | NULL              |                   |
+--------------+--------------+------+-----+-------------------+-------------------+