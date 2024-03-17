"use strict"

const home = (req,res)=>{
    res.render("home/index")
}

const login = (req,res) => {
    res.render("home/login")
};

module.exports = {
    home,
    login
};


//{ key }{
//    hello : hello
//    login : login
//} -> key만 입력하면 key값이 value가 된다.