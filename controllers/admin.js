const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  // console.log('In another Middleware!');
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html')); // 현재경로에서 ../ 뒤로가서 views 폴더의 add-product.html을 보내줌
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product({
    id: prodId,
    title: updatedTitle,
    description: updatedDescription,
    price: updatedPrice,
    imageUrl: updatedImageUrl,
  });
  updatedProduct.save();
  res.redirect('/admin/products');
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({ title, imageUrl, price, description });
  product
    .save()
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Product',
      path: '/admin/products',
    }); //app.set() 템플릿 셋팅하였기 때문에 파일명만 쓰면됨
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect('/admin/products');
};
