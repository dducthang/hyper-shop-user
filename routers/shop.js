const express = require('express');

const router = express.Router();
const shopController = require('../controllers/shop');


router.get('/', shopController.getIndex);

router.get('/cart', shopController.getCart);
router.get('/checkout', shopController.getCheckout);
router.get('/order', shopController.getOrder);
router.get('/signup', shopController.getSignup);
router.get('/profile', shopController.getProfile);

module.exports = router;
