const Product = require('../models/product'); // nhớ pass categories cho tất cả các view !!!
const authService = require('../models/services/authService');
const passport = require('passport');

exports.getSignup = async (req, res, next) => {
  res.render('auth/signup', {
    categories: await Product.getCategoriesQuantity(),
    user: req.user
  });
};

exports.signup = async (req, res, next) => {
  const { name, email, phone, password, confirmPassword } = req.body; //lấy các thông tin name, email,... từ request
  if (password !== confirmPassword) {
    res.render('auth/signup', {
      errorCode: 1,
      categories: await Product.getCategoriesQuantity(),
    });
  }
  try {
    await authService.signup({ name, email, phone, password });
    res.redirect('/'); //đăng nhập thành công chuyển đến trang chủ
    //sửa code đăng nhập sau khi đăng kí sau
  } catch (e) {
    //catch loi trung email (dong 9 file authService)
    res.render('auth/signup', {
      errorCode: 2,
      categories: await Product.getCategoriesQuantity(),
    }); //nếu catch đc bầy kỳ lỗi nào thì chuyển về đăng kí
  }
};

exports.getSignin = async (req, res, next) => {
  res.render('auth/signin', {
    categories: await Product.getCategoriesQuantity(),
    user: req.user
  });
};

exports.postLogin = (req, rex, next) =>{
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
}

