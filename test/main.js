const mysql = require('mysql2');

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'readimg'
});

// 연결
connection.connect();

// 쿼리 실행
connection.query("SELECT name FROM files WHERE tema = 'red'", function (error, results, fields) {
  if (error) throw error;
  // 결과를 순회하며 name 정보 출력
  results.forEach(result => {
    console.log('Name:', result.name);
  });
});


// 연결 종료
connection.end();