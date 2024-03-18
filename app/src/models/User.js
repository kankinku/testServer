"use strict";

const UserStorage = require("./UserStorage");

class User {
  constructor(body) {
    this.body = body;
  }

  login(){
    const body = this.body;
    const { id, psword }  =  UserStorage.getUsersInfo();
    if(id){
      if (id === body.id && psword === body.psword){
        return { success: true };
      }
      return {success : false, msg: "비밀번호를 틀렸습니다."};
    }
    return { success: false, msg: "존재하지 않는 아이디 입니다."}
  }

  
}
module.exports = User;