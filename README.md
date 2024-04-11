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

work
id drop
