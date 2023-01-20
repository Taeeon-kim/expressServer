const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const router = express.Router();

//admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  // console.log('In another Middleware!');
  res.sendFile(path.join(rootDir, 'views', 'add-product.html')); // 현재경로에서 ../ 뒤로가서 views 폴더의 add-product.html을 보내줌
});

//admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
