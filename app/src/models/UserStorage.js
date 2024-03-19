"use strict";

class UserStorage {
    static #users = { 
        //변수에 직접 접속할경우 static을 사용해준다.
        // #을 통해서 public이였던 변수를 privit로 변경시켜줌
        id:["1234","sadf","qwer"],
        psword: ["0000","0000","0000"],
        name: ["a","b","c"],
    };

    static getUsers(...fields) {
        const users = this.#users
        const newUsers = fields.reduce((newUsers, field) => {
            if(users.hasOwnProperty(field)){
                newUsers[field] = users[field];
            }
            return newUsers;
        },{}); // {} = newUsers이다.
        // https://youtu.be/x_h2bye9SIE?list=PLSK4WsJ8JS4cQ-niGNum4bkK_THHOizTs
        return newUsers;
    }

    static getUsersInfo(id) {
        const users = this.#users;
        const idx = users.id.indexOf(id);
        const usersKeys = Object.keys(users); // key값을 받아오고 
        const userInfo = usersKeys.reduce((newUser, info) => { //key의 맞는 정보를 받아옴
            newUser[info] = users[info][idx];
            return newUser;
        },{});
        return userInfo;
    }

    static save(userInfo) {
        const users = this.#users;
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.psword.push(userInfo.psword);
    }
}
module.exports = UserStorage;