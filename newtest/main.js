const express = require("express");
const app = express();
const path = require("path");

//path를 이용해서 미들웨어 사용
const publicPath = path.join(__dirname, 'public');

app.use(express.static(publicPath));

// 루트 경로에 대한 요청에 대해 index.html을 서빙
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

const port = 3000;
app.listen(port, function(){
  console.log(`app is running on port ${port}`);
});
