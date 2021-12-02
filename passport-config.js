const LocalStrategy = require('passport-local'); //một trong những stragegy của passport, local là auth dùng username(mình sẽ đổi thành email) password
const bcrypt = require('bcrypt');

const authService = require('./models/services/authService');
const userService = require('./models/services/userService');

//cách t làm là theo tutorial 30p gửi tối thứ 4
function initialize(passport) {
  const isValidPassword = async (user, password) => {
    return await bcrypt.compare(password, user.password);
  };
  const authenticateUser = async (email, password, done) => {
    try {
      const user = await userService.getUser({ email }); //cần sửa thành lean để tăng hiệu năng
      if (!user) {
        return done(null, false, { message: 'Email not exsists' });
      }
      const matchPassword = await isValidPassword(user, password);
      if (!matchPassword) {
        return done(null, false, { message: 'Wrong password' });
      }
      return done(null, user);
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser((id, done) =>
    done(null, userService.getUser({ id }))
  );
}

module.exports = initialize;
