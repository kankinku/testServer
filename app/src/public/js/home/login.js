"use state"

// DOM -> Document Object Model
const Id = document.querySelector("#Id"),//선택자
    Pw = document.querySelector("#Pw"),
    loginBtn = document.querySelector("button");

// 위에서 dom이 id를 가져오기 전에 console.log가 먼져 출력됨

loginBtn.addEventListener("click",login);

function login() {
    const req = {
        id: Id.value,
        psword : Pw.value,
    }
    console.log(req)
}