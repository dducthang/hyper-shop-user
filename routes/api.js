const express = require('express');

const router = express.Router();
const productsApiController = require('../controllers/apiController/products');
const cartApiController = require('../controllers/apiController/cart');

router.get('/products', productsApiController.getProductsApi);
router.post('/cart', cartApiController.postCart);

module.exports = router;
