const express = require('express');

const router = express.Router();
const productsApiController = require('../controllers/apiController/products');
const cartApiController = require('../controllers/apiController/cart');

router.get('/products', productsApiController.getProductsApi);
router.post('/cart', cartApiController.postCartApi);
router.post('/cart/change-quantity', cartApiController.changeItemQuantity);

module.exports = router;
