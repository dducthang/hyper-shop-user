const CommentService = require('../../models/services/commentService');

exports.postComment = (req, res, next) => {
  const comment = {
    product: req.params.productId,
    user: req.user._id,
    body: req.body.comment,
  };
  CommentService.addComment(comment)
    .then(c => {
      res.status(201).send(c);
    })
    .catch(e => {
      res.status(400).send(e);
    });
};
