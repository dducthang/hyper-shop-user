const getCategoriesQuantity = require('../util/getCategoriesQuantity')

exports.getIndex = async (req, res, next) => {
  res.render('shop/index', {
    categories: await getCategoriesQuantity(),
  });
};




