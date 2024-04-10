// controllers/uploadController.js
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const uuid4 = require('uuid4');
const mysql = require('mysql2');

const uploadFolderPath = path.join(__dirname, '../public', 'imagefile');

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'readimg'
});

function reloadFile(dbFiles) {
  const folderPath = './file';
  fs.readdir(folderPath, (err, fileNames) => {
    if (err) {
      console.error('파일 목록을 읽어오는 중 오류가 발생했습니다: ', err);
      throw err;
    }
    dbFiles.forEach((dbFile) => {
      const fileName = dbFile.name;
      if (!fileNames.includes(fileName)) {
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

// 이미지 업로드 후 MySQL에 이미지 정보 저장 및 파일 정보 다시 불러오기
exports.uploadFile = (req, res) => {
  const upload = multer({
    storage: multer.diskStorage({
      filename(req, file, done) {
        const randomID = uuid4();
        const ext = path.extname(file.originalname);
        const thema = req.body.thema;
        const filename = `${thema}_${randomID}${ext}`;
        done(null, filename);
      },
      destination(req, file, done) {
        done(null, uploadFolderPath);
      },
    }),
    limits: { fileSize : 1024*1024 },
  }).single('myFile');

  upload(req, res, (err) => {
    if (err) {
      console.error('파일 업로드 중 오류가 발생했습니다: ', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // 파일 이름 DB에 저장
    const filename = req.file.filename;
    const filethema = req.file.filename.split('_');
    const thema = filethema[0];
    const originalname = req.file.originalname;

    const insertSql = `INSERT INTO files (name, thema, originalname) VALUES ('${filename}', '${thema}', '${originalname}');`;

    connection.query(insertSql, (err, result) => {
      if (err) {
        console.error('쿼리 실행 오류: ', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      console.log(`${filename}이(가) DB에 저장되었습니다.`);

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
};
