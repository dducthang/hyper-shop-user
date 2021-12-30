const ProductService = require("../models/services/productService"); // nhớ pass categories cho tất cả các view !!!
const authService = require("../models/services/authService");
const UserService = require("../models/services/userService"); // nhớ pass categories cho tất cả các view

const User = require("../models/user");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
);

exports.getSignup = async (req, res, next) => {
  res.status(200).render("auth/signup", {
    categories: await ProductService.getCategoriesQuantity(),
    brands: await ProductService.getBrands(),
    user: req.user,
  });
};

exports.signup = async (req, res, next) => {
  const { name, email, phone, password, confirmPassword } = req.body; //lấy các thông tin name, email,... từ requestz
  let user = { name, email, phone, password, confirmPassword };
  let errors = [];
  if (!name || !email || !phone || !password || !confirmPassword) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password.length == 0 || password != confirmPassword) {
    errors.push({ msg: "Passwords do not match" });
  }

  var phoneRegerx = /^([0][1-9]{9})$/;
  if (!phoneRegerx.test(phone)) {
    errors.push({ msg: "Phone number need to be 10-digit format" });
  }
  //check email format
  var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if (!emailRegex.test(email)) {
    errors.push({ msg: "Email is invalid" });
  }
  //Check existed email
  const existsUser = await authService.getUserLean({ email: email });
  if (existsUser) {
    errors.push({ msg: "Email already registered" });
  }
  if (errors.length > 0) {
    return res.status(400).render("auth/signup", {
      errors: errors,
      categories: await ProductService.getCategoriesQuantity(),
      brands: await ProductService.getBrands(),
      user: user,
    });
  } else if (errors.length == 0) {
    // tạo token verify qua mail
    crypto.randomBytes(32, async (err, buffer) => {
      user.verifyToken = buffer.toString("hex");
      // Thời gian tồn tại của token này +millisecond
      user.verifyTokenExpiration = Date.now() + 3600000;

      //do k biết đặt await cho cái create token này ra sao nên bỏ luôn tất cả vào trong
      try {
        //gửi email verify
        transporter.sendMail({
          to: user.email,
          from: process.env.SENDGRID_EMAIL,
          subject: "Hyper-shop email vefification",
          html: `
            <p>You sign up to hyper shop</p>
            <p><a href="${process.env.DOMAIN}/auth/verify/${user.verifyToken}">Click this</a> to verify your email</p>
            `,
        });

        //validation pass -> save to db
        console.log(user);
        await authService.signup(user);
        return res.status(200).render("auth/signup", {
          success_msg: "Sign up success, verify email to log in",
          categories: await ProductService.getCategoriesQuantity(),
          brands: await ProductService.getBrands(),
          user: req.user,
        });
      } catch (e) {
        //--------TODO-------
        //Lỗi trong lúc create trong mongodb, chưa handle
        console.log(e);
        res.status(400).render("auth/signup", {
          categories: await ProductService.getCategoriesQuantity(),
          brands: await ProductService.getBrands(),
          user: user,
        });
      }
    });
  }
};

exports.getSignin = async (req, res, next) => {
  console.log(req.user);
  res.render("auth/signin", {
    categories: await ProductService.getCategoriesQuantity(),
    brands: await ProductService.getBrands(),
    user: req.user,
  });
};
exports.getReset = async (req, res, next) => {
  res.render("auth/reset", {
    user: req.user,
    categories: await ProductService.getCategoriesQuantity(),
    brands: await ProductService.getBrands(),
  });
};
exports.postReset = async (req, res, next) => {
  const user = await authService.getUser({ email: req.body.email });
  if (!user) {
    return res.render("auth/reset", {
      errors: [{ msg: "This email is not registed yet!!!" }],
      user: req.user,
      categories: await ProductService.getCategoriesQuantity(),
      brands: await ProductService.getBrands(),
    });
  }
  crypto.randomBytes(32, async (err, buffer) => {
    if (err) {
      console.log(err);
      res.redirect("/auth/reset");
    }
    const token = buffer.toString("hex");
    user.resetToken = token;
    // Thời gian tồn tại của token này +millisecond
    user.resetTokenExpiration = Date.now() + 3600000;
    await authService.save(user);
  });
  try {
    res.render("auth/reset", {
      success_msg: "Check your email to reset password",
      user: req.user,
      categories: await ProductService.getCategoriesQuantity(),
      brands: await ProductService.getBrands(),
    });
    transporter.sendMail({
      to: user.email,
      from: process.env.SENDGRID_EMAIL,
      subject: "Hyper-shop reset password",
      html: `
      <p>You request a password reset</p>
      <p><a href="${process.env.DOMAIN}/auth/reset/${user.resetToken}">Click this</a> to reset your password</p>
      `,
    });
  } catch (e) {
    //TODO: render reset with error message
    console.log(e);
    res.redirect("/auth/reset");
  }
};

exports.getNewPassword = async (req, res, next) => {
  const user = await authService.getUserLean({
    resetToken: req.params.token,
    resetTokenExpiration: { $gt: Date.now() },
  });
  if (!user) {
    return res.render("auth/reset", {
      errors: [{ msg: "Reset token expired, request a new one" }],
      user: req.user,
      categories: await ProductService.getCategoriesQuantity(),
      brands: await ProductService.getBrands(),
    });
  }
  res.render("auth/newpassword", {
    user: req.user,
    categories: await ProductService.getCategoriesQuantity(),
    brands: await ProductService.getBrands(),
    userId: user._id,
    resetToken: req.params.token,
  });
};
exports.postNewPassword = async (req, res, next) => {
  const { password, userId, resetToken } = req.body;
  //TODO: match password

  //check valid token
  const user = await authService.getUser({
    resetToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId,
  });
  if (!user) {
    return res.render("auth/reset", {
      errors: [{ msg: "Reset token expired, request a new one" }],
      user: req.user,
      categories: await ProductService.getCategoriesQuantity(),
      brands: await ProductService.getBrands(),
    });
  }
  //if token is valid
  else {
    res.render("auth/signin", {
      success_msg: "Reset password successfully, login here",
      categories: await ProductService.getCategoriesQuantity(),
      brands: await ProductService.getBrands(),
      user: user,
    });
    //clear token and reset password
    user.resetTokenExpiration = undefined;
    user.resetToken = undefined;
    user.password = password;
    await authService.updatePassword(user);
  }
};

exports.emailVerify = async (req, res, next) => {
  const user = await authService.getUser({
    verifyToken: req.params.verifyToken,
    verifyTokenExpiration: { $gt: Date.now() },
  });
  if (!user) {
    res.render("auth/updatePassword", {
      errors: [{ msg: "Invalid verify token" }],
      categories: await ProductService.getCategoriesQuantity(),
      brands: await ProductService.getBrands(),
      user: req.user,
    });
  } else {
    user.isLock = false;
    user.verifyToken = undefined;
    user.verifyTokenExpiration = undefined;
    await UserService.saveUser(user);
    res.render("auth/updatePassword", {
      success_msg: "Account verify, you can login now",
      categories: await ProductService.getCategoriesQuantity(),
      brands: await ProductService.getBrands(),
      user: req.user,
    });
  }
};
