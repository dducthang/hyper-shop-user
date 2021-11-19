const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
  res.render('shop/index');
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
