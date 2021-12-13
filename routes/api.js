const express = require('express');
const { checkAuthenticatedForApi } = require('../config/auth');

const router = express.Router();
const productsApiController = require('../controllers/apiController/products');
const commentsApiController = require('../controllers/apiController/comment');

router.get('/products', productsApiController.getProductsApi);

router.post(
  '/comments/:productId',
  checkAuthenticatedForApi,
  commentsApiController.postComment
);

module.exports = router;
