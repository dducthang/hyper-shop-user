const ProductService = require('../models/services/productService');// nhớ pass categories cho tất cả các view

exports.getOrder = async (req, res, next) => {
    res.render('shop/order', {
      categories: await ProductService.getCategoriesQuantity(),
      user: req.user
    });
  };