const Product = require('../product');
const { ObjectId } = require('mongodb');

exports.getTopProducts = async number => {
  const products = await Product.find().sort({_id: 1}).limit(number);
  return products;
};

exports.getProductById = async productId => {
  const product = await Product.findOne({ _id: ObjectId(productId) });
  return product;
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
    { $limit: 5 },
  ]);
  const sum = await Product.countDocuments();

  //output [{name,quantity}],sum
  return { catsQty, sum };
};

exports.getBrands = async () => {
  return await Product.aggregate([
    {
      $group: {
        _id: '$brand',
      },
    },
    { $limit: 5 },
  ]);
};

exports.getClosureTypes = async () => {
  return await Product.aggregate([
    {
      $group: {
        _id: '$closureType',
        count: { $sum: 1 },
      },
    },
    { $limit: 5 },
  ]);
};
exports.getShoesHeights = async () => {
  return await Product.aggregate([
    {
      $group: {
        _id: '$shoesHeight',
        count: { $sum: 1 },
      },
    },
    { $limit: 5 },
  ]);
};
exports.getMaterials = async () => {
  return await Product.aggregate([
    {
      $group: {
        _id: '$material',
        count: { $sum: 1 },
      },
    },
    { $limit: 5 },
  ]);
};
