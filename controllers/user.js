const Product = require('../models/product'); // nhớ pass categories cho tất cả các view

exports.getProfile = async (req, res, next) => {
  res.render('shop/profile', {
    categories: await Product.getCategoriesQuantity(),
    name: req.user.name,
  });
};
