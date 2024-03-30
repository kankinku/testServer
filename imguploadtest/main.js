// main.js
const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.join(__dirname, 'public');
const multer = require('multer');
const uuid4 = require('uuid4');

app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.end("HOME");
});

const upload = multer({
  storage: multer.diskStorage({
      filename(req, file, done) {
        const randomID = uuid4();
        const ext = path.extname(file.originalname);
        const filename = randomID + ext;
        done(null, filename);
      },
      destination(req, file, done) {
          done(null, path.join(__dirname, "file"));
      },
    }),
    limits: { fileSize : 1024*1024 },
});

const uploadMiddleware = upload.single('myFile');

// app.use(uploadMiddleware);

app.post('/upload', uploadMiddleware, (req,res) => {
  console.log(req.file);
  res.status(200).send('uploaded');
})

app.listen(3000, () => {
  console.log('server is running at 3000');
});