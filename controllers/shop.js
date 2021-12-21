const Product = require('../models/product');// nhớ pass categories cho tất cả các view
const ProductService = require('../models/services/productService');// nhớ pass categories cho tất cả các view

exports.getIndex = async (req, res, next) => {
  res.status(200).render('shop/index', {
    categories: await ProductService.getCategoriesQuantity(),
    user: req.user
  });
  req.session.cart={};
};




