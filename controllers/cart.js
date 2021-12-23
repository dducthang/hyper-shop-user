const Product = require('../models/product'); // nhớ pass categories cho tất cả các view
const cartService = require("../models/services/cartService");
const productService = require("../models/services/productService");
const {ObjectId} = require("mongodb");

exports.getCart = async (req, res, next) => {
  let userCart = null;
  //nếu người dùng đã đăng nhập
  if(req.user){
    if(req.session.cart){//nếu đã tạo cart ảo trong session trước đó rồi)
      const products =[];
      for(let product of req.session.cart){
        products.push(product);
      }
      console.log(products);
      userCart = await cartService.addProductToCart(req.user, products); //cập nhật hàng trong cart ảo vào trong cart trong db
      req.session.cart=null;
    }
    else{
      userCart = await cartService.getCartByUserId(req.user);//nếu chưa có cart ảo thì tìm cart thật
    }
    res.render('shop/cart',{
      categories: await Product.getCategoriesQuantity(),
      user: req.user,
      cart: userCart
    });
  }
  else{
    res.render('shop/cart', {
      categories: await Product.getCategoriesQuantity(),
      user:req.user,
      cart: req.session.cart
    });
    console.log(req.user);
  }
};

exports.addToCart = async (req, res, next) => {
  //console.log(req.body);
  if(req.user){
    let cart = await cartService.getCartByUserId(req.user);
    if(!cart){
      cart = await cartService.createNewCart(req.user);
    }
    const product = await Product.getProduct(req.body.id);
    await cartService.addSingleProductToCart(product, cart);
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

exports.getCheckout = async (req, res, next) =>{
  console.log(req.user);
  res.render('shop/checkout',{
    categories: await Product.getCategoriesQuantity(),
    user: req.user,
  });
}
