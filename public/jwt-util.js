const jwt = require('jsonwebtoken');

function sign(payload) {
  // JWT 시크릿 키 설정 (무작위로 생성된 값 또는 환경 변수로 설정하는 것이 좋습니다)
  const secretKey = 'KVXq573!PHLk/U,A(nm@}a';
  
  // JWT 토큰 생성
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // 예: 1시간 유효한 토큰
  
  return token;
}

module.exports = sign;
