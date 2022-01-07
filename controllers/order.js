const ProductService = require('../models/services/productService'); // nhớ pass categories cho tất cả các view
const OrderService = require('../models/services/orderService');
const CartService = require('../models/services/cartService');

exports.getOrder = async (req, res, next) => {
  const count = await OrderService.countOrders(req.user._id);
  const lastPage = Math.ceil(count / 3);
  const orders = await OrderService.getOrders(req.user, req.query.page);
  res.status(200).render('shop/order', {
    currentPage: req.query.page || 1,
    lastPage,
    user: req.user,
    orders,
    categories: await ProductService.getCategoriesQuantity(),
    brands: await ProductService.getBrands(),
  });
};

exports.postOrder = async (req, res, next) => {
  const userInfor = {
    name: req.body.name,
    address: req.body.address,
    telephone: req.body.telephone,
  };

  const cart = await CartService.getCartByUserId(req.user);
  if (cart.orderItems.length == 0) {
    res.status(304).send();
    return;
  }

  for (let item in cart.orderItems) {
    item.isOrdered = true;
  }

  const order = await OrderService.createOrder({
    user: req.user,
    orderItems: cart.orderItems,
    status: "Pending",
    address: req.body.address,
    phone: req.body.phone,
    orderDate: new Date()
  });

  cart.orderItems = [];
  cart.save();

  const orders = await OrderService.getOrders(req.user);
  console.log(orders);

  res.status(200).render('shop/order', {
    categories: await ProductService.getCategoriesQuantity(),
    brands: await ProductService.getBrands(),
    user: req.user,
    orders,
  });

  // res.redirect('/orders');
};
