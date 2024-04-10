// app.js

const express = require('express');
const app = express();
const path = require('path');
const searchRouter = require('./router/searchRouter');
const uploadRoute = require('./router/uploadRoute');

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

//요기 경로로 바꾸면 알아서 위치 바뀜
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.get("/show", (req, res) => {
  res.sendFile(path.join(publicPath, "showthema.html"));
});

app.get("/upload", (req, res) => {
  res.sendFile(path.join(publicPath, "upload.html"));
});

app.use('/search', searchRouter);
app.use('/upload', uploadRoute);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});