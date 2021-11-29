const express = require('express');

const router = express.Router();
const productController = require('../controllers/product');

router.get('/', productController.getProducts);
router.get('/:productId', productController.getProductDetail);


module.exports = router;