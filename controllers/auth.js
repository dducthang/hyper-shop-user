const Product = require('../models/product'); // nhớ pass categories cho tất cả các view !!!
const authService = require('../models/services/authService');

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
      user:req.user
    });
  }
  try {
    await authService.signup({ name, email, phone, password });
    res.redirect('/'); //đăng nhập thành công chuyển đến trang chủ
    //sửa code đăng nhập sau khi đăng kí sau
  } catch (e) {
    //catch loi trung email (dong 9 file authService)
    console.log(e);
    res.render('auth/signup', {
      errorCode: 2,
      categories: await Product.getCategoriesQuantity(),
      user:req.user
    }); //nếu catch đc bầy kỳ lỗi nào thì chuyển về đăng kí
  }
};

exports.getSignin = async (req, res, next) => {
  res.render('auth/signin', {
    categories: await Product.getCategoriesQuantity(),
    user: req.user
  });
};

// exports.postLogin = async (req, rex, next) =>{
//   await passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/",
//   })
//   console.log("reach this shit");
// }

