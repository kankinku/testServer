// 환경변수를 위한 모듈 (.env)
require('dotenv').config();

// JS로 SQL문을 사용할 수 있도록 하는 sequelize 모듈 (편의성)
const { Sequelize, DataTypes, Model } = require('sequelize');

// 비밀번호를 암호화할 수 있도록 하는 bcrypt 모듈
const bcrypt = require('bcrypt');

// 토큰을 생성할 수 있도록 하는 jsonwebtoken 모듈
const jwt = require('jsonwebtoken');


module.exports = (sequelize, DataTypes) => {
    // User 모델 정의 (id, createdAt, updatedAt 제외)
    class User extends Model { }

    // User 모델 초기화
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 255],
            },
        },
        role: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        token: {
            type: DataTypes.STRING,
        },
        tokenExp: {
            type: DataTypes.INTEGER,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        sequelize,
        modelName: 'User',
        hooks : {
            // sequelize에서 제공하는 hook 기능

            // User 회원가입 시 비밀번호 암호화
            beforeCreate : (async (user) => {
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(user.dataValues.password, saltRounds);
                console.log(hashedPassword);
                user.dataValues.password = hashedPassword;
            }),
        }
    });

    // User 모델에서 사용하는 사용자 정의 함수
    // User 로그인 시 비밀번호 확인하는 함수 (암호화된 비밀번호는 복호화가 불가능 -> 클라이언트가 입력한 비밀번호를 암호화하여 DB 일치 여부 확인)
    User.prototype.comparePassword = ((originalPassword, plainPassword, callback) => {

        // 암호 확인
        bcrypt.compare(plainPassword, originalPassword, function(err, isMatch) {
            if (err) return callback(err);
            callback(null, isMatch);
        });
    });

    // User 로그인 성공 시 토큰 생성하는 함수
    User.prototype.generateToken = (async (user, callback) => {

        // user.id + 'secretToken' = token
        // ->
        // 'secretToken' -> user.id
        var token = jwt.sign(user.dataValues.id, process.env.JWT_SECRET_KEY);

        user.token = token;
        try {
            await user.save();
            console.log('token was saved.');
            return callback(null, user);
        } catch (error) {
            return callback(error);
        }
    });

    // 클라이언트 토큰 복호화
    User.prototype.decodeToken = ((token, callback) => {

        // 토큰을 복호화
        jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decoded) {
            if (err) {
                return callback(err);
            }
            return callback(null, decoded);
        });
    });

    // User 토큰 삭제
    User.prototype.deleteToken = (async(user, callback) => {

        // 로그아웃하려는 해당 User의 토큰을 삭제
        user.token = "";
        try {
            await user.save();
            console.log('token was deleted.');
            return callback(null, user);
        } catch (error) {
            return callback(error);
        }
    });



    // User 테이블 생성
    (async () => {
        await sequelize.sync();
        console.log("User model were synchronized successfully.");
    })();

   return User;
};
