const getCategoriesQuantity = require('../util/getCategoriesQuantity')

exports.getOrder = async (req, res, next) => {
    res.render('shop/order', {
      categories: await getCategoriesQuantity(),
    });
  };