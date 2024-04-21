const mysql = require('mysql2');

// MySQL 연결 정보
const connection = mysql.createConnection({
  host: 'localhost', // MySQL 호스트
  user: 'root', // MySQL 사용자명
  password: '0000', // MySQL 비밀번호
  database: 'readimg' // 사용할 데이터베이스명
});

// 선택한 gallery_Id 값
const selectedGalleryId = "Country"; // 예시로 1로 설정하였습니다. 실제로 사용할 값을 설정하세요.

// MySQL 연결
connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류:', err);
    throw err;
  }
  console.log('MySQL 연결 성공!');
  
  // gallery 테이블에서 선택한 gallery_Id 값을 갖는 목록의 title 값을 가져오는 쿼리
  const query = `
    SELECT images.image_Id
    FROM gallery
    INNER JOIN images ON gallery.gallery_Id = images.gallery_Id
    WHERE gallery.gallery_Id = ?;
  `;

  // 쿼리 실행
  connection.query(query, [selectedGalleryId], (err, results) => {
    if (err) {
      console.error('쿼리 실행 오류:', err);
      throw err;
    }
    console.log('검색 결과:', results);
    
    // 결과 출력
    results.forEach((row) => {
      console.log('Title:', row.image_Id);
    });
    
    // MySQL 연결 종료
    connection.end();
  });
});