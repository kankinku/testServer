const mysql = require('mysql2');
const fs = require('fs');
// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'readimg',
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류: ', err);
    throw err;
  }
  console.log('MySQL에 연결되었습니다.');

  // 데이터베이스에서 파일 목록 가져오기
  const selectSql = 'SELECT image_Id FROM images';
  connection.query(selectSql, (err, dbFiles) => {
    if (err) {
      console.error('파일 목록을 가져오는 중 오류가 발생했습니다: ', err);
      throw err;
    }
    if(dbFiles != null){
      searchFile(dbFiles)
    }
  });
});

module.exports = connection;

  // 파일 시스템에서 파일 목록 가져오기
function searchFile(dbFiles) {
  const folderPath = './public/imagefile'; // 파일이 저장된 폴더 경로로 수정하세요
    fs.readdir(folderPath, (err, titles) => {
      if (err) {
        console.error('파일 목록을 읽어오는 중 오류가 발생했습니다: ', err);
        throw err;
      }
      // 데이터베이스에는 존재하지만 파일 시스템에는 없는 파일 확인 및 삭제
      dbFiles.forEach((dbFile) => {
        const image_Id = dbFile.image_Id;
        if (!titles.includes(image_Id)) {
            // 데이터베이스에만 존재하는 파일을 삭제합니다.
            const deleteSql = `DELETE FROM images WHERE image_Id = '${image_Id}'`;
            connection.query(deleteSql, (err, result) => {
                if (err) {
                    console.error(`${image_Id} 파일을 데이터베이스에서 삭제하는 중 오류가 발생했습니다: `, err);
                } else {
                    console.log(`${image_Id} 파일을 데이터베이스에서 삭제했습니다.`);
                }
            });
        }
      });
    });
}
