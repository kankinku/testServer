// main.js
const express = require('express');

const app = express();

const path = require('path');
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

app.listen(3000, () => {
    console.log('server is running at 3000');
});

app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.end("HOME");
});

app.get("/", (req, res) => {
  res.end("HOME");
});

app.use(express.static(publicPath));