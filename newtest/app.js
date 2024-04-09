const express = require('express');
const app = express();
const path = require('path');
const connection = require('./public/db'); // db 모듈 가져오기

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// HTTP GET 요청에 대한 처리
app.get('/search', (req, res) => {
  const thema = req.query.thema;
  // MySQL 쿼리 실행
  connection.query(`SELECT originalname FROM files WHERE thema = '${thema}'`, function(error, results, fields){
    if (error) {
      console.error('Error executing MySQL query: ' + error.stack);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    // 결과를 JSON 형태로 반환
    const fileNames = results.map(result => result.originalname);
    res.json(fileNames);
  });
});

// 서버 시작
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

