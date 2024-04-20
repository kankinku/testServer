// router/searchRouter.js

const express = require('express');
const router = express.Router();
const connection = require('../public/db');

// router.get('/', (req, res) => {
//   const theme = req.query.theme;
//   connection.query(`SELECT image_Id FROM images WHERE theme = '${theme}'`, function(error, results, fields){
//     if (error) {
//       console.error('Error executing MySQL query: ' + error.stack);
//       res.status(500).json({ error: 'Internal Server Error' });
//       return;
//     }
    
//     // 결과를 JSON 형태로 반환
//     const fileNames = results.map(result => result.image_Id);
    
//     // 파일 이름을 사용하여 파일 시스템에서 파일 경로를 찾음
//     const filePaths = fileNames.map(fileName => {
//       return fileName; // 파일명 그대로 반환
//     });

//     // 파일 경로를 HTML로 응답
//     res.send(filePaths);
//     console.log(filePaths);
//   });
// });

// router.get('/',(req,res) => {

//   connection.query('SELECT gallery_Id FROM gallery', (error, results, fields) => {
//     if (error) {
//         console.error('Error executing MySQL query: ' + error.stack);
//         res.status(500).json({ error: 'Internal Server Error' });
//         return;
//     }
    
//     // 결과를 JSON 형태로 반환
//     const galleryIds = results.map(result => result.gallery_Id);
    
//     // 갤러리 아이디를 클라이언트로 전송
//     res.send(galleryIds);
//   });
// })


router.get('/', (req, res) => {
  const theme = req.query.theme;

  // 버튼이 눌렸을 때
  if (theme) {
      connection.query(`SELECT image_Id FROM images WHERE theme = '${theme}'`, function(error, results, fields){
          if (error) {
              console.error('Error executing MySQL query: ' + error.stack);
              res.status(500).json({ error: 'Internal Server Error' });
              return;
          }

          // 결과를 JSON 형태로 반환
          const fileNames = results.map(result => result.image_Id);

          // 파일 이름을 사용하여 파일 시스템에서 파일 경로를 찾음
          const filePaths = fileNames.map(fileName => {
              return fileName; // 파일명 그대로 반환
          });

          // 파일 경로를 HTML로 응답
          res.send(filePaths);
          console.log(filePaths);
      });
  } 
  // 웹페이지에 접속했을 때
  else {
      connection.query('SELECT gallery_Id FROM gallery', (error, results, fields) => {
          if (error) {
              console.error('Error executing MySQL query: ' + error.stack);
              res.status(500).json({ error: 'Internal Server Error' });
              return;
          }

          // 결과를 JSON 형태로 반환
          const galleryIds = results.map(result => result.gallery_Id);

          // 갤러리 아이디를 클라이언트로 전송
          res.send(galleryIds);
      });
  }
});

module.exports = router;