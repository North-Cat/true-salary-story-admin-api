const validator = require('validator');
const bcrypt = require('bcryptjs');
const Admin = require('models/admins');
const successHandler = require('service/successHandler');
const errorHandler = require('service/errorHandler');
const { generateJWT } = require('service/auth');
const admins = {
  async signUp(req, res, next) {
    const account = req.body?.account;
    let password = req.body?.password;
    if (!account || !password) {
      return next(errorHandler(400, '欄位未填寫正確'));
    }
    if (!validator.isLength(password, { min: 8 })) {
      return next(errorHandler(400, '密碼不得低於 8 字元'));
    }
    password = await bcrypt.hash(password, 12);
    const data = await Admin.create({
      account,
      password,
    });
    generateJWT(data, res);
  },
  async logIn(req, res, next) {
    const account = req.body?.account;
    let password = req.body?.password;
    if (!account || !password) {
      return next(errorHandler(400, '帳號或密碼不可為空'));
    }
    const data = await Admin.findOne({ account }).select('+password');
    if (!data) {
      return next(errorHandler(400, '帳號或密碼錯誤'));
    }
    const auth = await bcrypt.compare(password, data.password);
    if (!auth) {
      return next(errorHandler(400, '帳號或密碼錯誤'));
    }
    generateJWT(data, res);
  },
  async logOut(req, res) {
    successHandler(res, '已登出');
  },
};

module.exports = admins;
