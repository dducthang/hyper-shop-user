const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth');

router.get('/signup', authController.getSignup);
router.get('/signin', authController.getSignin);

module.exports = router;
