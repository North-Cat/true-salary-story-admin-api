const validator = require('validator');
const bcrypt = require('bcryptjs');
const Admin = require('models/admins');
const Post = require('models/posts');
const { generateJWT } = require('service/auth');
const successHandler = require('service/successHandler');
const errorHandler = require('service/errorHandler');
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
  // TODO: for 測試用, 之後移除
  async createPost(req, res) {
    const newPost = await Post.create(req.body);
    successHandler(res, newPost);
  },
  async getUnconfirmedPosts(req, res) {
    const posts = await Post.find({ status: 'pending' }).sort('createdAt');
    successHandler(res, posts);
  },
  // TODO: 確認是否要寫入updateDate, updateUser...
  async confirmPost(req, res, next) {
    const postId = req.body?.postId;
    const status = req.body?.status;
    const rejectReason = req.body?.rejectReason;
    if (!postId || !status) {
      return next(errorHandler(400, '欄位未填寫正確'));
    }
    if (status !== 'approved' && status !== 'rejected') {
      return next(errorHandler(400, '審核狀態只能是「已通過」或「已拒絕」'));
    }
    const data = {
      postId,
      status,
      updateDate: new Date().toISOString(),
      updateUser: req.user,
    };
    if (status === 'rejected') {
      if (!rejectReason) {
        return next(errorHandler(400, '未填寫拒絕原因'));
      }
      data.rejectReason = rejectReason;
    }
    const thePost = await Post.findOneAndUpdate({ postId: data.postId }, data, {
      new: true,
    });
    if (thePost) {
      successHandler(res, thePost);
    } else {
      return next(errorHandler(400, '查無此id, 更新失敗'));
    }
  },
  async getConfirmedPosts(req, res) {
    const posts = await Post.find({ status: { $ne: 'pending' } })
      .select(
        'postId title companyName taxId type status rejectReason createdAt updateDate updateUser',
      )
      .populate({
        path: 'updateUser',
        select: 'account', // TODO: 確認還是要另外加name
      })
      .sort('createdAt');
    successHandler(res, posts);
  },
  async removePost(req, res, next) {
    const postId = req.body?.postId;
    const rejectReason = req.body?.rejectReason;
    if (!postId || !rejectReason) {
      return next(errorHandler(400, '欄位未填寫正確'));
    }
    const data = {
      postId,
      rejectReason,
      updateDate: new Date().toISOString(),
      updateUser: req.user,
      status: 'removed',
    };
    const thePost = await Post.findOneAndUpdate({ postId: data.postId }, data, {
      new: true,
    });
    if (thePost) {
      successHandler(res, thePost);
    } else {
      return next(errorHandler(400, '查無此id, 更新失敗'));
    }
  },
};

module.exports = admins;
