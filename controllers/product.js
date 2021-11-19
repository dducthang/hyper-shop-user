const Product = require('../models/product');

async function getCategoriesQuantity() {
  let res = [];
  let cats = [];
  cats = await Product.distinct('category');
  for (c of cats) {
    const quantity = await Product.count({ category: c });
    res.push({
      name: c,
      quantity,
    });
  }
  return res;
}

exports.getProducts = (req, res, next) => {
  const page = +req.query.page || 1;
  let productsPerPage = +req.query.productsPerPage || 3;
  let productsCount;
  const filters = {
    category: req.query.category,
    brand: req.query.brand,
    color: req.query.color,
    sex: req.query.sex,
    shoesHeight: req.query.shoesHeight,
    closureType: req.query.closureType,
    material: req.query.material,
  };
  Object.keys(filters).forEach(
    key => filters[key] === undefined && delete filters[key]
  );

  const sortBy = req.query.sortBy || 'createdDate';

  Product.find()
    .count(filters)
    .then(n => {
      productsCount = n;
      if (req.query.productsPerPage === 'all') {
        productsPerPage = n;
      }
      return Product.find(filters)
        .sort(sortBy)
        .skip((page - 1) * productsPerPage)
        .limit(productsPerPage);
    })
    .then(async function (products) {
      res.render('shop/products', {
        pageTitle: 'Products',
        products,
        productsPerPage,
        productsCount,
        currentPage: page,
        lastPage: Math.ceil(productsCount / productsPerPage),
        categories: await getCategoriesQuantity(),
      });
    });
};

exports.getProductDetail = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId).then(async function (product) {
    res.render('shop/productDetail', {
      product: product,
      pageTitle: 'Product detail',
      categories: await getCategoriesQuantity(),
    });
  });
};
