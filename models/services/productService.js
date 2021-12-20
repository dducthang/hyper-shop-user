const Product = require('../product');
const { ObjectId } = require("mongodb");

exports.getProductById = async (productId) =>{
    const product = await Product.findOne({_id: ObjectId(productId)});
    return product;
}
exports.countProducts = (filters) => {
    return Product.find(filters).countDocuments();
  }
  
  exports.getProducts = (filters) => {
    return Product.find(filters);
  }
  exports.getProduct = (id) => {
    return Product.findById(id);
  }
     exports.getCategoriesQuantity = async () => {
    let catsQty = [];
    let cats = [];
    let sum = 0;
    cats = await Product.distinct('category');
    for (c of cats) {
      const quantity = await Product.count({ category: c });
      sum += quantity;
      catsQty.push({
        name: c,
        quantity,
      });
    }
    return { catsQty, sum };
  }