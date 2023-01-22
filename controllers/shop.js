const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
    }); //app.set() 템플릿 셋팅하였기 때문에 파일명만 쓰면됨
  });
  // console.log('In the Middleware!');
  //   console.log(adminData.products);
  //   res.sendFile(path.join(rootDir, 'views', 'shop.html')); // join 을 쓰는 이유는 윈도우와 리눅스 시스템에서 시스템 경로가 윈도우는 /, 리눅스는 \ 로 쓰기 때문에 이렇게 사용하는 것
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  
  Product.findById(prodId, product=>{
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  });

};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    }); //app.set() 템플릿 셋팅하였기 때문에 파일명만 쓰면됨
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders',
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};

exports.getDetailProduct = (req, res, next) => {
  res.render('shop/product-detail');
};
