"use strict"

const express = require('express');
const bodyParser = require("body-parser");
//body를 파싱가능하게 만들어주는 것
const app = express();
 
app.set("views", "./src/views");
 // views(html)을 지정한 경로에서 불러온다.
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));

//body-parser가 미들웨이로 파싱하는것을 위해서
app.use(bodyParser.json());
// URL을 통해 전달되는 데이터에 
//한글, 공백과 같은 문자가 포함될 경우 제대로 인식되니 않는 문제 해결
app.use(bodyParser.urlencoded({ extended: true }));

const home = require("./src/routes/home");
//경로에 있는 파일을 home으로 저장함
app.use("/", home);
//use -> 미들웨어를 등록하는 메소드

module.exports = app;
