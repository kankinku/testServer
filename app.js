const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')

// 라우터 가져오기
const searchRouter = require('./router/searchRouter');
const uploadRouter = require('./router/uploadRouter');
const createGalleryRouter = require('./router/createGalleryRouter');

// 내장된 body-parser를 사용하여 폼 데이터 파싱
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// 라우팅 설정
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.get("/show", (req, res) => {
  res.sendFile(path.join(publicPath, "showthema.html"));
});

app.get("/upload", (req, res) => {
  res.sendFile(path.join(publicPath, "upload.html"));
});

app.get("/createGallery", (req, res) => {
  res.sendFile(path.join(publicPath, "createGallery.html"));
});

// 라우터 사용 설정
app.use('/createGallery', createGalleryRouter);
app.use('/search', searchRouter);
app.use('/upload', uploadRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
