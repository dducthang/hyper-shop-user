const Product = require('../product');
const { ObjectId } = require("mongodb");

exports.getProductById = async (productId) =>{
    const product = await Product.findOne({_id: ObjectId(productId)});
    return product;
}
