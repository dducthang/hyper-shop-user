const Product = require('../models/product');// nhớ pass categories cho tất cả các view

exports.getOrder = async (req, res, next) => {
    res.render('shop/order', {
      categories: await Product.getCategoriesQuantity(),
    });
  };