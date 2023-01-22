const express = require('express');
const productsController = require('../controllers/shop');
const router = express.Router();


//admin/add-product => GET
router.get('/add-product', productsController.getAddProduct);

//admin/add-product => POST
router.post('/add-product', productsController.postAddProduct);

router.get('/products')

module.exports = router;

// module.exports = router;
// exports.products = products;
