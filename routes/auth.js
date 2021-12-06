const express = require("express");
const passport = require("passport");

const router = express.Router();
const authController = require("../controllers/auth");
const { checkAuthenticated, checkNotAuthenticated } = require("../config/auth");

router.get("/signup", checkNotAuthenticated, authController.getSignup);
router.post("/signup", checkNotAuthenticated, authController.signup);
router.get("/signin", checkNotAuthenticated, authController.getSignin);

router.post(
  "/signin",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/signin",
  })
);

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/auth/signin");
});

module.exports = router;
