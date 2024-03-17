"use strict"

const app = require("../app")
const PORT = 3000;

app.listen(PORT, () => { //3000번 포트에 대기(서버 열기)
    console.log('서버 가동')
})

