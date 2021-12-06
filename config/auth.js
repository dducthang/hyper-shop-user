exports.checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/signin");
};

exports.checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return res.redirect("/");
  next();
};
