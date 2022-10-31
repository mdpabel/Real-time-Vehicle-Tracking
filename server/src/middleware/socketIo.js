app.use(function (req, res, next) {
  res.io = io;
  next();
});
