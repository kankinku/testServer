"use strict"

const express = require('express')
const router = express.Router();
// 요청과 기능을 연결한다.

const ctrl = require("./home.ctrl");
//ctrl을 require된 경로로 저장

router.get("/", ctrl.output.home);
router.get("/login", ctrl.output.login);
router.get("/join", ctrl.output.join);

    // ctrl의login으로 export된걸로 인식
    // 요청이 들어오면 할 행동
    //req 요청(request),res 반응 (response)
    // "/"경로로 get요청이 오면 
    //render의 경로에 있는걸 출력

router.post("/login", ctrl.process.login);

module.exports = router;
// 외부에서 사용 가능하도록 웹에서 내보내기