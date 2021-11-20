const getCategoriesQuantity = require('../util/util').getCategoriesQuantity;

exports.getIndex = async (req, res, next) => {
  res.render('shop/index', {
    categories: await getCategoriesQuantity(),
  });
};

exports.getOrder = async (req, res, next) => {
  res.render('shop/order', {
    categories: await getCategoriesQuantity(),
  });
};

exports.getSignup = async (req, res, next) => {
  res.render('auth/signup', {
    categories: await getCategoriesQuantity(),
  });
};

exports.getCart = async (req, res, next) => {
  res.render('shop/cart', {
    categories: await getCategoriesQuantity(),
  });
};

exports.getCheckout = async (req, res, next) => {
  res.render('shop/checkout', {
    categories: await getCategoriesQuantity(),
  });
};

exports.getSignup = async (req, res, next) => {
  res.render('auth/signup', {
    categories: await getCategoriesQuantity(),
  });
};

exports.getProfile = async (req, res, next) => {
  res.render('shop/profile', {
    categories: await getCategoriesQuantity(),
  });
};
