"use strict";

const UserStorage = require("./UserStorage");

class User {
  constructor(body) {
    this.body = body;
  }

  login(){
    const client = this.body;
    const { id, psword }  =  UserStorage.getUsersInfo();
    if(id){
      if (id === client.id && psword === client.psword){
        return { success: true };
      }
      return {success : false, msg: "비밀번호를 틀렸습니다."};
    }
    return { success: false, msg: "존재하지 않는 아이디 입니다."}
  }

  register(){
    const client = this.body;
    UserStorage.save(client);

  }
  
}
module.exports = User;