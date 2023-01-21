const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const adminData = require('./admin');
const router = express.Router();

router.get('/', (req, res, next) => {
  // console.log('In the Middleware!');
  //   console.log(adminData.products);
  //   res.sendFile(path.join(rootDir, 'views', 'shop.html')); // join 을 쓰는 이유는 윈도우와 리눅스 시스템에서 시스템 경로가 윈도우는 /, 리눅스는 \ 로 쓰기 때문에 이렇게 사용하는 것
  const products = adminData.products;
  res.render('shop.pug', { prods: products, pageTitle: 'Shop', path: '/' }); //app.set() 템플릿 셋팅하였기 때문에 파일명만 쓰면됨
}); // 미들웨어함수 추가,

module.exports = router;
