const cache = function (req, res, next) {
  res.setHeader("Last-Modified", new Date().toUTCString());
  next();
};

module.exports = cache;
