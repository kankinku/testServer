// routes/uploadRoute.js
const express = require('express');

const router = express.Router();
const uploadController = require('../controllers/uploadController');

router.post('/', uploadController.uploadFile);

// 갤러리 아이디 목록과 이미지 제목들을 가져오는 라우트
router.get('/', (req, res) => {
  // 갤러리 아이디 목록을 가져오는 함수 호출
  fetchGalleryIds((error, galleryIds) => {
      if (error) {
          res.status(500).json({ error: 'Internal Server Error' });
          return;
      }

      // 클라이언트로부터 받은 갤러리 아이디
      const gallery_Id = req.query.gallery_Id;

      if (!gallery_Id) {
          // 클라이언트로 갤러리 아이디 목록 반환
          res.json(galleryIds);
      } 
  });
});

module.exports = router;

// 갤러리 아이디 목록을 가져오는 함수
function fetchGalleryIds(callback) {
  connection.query('SELECT gallery_Id FROM gallery', (error, results) => {
      if (error) {
          console.error('Error executing MySQL query: ' + error.stack);
          callback(error, null);
          return;
      }

      // 결과 반환
      const galleryIds = results.map(result => result.gallery_Id);
      callback(null, galleryIds);
  });
}