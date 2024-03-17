"use strict";

class UserStorage {
    static #users = { //변수에 직접 접속할경우 static을 사용해준다.
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
        }, {});
        // https://youtu.be/x_h2bye9SIE?list=PLSK4WsJ8JS4cQ-niGNum4bkK_THHOizTs
        return newUsers;
    }
}
module.exports = UserStorage;