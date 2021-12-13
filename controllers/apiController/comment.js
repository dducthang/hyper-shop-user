const CommentService = require('../../models/services/commentService');

exports.postComment = (req, res, next) => {
  const commentsPerPage = 10;
  const comment = {
    product: req.params.productId,
    user: req.user._id,
    body: req.body.comment,
  };
  CommentService.addComment(comment)
    .then(async c => {
      const comments = await CommentService.getProductComments(
        req.params.productId
      );
      const count = await CommentService.countComments(req.params.productId);
      res
        .status(201)
        .send({
          comments,
          commentsLastPage: Math.ceil(count / commentsPerPage),
        });
    })
    .catch(e => {
      res.status(400).send(e);
    });
};

exports.getComments = (req, res, next) => {
  res
    .status(200)
    .send(CommentService.getProductComments(req.params.productId, req.page));
};
