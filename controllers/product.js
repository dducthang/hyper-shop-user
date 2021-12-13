const Product = require('../models/product'); // nhớ pass categories cho tất cả các view
const CommentService = require('../models/services/commentService');

exports.getProducts = (req, res, next) => {
  const page = +req.query.page || 1;
  let productsPerPage = +req.query.productsPerPage || 12;
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
  Object.keys(filters).forEach(
    key => filters[key] === null && delete filters[key]
  );

  const sortBy = req.query.sortBy || 'price';

  Product.countProducts(filters)
    .then(n => {
      productsCount = n;
      if (req.query.productsPerPage === 'all') {
        productsPerPage = n;
      }
      return Product.getProducts(filters)
        .collation({ locale: 'en' })
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
        categories: await Product.getCategoriesQuantity(),
        user: req.user,
      });
    });
};

exports.getProductDetail = async (req, res, next) => {
  const productId = req.params.productId;
  const product = await Product.getProduct(productId);
  const comments = await CommentService.getProductComments(productId);
  res.render('shop/productDetail', {
    product: product,
    pageTitle: 'Product detail',
    comments,
    categories: await Product.getCategoriesQuantity(),
    user: req.user,
  });
};
