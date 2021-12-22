const ProductService = require('../models/services/productService'); // nhớ pass categories cho tất cả các view

exports.getProfile = async (req, res, next) => {
  res.status(200).render('shop/profile', {
    categories: await ProductService.getCategoriesQuantity(),
    brands: await ProductService.getBrands(),
    profile: req.user,
    user: true,
  });
};
