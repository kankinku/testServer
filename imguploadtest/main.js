// main.js
const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const uuid4 = require('uuid4');
const fs = require('fs');
const mysql = require('mysql');

const publicPath = path.join(__dirname, 'public');
const uploadFolderPath = path.join(__dirname, 'file');

app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.end("HOME");
});

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'readimg'
});

// MySQL 연결 오류 처리
connection.on('error', (err) => {
  console.error('MySQL 연결 오류: ', err);
  throw err;
});

// MySQL 연결
connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류: ', err);
    throw err;
  }
  console.log('MySQL에 연결되었습니다.');

  // 기존 파일 정보 삭제
  const deleteSql = 'DELETE FROM files';
  connection.query(deleteSql, (err, result) => {
    if (err) {
      console.error('기존 파일 정보를 삭제하는 중 오류가 발생했습니다: ', err);
      throw err;
    }
    console.log('기존 파일 정보가 모두 삭제되었습니다.');
  });
});

const upload = multer({
  storage: multer.diskStorage({
    filename(req, file, done) {
      const randomID = uuid4();
      const ext = path.extname(file.originalname);
      const filename = randomID + ext;
      done(null, filename);
    },
    destination(req, file, done) {
      done(null, uploadFolderPath);
    },
  }),
  limits: { fileSize : 1024*1024 },
});

const uploadMiddleware = upload.single('myFile');

// 이미지 업로드 후 MySQL에 이미지 정보 저장 및 파일 정보 다시 불러오기
app.post('/upload', uploadMiddleware, (req, res) => {
  console.log(req.file);

  // 파일 이름 DB에 저장
  const filename = req.file.filename;
  const insertSql = `INSERT INTO files (name) VALUES ('${filename}')`;
  connection.query(insertSql, (err, result) => {
    if (err) {
      console.error('쿼리 실행 오류: ', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    console.log(`${filename}이(가) DB에 저장되었습니다.`);

    // 파일 정보 다시 불러오기
    const selectSql = 'SELECT * FROM files';
    connection.query(selectSql, (err, rows) => {
      if (err) {
        console.error('파일 정보를 가져오는 중 오류가 발생했습니다: ', err);
        throw err;
      }
      console.log('저장된 파일 정보:');
      rows.forEach(row => {
        console.log(row.name);
      });
    });

    res.status(200).send('uploaded');
  });
});

app.listen(3000, () => {
  console.log('server is running at 3000');
});