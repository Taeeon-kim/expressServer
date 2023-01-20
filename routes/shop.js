const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const router = express.Router();

router.get('/', (req, res, next) => {
  // console.log('In the Middleware!');
  res.sendFile(path.join(rootDir, 'views', 'shop.html')); // join 을 쓰는 이유는 윈도우와 리눅스 시스템에서 시스템 경로가 윈도우는 /, 리눅스는 \ 로 쓰기 때문에 이렇게 사용하는 것
  // next(); // 다음 use 미들웨어를 계속 이어가기위한 요청을 허용해준다
}); // 미들웨어함수 추가,

module.exports = router;
