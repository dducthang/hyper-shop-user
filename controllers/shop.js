const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
  res.render('shop/index');
};

async function getCategoriesQuantity() {
  let res = [];
  let cats = [];
  cats = await Product.distinct('category');
  for (c of cats) {
    const quantity = await Product.count({ category: c });
    res.push({
      name: c,
      quantity,
    });
  }
  return res;
}

exports.getProducts = (req, res, next) => {
  const page = +req.query.page || 1;
  let productsPerPage = +req.query.productsPerPage || 3;
  let productsCount;

  const sortBy = req.query.sortBy || 'createdDate';

  Product.find()
    .countDocuments()
    .then(n => {
      productsCount = n;
      if (req.query.productsPerPage === 'all') {
        productsPerPage = n;
      }
      return Product.find()
        .sort(sortBy)
        .skip((page - 1) * productsPerPage)
        .limit(productsPerPage);
    })
    .then(async function (products) {
      console.log(await getCategoriesQuantity());
      res.render('shop/products', {
        products,
        productsPerPage,
        productsCount,
        currentPage: page,
        lastPage: Math.ceil(productsCount / productsPerPage),
        categories: await getCategoriesQuantity(),
      });
    });
};

exports.getProductsApi = (req, res, next) => {
  const page = +req.query.page || 1;
  let productsPerPage = +req.query.productsPerPage || 3;
  let productsCount;
  const sortBy = req.query.sortBy || 'createdDate';

  Product.find()
    .countDocuments()
    .then(n => {
      productsCount = n;
      if (req.query.productsPerPage === 'all') {
        productsPerPage = n;
      }
      return Product.find()
        .sort(sortBy)
        .skip((page - 1) * productsPerPage)
        .limit(productsPerPage);
    })
    .then(products => {
      res.status(200).send({
        products,
        productsPerPage,
        productsCount,
        currentPage: page,
        lastPage: Math.ceil(productsCount / productsPerPage),
      });
    });
};

exports.getProductDetail = (req, res, next) => {
  res.render('shop/productDetail');
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
