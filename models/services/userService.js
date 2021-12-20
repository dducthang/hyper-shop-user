//từ nay mọi thao tác đến db mình sẽ làm trong folder Service, code cũ sẽ refactor sau
const User = require('../user');

exports.newUser = user => {
  return new User(user);
};

exports.saveUser = user => {
 user.save();
};

exports.getUser = filter => {
  return User.findOne(filter);
};
