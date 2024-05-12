// controllers/uploadController.js
const path = require('path');
const multer = require('multer');
const uuid4 = require('uuid4');

const uploadFolderPath = path.join(__dirname, '../public', 'imagefile');

const connection = require('../public/db');
const jwt = require('jsonwebtoken'); // jwt-util.js 파일이 필요합니다.


// 이미지 업로드 후 MySQL에 이미지 정보 저장 및 파일 정보 다시 불러오기
exports.uploadFile = (req, res) => {
  const upload = multer({
    storage: multer.diskStorage({
      filename(req, file, done) {
        const randomID = uuid4();
        const ext = path.extname(file.originalname);
        const filename = `${randomID}${ext}`;
        done(null, filename);
      },
      destination(req, file, done) {
        done(null, uploadFolderPath);
      }
    }),
    limits: { fileSize : 1024*1024 },
  }).single('myFile');

  upload(req, res, (err) => {
    if (err) {
      console.error('파일 업로드 중 오류가 발생했습니다: ', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const filename = req.file.originalname;
    const image_id = req.file.filename;
    const gallery_Id = req.body.gallery_Id;
    const user_Id = req.body.user_Id;
    const main_tag = req.body.main_tag;
    const sub_tag = req.body.sub_tag;
    
    const insertSql = `INSERT INTO images (user_Id, gallery_Id, title, image_Id, main_tag, sub_tag) VALUES ('${user_Id}', '${gallery_Id}', '${filename}', '${image_id}', '${main_tag}', '${sub_tag}');`;

    connection.query(insertSql, (err, result) => {
      if (err) {
        console.error('쿼리 실행 오류: ', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      console.log(`${filename}이(가) DB에 저장되었습니다.`);

      const selectSql = 'SELECT * FROM images';
      connection.query(selectSql, (err, rows) => {
        if (err) {
          console.error('파일 정보를 가져오는 중 오류가 발생했습니다: ', err);
          throw err;
        }
        console.log('저장된 파일 정보:');
        rows.forEach(row => {
          console.log(row.title);
        });
      });

      res.status(200).send('uploaded');
    });
  });
};
