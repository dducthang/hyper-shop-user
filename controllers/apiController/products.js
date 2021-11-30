const Product = require('../../models/product');

exports.getProductsApi = (req, res, next) => {
  const page = +req.query.page || 1;
  let productsPerPage = +req.query.productsPerPage || 12;
  let productsCount;
  const name = req.query.name
    ? { $regex: `.*${req.query.name}.*`, $options: 'i' }
    : null;

  let category = req.query.category;
  if (category === 'all categories') {
    category = null; //remove
  }

  const filters = {
    name,
    category,
    brand: req.query.brand,
    color: req.query.color,
    sex: req.query.sex,
    shoesHeight: req.query.shoesHeight,
    closureType: req.query.closureType,
    material: req.query.material,
  };
  Object.keys(filters).forEach(
    key => filters[key] === undefined && delete filters[key]
  ); // remove các filter null or undefined
  Object.keys(filters).forEach(
    key => filters[key] === null && delete filters[key]
  ); // remove các filter null or undefined
  const sortBy = req.query.sortBy || 'price';
  Product.countProducts(filters)
    .then(n => {
      productsCount = n;
      if (req.query.productsPerPage === 'All') {
        productsPerPage = n;
      }
      return Product.getProducts(filters)
        .collation({ locale: 'en' })
        .sort(sortBy)
        .skip((page - 1) * productsPerPage)
        .limit(productsPerPage);
    })
    .then(products => {
      res.status(200).send({
        products,
        productsPerPage,
        queriedProductCount: products.length,
        productsCount,
        currentPage: page,
        lastPage: Math.ceil(productsCount / productsPerPage),
      });
    });
};
