// JS로 SQL문을 사용할 수 있도록 하는 sequelize 모듈 (편의성)
const { Sequelize } = require('sequelize');

// sequelize DB 연결 설정
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
});

// sequelize DB 연결 테스트
(async () => {
    try {
        await sequelize.authenticate(); //sequelize에 인증될때 까지 대기
        console.log('DB Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();


// 모든 사용자 정의 모델 가져오기
const User = require("./models/User")(sequelize, Sequelize.DataTypes);


// 사용자 정의 모델 묶음 내보내기
const db = {};
db.User = User;

module.exports = db;