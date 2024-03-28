"use strict";

// DOM -> Document Object Model
const id = document.querySelector("#Id"),//선택자
    psword = document.querySelector("#Psword"),
    loginBtn = document.querySelector("#loginBtn"),
    plusBtn = document.querySelector("#plusBtn");

// 위에서 dom이 id를 가져오기 전에 console.log가 먼져 출력됨

loginBtn.addEventListener("click",login);
plusBtn.addEventListener("click",plusUser);


function login() {
    //req 응답으로 user가 입력한 id와 psword가 전송된다.
    const req = {
        id: id.value,
        psword : psword.value,
    }

    fetch("/login",{
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(req),
    })// 로그인 성공여부 전달
    .then((res) => res.json())
    .then((res) => {
        if(res.success) {
            location.href = "/";
        }else{
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error("로그인중 에러 발생");
    });
}

function plusUser() {
    location.href = "/register";
}