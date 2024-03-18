"use strict"

const User = require("../../models/User");

const output = {
    home: (req, res) => {
        res.render("home/index");
    },
    login: (req, res) => {
        res.render("home/login");
    },
    join: (req, res) => {
        res.render("home/join");
    }
}

const process = {
    login: (req, res) => {

        const user = new User(req.body);
        const response = user.login();
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