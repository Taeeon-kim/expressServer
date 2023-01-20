const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  // console.log('In the Middleware!');
  res.send('<h1>Hello from express!</h1>');
  // next(); // 다음 use 미들웨어를 계속 이어가기위한 요청을 허용해준다
}); // 미들웨어함수 추가,

module.exports = router;
