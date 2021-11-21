const getCategoriesQuantity = require('../util/getCategoriesQuantity');

exports.getSignup = async (req, res, next) => {
    res.render('auth/signup', {
      categories: await getCategoriesQuantity(),
    });
  };