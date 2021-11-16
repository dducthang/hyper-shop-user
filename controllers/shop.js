const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
  res.render('shop/index');
};

exports.getProducts = (req, res, next) => {
  const page = +req.query.page || 1;
  let productsPerPage = +req.query.productsPerPage || 3;
  let productsCount;

  Product.find()
    .countDocuments()
    .then(n => {
      productsCount = n;
      if (req.query.productsPerPage === 'all') {
        productsPerPage = n;
      }
      return Product.find()
        .skip((page - 1) * productsPerPage)
        .limit(productsPerPage);
    })
    .then(products => {
      res.render('shop/products', {
        products,
        productsPerPage,
        productsCount,
        currentPage: page,
        lastPage: Math.ceil(productsCount / productsPerPage),
      });
    });
};

exports.getProductDetail = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId).then(product=>{
    res.render('shop/productDetail',{
      product:product,
      pageTitle: 'Product detail'
    })
  })
};

exports.getOrder = (req, res, next) => {
  res.render('shop/order');
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup');
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart');
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout');
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup');
};

exports.getProfile = (req, res, next) => {
  res.render('shop/profile');
};
