// createGalleryController.js

const connection = require('../public/db');

exports.createGallery = (req, res) => {
    // 클라이언트에서 전송된 데이터 확인
    console.log(req.body);

    // 클라이언트에서 전송된 데이터 추출
    const { user_Id, gallery_Id, theme, type} = req.body;

    // 받아온 데이터가 없는 경우
    if (!user_Id || !gallery_Id || !theme) {
        res.status(400).send('Please provide all required information');
        return;
    }

    // 받아온 데이터를 데이터베이스에 삽입하는 쿼리문
    const insertSql = `INSERT INTO gallery (user_Id, gallery_Id, theme, type) VALUES ('${user_Id}', '${gallery_Id}', '${theme}','${type}')`;

    // 데이터베이스에 데이터 삽입
    connection.query(insertSql, (err, result) => {
        if (err) {
            console.error('쿼리 실행 오류: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log(`${gallery_Id} 갤러리가 생성되었습니다.`);

        // 갤러리 생성이 성공하면 성공 응답을 보냄
        res.status(200).send('Gallery Created');
    });
};
