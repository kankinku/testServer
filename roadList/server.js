const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'readimg'
});

// 정적 파일 제공 (HTML 파일이 위치한 폴더)
app.use(express.static(path.join(__dirname, 'public')));

// 테마 이미지 정보 제공 라우트
app.get('/theme/:themeName', (req, res) => {
  const themeName = req.params.themeName;

  // MySQL 쿼리 실행하여 선택한 테마의 이미지 정보 가져오기
  connection.query('SELECT name, originalname FROM files WHERE tema = ?', [themeName], (error, results, fields) => {
    if (error) {
      console.error('쿼리 에러:', error);
      res.status(500).json({ error: '서버 오류' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: '테마에 해당하는 이미지를 찾을 수 없습니다.' });
      return;
    }

    // 클라이언트에게 이미지 정보 전송
    res.json(results);
  });
});

// 서버 시작
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});