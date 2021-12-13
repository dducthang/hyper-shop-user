//từ nay mọi thao tác đến db mình sẽ làm trong folder Service, code cũ sẽ refactor sau
const Comment = require('../comment');
const User = require('../user');

exports.getProductComments = productId => {
  return Comment.find({ product: productId }).populate({
    path: 'user',
    model: User,
  });
};

exports.addComment = comment => {
  return Comment.create(comment);
};
