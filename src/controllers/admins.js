const validator = require('validator');
const bcrypt = require('bcryptjs');
const Admin = require('models/admins');
const successHandler = require('service/successHandler');
const errorHandler = require('service/errorHandler');
const { isAuth, generateJWT } = require('service/auth');
const admins = {
  async login(req, res, next) {
    const { account } = req.body;
    let { password } = req.body;
    if (!account || !password) return next(errorHandler(400,"欄位未填寫正確"));
    if (!validator.isLength(password, { min: 8 })) {
      return next(errorHandler(400,"密碼不得低於 8 字元"));
    }
    password = await bcrypt.hash(password, 12);
    const data = await Admin.create({
      account,
      password,
    });
    generateJWT(data, res);
  },
  async logout(req, res) {},
};

module.exports = admins;
