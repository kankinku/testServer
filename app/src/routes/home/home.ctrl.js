"use strict"

const UserStorage = require("../../models/UserStorage");

const output = {
    home: (req, res) => {
        res.render("home/index");
    },
    login: (req, res) => {
        res.render("home/login");
    }
}

const process = {
    login: (req, res) => {
        const id = req.body.id,
            psword = req.body.psword;
        // const userStorage = new UserStorage(); -> 이거 안쓰면 userStorage.js에서 userStorage를 static으로 설정

        const users = UserStorage.getUsers("id","psword");
        //id와 pw만 받아와서 출력한다.

        const response = {};
        if (users.id.includes(id)){
            const idx = users.id.indexOf(id);
            if (users.psword[idx] === psword) {
                response.success = true;
                return res.json(response);
            }
        }
        
        response.success = false;
        response.meg = "로그인에 실패";
        return res.json(response);
    },
};

module.exports = {
    output,
    process,
};


//{ key }{
//    hello : hello
//    login : login
//} -> key만 입력하면 key값이 value가 된다.