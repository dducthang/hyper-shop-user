const mongoose = require('mongoose');

const orderItemsSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  totalPrice: Number,
  isOrdered: Boolean, // false: trong gio hang; true: trong don hang -> khong bi nham lan neu sau nay tinh doanh thu
});

const OrderItems = mongoose.model('OrderItems', orderItemsSchema);

module.exports = OrderItems;
