const Product = require('../models/product'); // nhớ pass categories cho tất cả các view !!!
const authService = require('../models/services/authService');

exports.getSignup = async (req, res, next) => {
  res.render('auth/signup', {
    categories: await Product.getCategoriesQuantity(),
  });
};

exports.signup = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body; //lấy các thông tin name, email,... từ request
  if (password !== confirmPassword) {
    res.render('auth/signup', {
      errorCode: 1,
      categories: await Product.getCategoriesQuantity(),
    });
  }
  try {
    await authService.signup({ name, email, password });
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
  res.render('auth/signup', {
    categories: await Product.getCategoriesQuantity(),
  });
};
