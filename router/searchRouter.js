const express = require('express');
const router = express.Router();
const connection = require('../public/db');

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
        const user_Id = req.query.user_Id;

        if (!gallery_Id && !user_Id) {
            // 클라이언트로 갤러리 아이디 목록 반환
            res.json(galleryIds);
        } else {
            // 클라이언트로부터 받은 갤러리 아이디를 이용하여 이미지 제목들을 가져오는 함수 호출
            fetchImageId(gallery_Id, user_Id,(error, results) => {
                if (error) {
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }

                // 결과를 JSON 형태로 반환
                const imageIds = results.map(result => result.image_Id);

                // 클라이언트로 이미지 제목들을 반환
                res.json(imageIds);
            });
        }
    });
});

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

// 이미지 제목들을 가져오는 함수

function fetchImageId(galleryId , userId , callback) {
    // gallery 테이블에서 선택한 gallery_Id 값을 갖는 목록의 Id 값을 가져오는 쿼리
    const query = `
    SELECT images.image_Id
    FROM gallery
    INNER JOIN images ON gallery.gallery_Id = images.gallery_Id
    WHERE gallery.gallery_Id = ? AND gallery.user_Id = ?;
  `;

    // 쿼리 실행
    connection.query(query, [galleryId, userId], (err, results) => {
        if (err) {
            console.error('쿼리 실행 오류:', err);
            callback(err, null);
            return;
        }
        console.log('검색 결과:', results);

        // 결과 반환
        callback(null, results);
    });
}

module.exports = router;
