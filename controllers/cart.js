const Product = require('../models/product');// nhớ pass categories cho tất cả các view
const Cart = require('../models/cart');// nhớ pass categories cho tất cả các view
const OrderItem = require('../models/orderItem');// nhớ pass categories cho tất cả các view

// exports.getCart = async (req, res, next) => {
//   res.render('shop/cart', {
//     categories: await Product.getCategoriesQuantity()
//   });
// };

exports.getCart = async (req, res, next) => {
  res.render('shop/cart', {
    categories: await Product.getCategoriesQuantity(),
    cart: await Cart.findOne({user:"6191cecfc28726bfbcab0e24"}).populate({
      path: 'orderItems',
      model: 'OrderItem',
      populate:{
        path: 'product',
        model: 'Product'
      }
    })
  });
};