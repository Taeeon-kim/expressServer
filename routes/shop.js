const express = require('express');
const shopController = require('../controllers/shop')

const router = express.Router();

router.get('/', shopController.getIndex); // 미들웨어함수 추가,
router.get('/products', shopController.getProducts);
router.get('/cart', shopController.getCart);
router.get('/checkout', shopController.getCheckout);

module.exports = router;
