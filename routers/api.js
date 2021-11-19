const express = require('express');

const router = express.Router();
const apiController = require('../controllers/api');

router.get('/api/products', apiController.getProductsApi);

module.exports = router;
