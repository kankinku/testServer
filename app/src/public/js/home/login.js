"use strict";

// 필요한 DOM 요소들을 선택합니다.
const idInput = document.querySelector("#Id"); // 아이디 입력 필드
const pswordInput = document.querySelector("#Psword"); // 비밀번호 입력 필드
const loginBtn = document.querySelector("#loginBtn"); // 로그인 버튼
const plusBtn = document.querySelector("#plusBtn"); // 회원가입 버튼

// 로그인 버튼 클릭 이벤트 핸들러를 등록합니다.
loginBtn.addEventListener("click", login);

// 회원가입 버튼 클릭 이벤트 핸들러를 등록합니다.
plusBtn.addEventListener("click", plusUser);

// 로그인을 시도하는 함수입니다.
function login(event) {
    event.preventDefault(); // 기본 동작(폼 제출)을 중지합니다.

    // 사용자가 입력한 아이디와 비밀번호를 요청 객체로 만듭니다.
    const req = {
        id: idInput.value,
        psword: pswordInput.value,
    };

    // 서버에 로그인 요청을 보냅니다.
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res) => {
        // 응답이 성공적으로 받아졌는지 확인합니다.
        if (!res.ok) {
            throw new Error("서버 응답 실패");
        }
        return res.json(); // JSON 형태로 변환하여 반환합니다.
    })
    .then((res) => {
        // 로그인이 성공했는지 확인합니다.
        if (res.success) {
            // 성공 시 메인 페이지로 이동합니다.
            location.href = "/";
        } else {
            // 실패 시 사용자에게 메시지를 표시합니다.
            alert(res.msg);
        }
    })
    .catch((err) => {
        // 오류가 발생했을 때 콘솔에 오류 메시지를 출력합니다.
        console.error("로그인 중 오류 발생:", err.message);
        // 사용자에게 오류 메시지를 알립니다.
        alert("로그인 중 오류가 발생했습니다.");
    });
}

// 회원가입 페이지로 이동하는 함수입니다.
function plusUser() {
    // 회원가입 페이지로 이동합니다.
    location.href = "/register";
}