const ProductService = require('../models/services/productService'); // nhớ pass categories cho tất cả các view
const OrderService = require('../models/services/orderService');
const CartService = require('../models/services/cartService');

exports.getOrder = async (req, res, next) => {
  const orders = await OrderService.getOrders(req.user);
  console.log(orders);
  res.status(200).render('shop/order', {
    categories: await ProductService.getCategoriesQuantity(),
    brands: await ProductService.getBrands(),
    user: req.user,
    orders
  });
};

exports.postOrder = async (req, res, next) =>{
  const userInfor = {
    name: req.body.name,
    address: req.body.address,
    telephone: req.body.telephone
  }

  let options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  let today  = new Date();
  today = today.toLocaleString("en-US", options);
  
  const cart = await CartService.getCartByUserId(req.user);
  for(let item in cart.orderItems){
    item.isOrdered = true;
  }
  cart.save();

  const order = await OrderService.createOrder({
    user: req.user,
    orderItems: cart.orderItems,
    status: "Pending",
    orderDate: today
  });

  const orders = await OrderService.getOrders(req.user);
  console.log(orders);

  res.status(200).render('shop/order', {
    categories: await ProductService.getCategoriesQuantity(),
    brands: await ProductService.getBrands(),
    user: req.user,
    orders
  });
  
}