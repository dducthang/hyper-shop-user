const getCategoriesQuantity = require('../util/getCategoriesQuantity')

exports.getCart = async (req, res, next) => {
    res.render('shop/cart', {
      categories: await getCategoriesQuantity(),
    });
  };