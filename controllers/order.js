const ProductService = require('../models/services/productService'); // nhớ pass categories cho tất cả các view

exports.getOrder = async (req, res, next) => {
  res.status(200).render('shop/order', {
    categories: await ProductService.getCategoriesQuantity(),
    brands: await ProductService.getBrands(),
    user: req.user,
  });
};
