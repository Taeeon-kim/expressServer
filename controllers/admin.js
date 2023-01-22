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
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product({title, imageUrl, price, description});
    product.save();
    res.redirect('/');
  };

  exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Product',
        path: '/admin/products',
      }); //app.set() 템플릿 셋팅하였기 때문에 파일명만 쓰면됨
    });
  }