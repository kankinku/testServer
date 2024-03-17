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