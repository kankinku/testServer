const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const path = require('path');

const app = express();

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
});

// MySQL 연결
connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류:', err);
    throw err;
  }
  console.log('MySQL에 연결되었습니다.');
});

// 파일 저장 경로 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // 업로드된 파일이 저장될 디렉토리 경로
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // 파일 이름 유지
  }
});

// Multer 미들웨어 설정
const upload = multer({ storage });

// 파일 업로드 처리 라우터
app.post('/upload', upload.single('file'), (req, res) => {
  // 업로드된 파일의 정보
  const fileInfo = {
    filename: req.file.originalname,
    path: req.file.path, // 업로드된 파일의 절대 경로
    mimetype: req.file.mimetype,
    size: req.file.size
  };

  // 파일 정보를 MySQL에 저장
  const sql = 'INSERT INTO files SET ?';
  connection.query(sql, fileInfo, (err, result) => {
    if (err) {
      console.error('파일 정보를 저장하는 중 오류 발생:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    console.log('파일 정보를 MySQL에 저장했습니다.');
    res.status(200).send('File uploaded successfully');
  });
});

// 파일 열기 라우터
app.get('/files/:id', (req, res) => {
  const fileId = req.params.id;

  // MySQL에서 파일 정보를 가져옴
  const sql = 'SELECT * FROM files WHERE id = ?';
  connection.query(sql, [fileId], (err, results) => {
    if (err) {
      console.error('파일 정보를 가져오는 중 오류 발생:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // 파일 경로 추출
    const filePath = results[0].path;

    // 파일을 읽어서 클라이언트로 전송
    res.sendFile(path.join(__dirname, filePath));
  });
});

// 서버 시작
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});
