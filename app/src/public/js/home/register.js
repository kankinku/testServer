"use state"

// DOM -> Document Object Model
const id = document.querySelector("#Id"),//선택자
    name = document.querySelector("#name"),
    psword = document.querySelector("#psword"),
    confirmPsword = document.querySelector("#confirm-psword"),
    registerBtn = document.querySelector("#");

// 위에서 dom이 id를 가져오기 전에 console.log가 먼져 출력됨

registerBtn.addEventListener("click",register);
plusBtn.addEventListener("click",plusUser);


function register() {
    if(!id.value) return alert("아이디를 입력해주세요.");
    if(psword !== confirmPsword) return alert("비밀번호가 일치하지 않습니다.");
    
    const req = {
        id: id.value,
        name: name.value,
        psword : psword.value,
        confirmPsword : confirmPsword.value,
    }
    console.log(req);

     fetch("/register",{
         method: "POST",
         headers: {
             "Content-Type" : "application/json",
         },
         body: JSON.stringify(req),
     })// 로그인 성공여부 전달
     .then((res) => res.json())
     .then((res) => {
         if(res.success) {
             location.href = "/login";
         }else{
             alert(res.msg);
         }
     })
     .catch((err) => {
         console.error("회원가입중 에러 발생");
     });
}

function plusUser() {
    location.href = "/join";
}