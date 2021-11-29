const Product = require('../models/product');// nhớ pass categories cho tất cả các view
const Cart = require('../models/cart');// nhớ pass categories cho tất cả các view
const OrderItem = require('../models/orderItem');// nhớ pass categories cho tất cả các view
const session = require('express-session');


exports.getCart = async (req, res, next) => {
  if(req.session.isLoggedIn){
    res.render('shop/cart', {
      categories: await Product.getCategoriesQuantity(),
      cart: await Cart.findOne({user:"6191cecfc28726bfbcab0e24"}).populate({
        path: 'orderItems',
        model: 'OrderItem',
        populate:{
          path: 'product',
          model: 'Product'
        }
      }),
      isLoggedIn: req.session.isLoggedIn
    });
  }
  else{
    res.render('shop/cart', {
      categories: await Product.getCategoriesQuantity(),
      cart: req.session.cart,
      isLoggedIn: req.session.isLoggedIn
    });
  }
};

exports.addToCart = async (req, res, next) => {
  console.log(req.body);
  if(req.session.isLoggedIn){

  }
  else{
    if(!req.session.cart){//nếu session chưa có cart thì tạo cart cùng với sản phẩm
      Product.getProduct(req.body.id).then(product=>{
        req.session.cart=[{
            product:product,
            quantity: 1,
        }]
        res.status(200).send('Add cart successfully');
      })
    }
    else{//nếu session đã có cart thì thêm sản phẩm vào cart
      let checkExisted = false;
      for(let i=0;i<req.session.cart.length;i++){
        console.log(req.session.cart[i].product._id)
        console.log(req.session.cart[i].product._id.toString())
        if(req.session.cart[i].product._id.toString()===req.body.id){
          req.session.cart[i].quantity+=1;
          res.status(200).send('Add cart successfully');
          checkExisted=true;
          break;
        }
      }
      if(!checkExisted){
        Product.getProduct(req.body.id).then(product=>{
          req.session.cart.push({
            product:product,
            quantity: 1
          });
          res.status(200).send('Add cart successfully');
        })
      }
    }
  }
};