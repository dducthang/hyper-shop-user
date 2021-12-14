const Order = require('../order');
const OrderItem = require('../orderItem');

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
