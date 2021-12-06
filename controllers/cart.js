const Product = require('../models/product'); // nhớ pass categories cho tất cả các view

exports.getCart = async (req, res, next) => {
  res.render('shop/cart', {
    categories: await Product.getCategoriesQuantity(),
    user: req.user
  });
};
