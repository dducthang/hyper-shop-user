const Response = require('../response');

//input: các comment của 1 sản phẩm
//output: các response (của shop) cho từng comment
exports.getResponses = async comments => {
  const responses = [];
  comments.forEach(async comment => {
    const commentRes = await Response.find({ comment: comment._id });
    responses.push({ comment: comment._id, commentRes });
    console.log(responses);
  });

  return responses;
};
