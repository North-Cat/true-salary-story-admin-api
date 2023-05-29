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
    const foundAdmin = await Admin.findOne({ account });
    if (foundAdmin) {
      return next(errorHandler(400, '此帳號已被註冊'));
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
    const newPostWithoutUnlockedUsers = await Post.findById(newPost.id).select(
      '-unlockedUsers',
    );
    successHandler(res, newPostWithoutUnlockedUsers);
  },
  async getUnconfirmedPosts(req, res) {
    const page = req.query?.page || 1;
    const limit = req.query?.limit || 10;
    const posts = await Post.find({ status: 'pending' })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort('createdAt');
    successHandler(res, posts);
  },
  async confirmPost(req, res, next) {
    const id = req.params?.id;
    const status = req.body?.status;
    const rejectReason = req.body?.rejectReason;
    if (!status) {
      return next(errorHandler(400, '欄位未填寫正確'));
    }
    if (status !== 'approved' && status !== 'rejected') {
      return next(errorHandler(400, '審核狀態只能是「已通過」或「已拒絕」'));
    }
    const data = {
      status,
      updateUser: req.user,
    };
    if (status === 'rejected') {
      if (!rejectReason) {
        return next(errorHandler(400, '未填寫拒絕原因'));
      }
      data.rejectReason = rejectReason;
    }
    const thePost = await Post.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (thePost) {
      successHandler(res, thePost);
    } else {
      return next(errorHandler(400, '查無此id, 更新失敗'));
    }
  },
  async getConfirmedPosts(req, res) {
    const page = req.query?.page || 1;
    const limit = req.query?.limit || 10;
    const posts = await Post.find({ status: { $ne: 'pending' } })
      .select(
        'title companyName taxId employmentType status rejectReason createdDate updateDate updateUser',
      )
      .populate({
        path: 'updateUser',
        select: 'account',
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort('createdAt');
    successHandler(res, posts);
  },
  async removePost(req, res, next) {
    const id = req.params?.id;
    const rejectReason = req.body?.rejectReason;
    if (!rejectReason) {
      return next(errorHandler(400, '欄位未填寫正確'));
    }
    const data = {
      rejectReason,
      updateUser: req.user,
      status: 'removed',
    };
    const thePost = await Post.findByIdAndUpdate(id, data, {
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
