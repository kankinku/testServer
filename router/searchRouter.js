// router/searchRouter.js

const express = require('express');
const router = express.Router();
const connection = require('../public/db');

router.get('/', (req, res) => {
  const thema = req.query.thema;
  
  // MySQL 쿼리 실행
  connection.query(`SELECT name FROM files WHERE thema = '${thema}'`, function(error, results, fields){
    if (error) {
      console.error('Error executing MySQL query: ' + error.stack);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    
    // 결과를 JSON 형태로 반환
    const fileNames = results.map(result => result.name);
    
    // 파일 이름을 사용하여 파일 시스템에서 파일 경로를 찾음
    const filePaths = fileNames.map(fileName => {
      return fileName; // 파일명 그대로 반환
    });
    
    // 파일 경로를 HTML로 응답
    res.send(filePaths);
    console.log(filePaths);
  });
});

module.exports = router;
