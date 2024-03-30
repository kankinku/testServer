const fs = require('fs');
const mysql = require('mysql');

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'readimg'
});

// MySQL 연결
connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류: ', err);
    throw err;
  }
  console.log('MySQL에 연결되었습니다.');

  // 폴더 내 파일 읽어오기 및 DB에 저장
  const folderPath = './file'; // 여기에 폴더 경로를 입력하세요.

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('폴더를 읽을 수 없습니다: ', err);
      throw err;
    }

    files.forEach((file) => {
      // 파일 이름 DB에 저장
      const sql = `INSERT INTO files (name) VALUES ('${file}')`;
      connection.query(sql, (err, result) => {
        if (err) {
          console.error('쿼리 실행 오류: ', err);
          // 여기에 오류 처리를 추가합니다.
          return; // 오류가 발생했으므로 더 이상 진행하지 않고 다음 파일로 넘어갑니다.
        }
        console.log(`${file}이(가) DB에 저장되었습니다.`);
      });
    });

    // 모든 파일 처리 후에 MySQL 연결 종료
    connection.end((err) => {
      if (err) {
        console.error('MySQL 연결 종료 오류: ', err);
        throw err;
      }
      console.log('MySQL 연결이 종료되었습니다.');
    });
  });
});