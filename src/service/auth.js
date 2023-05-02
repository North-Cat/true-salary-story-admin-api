const jwt = require('jsonwebtoken');
const Admin = require('models/admins');
const config = require('config');
const successHandler = require('service/successHandler');
const errorHandler = require('service/errorHandler');
const asyncErrorHandler = require('service/asyncErrorHandler');

const isAuth = asyncErrorHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(errorHandler(401, '尚未登入'));
  }
  const decoded = await new Promise((resolve, reject) => {
    jwt.verify(token, config.jwt.secret, (err, payload) => {
      if (err) {
        reject(err);
      } else {
        resolve(payload);
      }
    });
  });
  const currentUser = await Admin.findById(decoded.id);
  req.user = currentUser;
  next();
});

const generateJWT = (user, res) => {
  const token = jwt.sign({ id: user._id }, config.jwt.secret, {
    expiresIn: config.jwt.expires,
  });
  successHandler(res, {
    token,
    account: user.account,
  });
};

module.exports = {
  isAuth,
  generateJWT,
};
