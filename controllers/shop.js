const Product = require('../models/product');// nhớ pass categories cho tất cả các view

exports.getIndex = async (req, res, next) => {
  res.render('shop/index', {
    categories: await Product.getCategoriesQuantity(),
  });
};




