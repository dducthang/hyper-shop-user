//từ nay mọi thao tác đến db mình sẽ làm trong folder Service, code cũ sẽ refactor sau
const User = require('../user');

exports.newUser = user => {
  return new User(user);
};

exports.saveUser = async user => {
  await user.save();
};

exports.getUser = async filter => {
  return await User.findOne(filter);
};
