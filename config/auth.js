exports.checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/signin');
};

exports.checkAuthenticatedForApi = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).send();
};

exports.checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return res.redirect('/');
  next();
};
