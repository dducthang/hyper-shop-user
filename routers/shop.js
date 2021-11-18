const express = require('express');

const router = express.Router();
const shopController = require('../controllers/shop');


router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProductDetail);
router.get('/cart', shopController.getCart);
router.get('/checkout', shopController.getCheckout);
router.get('/order', shopController.getOrder);
router.get('/signup', shopController.getSignup);
router.get('/profile', shopController.getProfile);
router.get('/api/products', shopController.getProductsApi);
module.exports = router;
