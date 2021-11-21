const getCategoriesQuantity = require('../util/getCategoriesQuantity');

exports.getProfile = async (req, res, next) => {
  res.render('shop/profile', {
    categories: await getCategoriesQuantity(),
  });
};
