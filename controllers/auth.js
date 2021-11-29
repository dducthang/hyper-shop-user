const Product = require('../models/product');// nhớ pass categories cho tất cả các view

exports.getSignup = async (req, res, next) => {
  console.log(req.session.isLoggedIn);
  res.render('auth/signup', {
    categories: await Product.getCategoriesQuantity(),
  });
};

exports.postLogin = async (req, res, next) => {
  req.session.isLoggedIn = true;
  res.redirect('/');
};

exports.postLogout = async (req, res, next) => {
  req.session.destroy(error=>{
    res.redirect('/');
  })
};