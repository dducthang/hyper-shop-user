const Product = require('../../models/product');

exports.getProductsApi = (req, res, next) => {
  const page = +req.query.page || 1;
  let productsPerPage = +req.query.productsPerPage || 3;
  let productsCount;
  const filters = {
    category: req.query.category,
    // brand: req.query.brand,
    // color: req.query.color,
    // sex: req.query.sex,
    // shoesHeight: req.query.shoesHeight,
    // closureType: req.query.closureType,
    // material: req.query.material,
  };
  Object.keys(filters).forEach(
    key => filters[key] === undefined && delete filters[key]
  );

  const sortBy = req.query.sortBy || 'createdDate';

  Product
    .countProducts(filters)
    .then(n => {
      productsCount = n;
      if (req.query.productsPerPage === 'All') {
        productsPerPage = n;
      }
      return Product
        .getProducts(filters)
        .sort(sortBy)
        .skip((page - 1) * productsPerPage)
        .limit(productsPerPage);
    })
    .then(products => {
      res.status(200).send({
        products,
        productsPerPage,
        productsCount,
        currentPage: page,
        lastPage: Math.ceil(productsCount / productsPerPage),
      });
    });
};
