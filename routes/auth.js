const express = require('express');
const passport = require('passport');

const router = express.Router();
const authController = require('../controllers/auth');

router.get('/signup', authController.getSignup);
router.post('/signup', authController.signup);
router.get('/signin', authController.getSignin);


router.post(
  '/signin',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/signin',
  })
);


module.exports = router;
