const express = require('express');
const productsController = require('../controllers/shop')

const router = express.Router();

router.get('/', productsController.getProducts); // 미들웨어함수 추가,
router.get('/products');
router.get('/cart');
router.get('/checkout');

module.exports = router;
