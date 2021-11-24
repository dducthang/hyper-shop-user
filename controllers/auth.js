const Product = require('../models/product');// nhớ pass categories cho tất cả các view

exports.getSignup = async (req, res, next) => {
    res.render('auth/signup', {
      categories: await Product.getCategoriesQuantity(),
    });
  };