const express = require('express');
const productsController = require('../controllers/products')

const router = express.Router();

router.get('/', productsController.getProducts); // 미들웨어함수 추가,

module.exports = router;
