const Product = require('../product');
const { ObjectId } = require('mongodb');

exports.getTopProducts = number => {
  return Product.find().sort({ _id: 1 }).limit(number);
};

exports.getProductById = productId => {
  return Product.findOne({ _id: ObjectId(productId) });
};
exports.countProducts = filters => {
  return Product.find(filters).countDocuments();
};

exports.getProducts = filters => {
  return Product.find(filters);
};
exports.getProduct = id => {
  return Product.findById(id);
};
exports.getCategoriesQuantity = async () => {
  const catsQty = await Product.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);
  const sum = await Product.countDocuments();

  //output [{name,quantity}],sum
  return { catsQty, sum };
};

exports.getBrands = () => {
  return Product.aggregate([
    {
      $group: {
        _id: '$brand',
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);
};

exports.getClosureTypes = () => {
  return Product.aggregate([
    {
      $group: {
        _id: '$closureType',
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);
};
exports.getShoesHeights = () => {
  return Product.aggregate([
    {
      $group: {
        _id: '$shoesHeight',
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);
};
exports.getMaterials = () => {
  return Product.aggregate([
    {
      $group: {
        _id: '$material',
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);
};

exports.getRelatedProducts = filter => {
  return Product.find(filter).limit(3);
};
