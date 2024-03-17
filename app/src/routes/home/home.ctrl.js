"use strict"

const users = {
    id : ["123","456","789"],
    psword : ["0000" , "0000" , "0000"]
}

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

        if (users.id.includes(id)){
            const idx = users.id.indexOf(id);
            if (users.psword[idx] === psword) {
                return res.json({
                    succes: true,
                    msg : "로그인에 성공하셨습니다.",
                });
            }
        }
        return res.json({
            success: false,
            msg: "로그인에 실패하셨습니다.",
        });
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