const bcrypt = require('bcrypt'); //để băm pass
//từ nay mọi thao tác đến db mình sẽ làm trong folder Service, code cũ sẽ refactor sau
const User = require('../user');

exports.signup = async newUser => {
  //kiem tra email da ton tai?
  const user = await User.findOne({ email: newUser.email });
  if (user) {
    throw new Error('Email already registered');
  }
  //them nguoi dung
  const saltRounds = 10; //tham số để truyền vào hàm hash, 10 rất thông dụng
  const hashedPassword = await bcrypt.hash(newUser.password, saltRounds); //hash password được gửi đến server từ form
  newUser.password = hashedPassword;
  return User.create(newUser);//luu vao db
};
