// 환경변수를 위한 모듈 (.env)
require('dotenv').config();

// Express 모듈 설정 (Express 서버 생성, 포트 설정)
const express = require('express');
const app = express();
const port = process.env.SERVER_PORT;

// Body 데이터 분석 모듈 (Request with body -> req.body)
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));            //application/x-www-form-urlencoded
app.use(bodyParser.json());                                 // application/json

// Cookie 모듈 (헤더에서 쿠키 파싱)
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// 사용자 정의 모델 묶음 가져오기
const db = require('./db');
const { User } = db;


// 라우팅 테스트
app.get('/', (req, res) => {
    res.send('<h1>router test</h1>');
});

// 회원가입
app.post('/api/users/register', async (req, res) => {

/*
    // sequelize에서 제공하는 build, save 메서드로 유저 정보를 저장
    try {
        const user = User.build(req.body);
        await user.save();
        console.log('user was saved to the database!');
        return res.status(200).json({
            success: true, 
            request: req.body
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
*/

    // build + save 기능을 합친 create 메서드
    try {
        // 클라이언트가 보낸 유저 정보 req.body를 create 메서드로 데이터베이스에 삽입
        const user = await User.create(req.body);
        return res.status(200).json({
            success: true, 
            request: req.body
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }

});

// 로그인
app.post('/api/users/login', async (req, res) => {

    // 요청된 이메일이 데이터베이스에 있는지 확인
    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user) {
        return res.json({
            loginSuccess: false,
            message: "입력하신 이메일에 해당하는 유저가 없습니다.",
        });
    }

    // 데이터베이스에 있으면 비밀번호가 일치하는지 확인
    user.comparePassword(user.dataValues.password, req.body.password, (err, isMatch) => {
        if (!isMatch) {
            return res.json({
                loginSuccess: false,
                message: "비밀번호가 틀렸습니다.",
            });
        }

        // 비밀번호까지 일치하면 토큰 생성
        user.generateToken(user, (err, user) => {
            if (err) {
                return res.status(400).send(err);
            }

            // 토큰을 저장 (1. 로컬 스토리지, 2. 세션, 3. 쿠키 중 택1, 여기선 쿠키에 저장)
            res.cookie("userAuth", user.token).status(200).json({
                loginSuccess: true,
                userId: user.id,
            });
        });
    })
    
});

// User 인증 기능 확인
app.get('/api/users/auth', (req, res) => {



});

// 로그아웃
app.get('/api/users/logout', async (req, res) => {

    // 클라이언트의 토큰과 같은 토큰을 가진 User를 찾기
    let isAuth = false;
    const token = req.cookies.userAuth;
    const user = await User.findOne({ where: { token: token } });
    if (!user) {
        return res.json({
            logoutSuccess: false,
            message: "토큰 오류",
        });
    }

    // 클라이언트의 토큰을 복호화한 id가 해당 User의 id와 같은지 확인
    user.decodeToken(token, (err, decoded) => {
        if (err) {
            return res.status(400).send(err);
        }

        if(user.dataValues.id == decoded) {
            isAuth = true;
        } 
    });

    if (!isAuth) {
        return res.json({
            loginSuccess: false,
            error: "different token",
        });
    }

    user.deleteToken(user, (err, user) => {
        if (err) {
            return res.status(400).send(err);
        }

        return res.json({
            loginSuccess: true,
        });
    });

});


// 서버 오픈
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
