const express = require('express');

const router = express.Router();
const productsApiController = require('../controllers/apiController/products');

router.get('/products', productsApiController.getProductsApi);

module.exports = router;
