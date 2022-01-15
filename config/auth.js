exports.checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  req.session.returnTo = req.originalUrl;
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

//lưu lại url để khi người dùng đăng nhập, chuyển lại về trang cũ
exports.getUrl = (req, res, next) => {
  const url = req.originalUrl.replace('/api', ''); //nếu người dùng tìm kiếm lọc sản phẩm bằng ajax, cần remove api đi
  if (url != '/login') req.session.returnTo = url;
  next();
};
