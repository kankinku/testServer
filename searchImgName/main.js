const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const mysql = require('mysql2');

const connection = require('./public/db');

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.get('/search', (req, res) => {
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
      return `./file/${fileName}`; 
      //문제점 
      //file의 경로를 ../로 나가서 이후 지정한다면 인식하지 못한다.
    });
    // 파일 경로를 HTML로 응답
    res.send(filePaths);
    console.log(filePaths);
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
