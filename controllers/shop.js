const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  // console.log('In another Middleware!');
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html')); // 현재경로에서 ../ 뒤로가서 views 폴더의 add-product.html을 보내줌
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productSS: true,
    }); //app.set() 템플릿 셋팅하였기 때문에 파일명만 쓰면됨
  });
  // console.log('In the Middleware!');
  //   console.log(adminData.products);
  //   res.sendFile(path.join(rootDir, 'views', 'shop.html')); // join 을 쓰는 이유는 윈도우와 리눅스 시스템에서 시스템 경로가 윈도우는 /, 리눅스는 \ 로 쓰기 때문에 이렇게 사용하는 것
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart');
};

exports.getDetailProduct = (req, res, next) => {
  res.render('shop/product-detail');
};
