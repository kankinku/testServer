// main.js
const express = require('express');
const mysql = require('mysql2');
const app = express();
const path = require('path');
const multer = require('multer');
const uuid4 = require('uuid4');
const fs = require('fs');
<<<<<<< HEAD
=======
const mysql = require('mysql2');
>>>>>>> acccd5e789a99ddfa3b639ce2859ae985507ed2b

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


function reloadFile(dbFiles) {
  // 파일 시스템에서 파일 목록 가져오기
  const folderPath = './file'; // 파일이 저장된 폴더 경로로 수정하세요
  fs.readdir(folderPath, (err, fileNames) => {
    if (err) {
      console.error('파일 목록을 읽어오는 중 오류가 발생했습니다: ', err);
      throw err;
    }
    // 데이터베이스에는 존재하지만 파일 시스템에는 없는 파일 확인 및 삭제
    dbFiles.forEach((dbFile) => {
      const fileName = dbFile.name;
      if (!fileNames.includes(fileName)) {
        // 데이터베이스에만 존재하는 파일을 삭제합니다.
        const deleteSql = `DELETE FROM files WHERE name = '${fileName}'`;
        connection.query(deleteSql, (err, result) => {
          if (err) {
            console.error(`${fileName} 파일을 데이터베이스에서 삭제하는 중 오류가 발생했습니다: `, err);
          } else {
            console.log(`${fileName} 파일을 데이터베이스에서 삭제했습니다.`);
          }
        });
      }
    });
  });
}


// MySQL 연결
connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류: ', err);
    throw err;
  }
  console.log('MySQL에 연결되었습니다.');

  // 데이터베이스에서 파일 목록 가져오기
  const selectSql = 'SELECT name FROM files';
  connection.query(selectSql, (err, dbFiles) => {
    if (err) {
      console.error('파일 목록을 가져오는 중 오류가 발생했습니다: ', err);
      throw err;
    }

    reloadFile(dbFiles);
  });
});

const upload = multer({
  storage: multer.diskStorage({
    filename(req, file, done) {
      const randomID = uuid4();
      const ext = path.extname(file.originalname);
      const tema = req.body.tema; // 테마 값 받아오기
      const filename = `${tema}_${randomID}${ext}`; // 테마와 랜덤 ID를 합쳐서 파일 이름으로 설정
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
  console.log("Uploaded file original name:", req.file.originalname);

  // 파일 이름 DB에 저장
  const filename = req.file.filename;
  //여기서 색으로 파싱
  const filetema = req.file.filename.split('_');
  const tema = filetema[0];
  //upload file의 original 이름을 DB에 저장
  const originalname = req.file.originalname;

  const insertSql = `INSERT INTO files (name, tema, originalname) VALUES ('${filename}', '${tema}', '${originalname}');`;

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