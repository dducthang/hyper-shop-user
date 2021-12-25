const Order = require('../order');
const OrderItem = require('../orderItem');
// const Order = require('../order');

//input: user id, product id
//work with order, order item
//output: true false
exports.isBoughtProduct = async (userId, productId) => {
  let res = 0;
  const data = await Order.find({ user: userId })
    .populate('user')
    .populate('orderItems');
  data.forEach(order => {
    order.orderItems.forEach(item => {
      if (item.product == productId) {
        res++;
      }
    });
  });
  return res > 0 ? true : false;
};


exports.createOrder = async (properties) =>{
  const newOrder = await Order.create(properties);
  return newOrder;
}

exports.getOrders = async (userId) =>{
  const orders = await Order.find({user: userId}).populate({
    path: "orderItems",
    model: "OrderItem",
    populate: {
      path: "product",
      model: "Product",
    },
  });
  return orders;
}