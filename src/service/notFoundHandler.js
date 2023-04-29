const notFoundHandler = (req, res) => {
  res.status(404).json({
    status: false,
    message: '該路由不存在',
  });
};

module.exports = notFoundHandler;
