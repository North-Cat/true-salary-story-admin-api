const successHandler = require('service/successHandler');
const errorHandler = require('service/errorHandler');
const Admin = require('models/admins');
const Post = require('models/posts');
const admins = {
  async login(req, res) {},
  async logout(req, res) {},
  async getUnconfirmedPosts(req, res) {
    const posts = await Post.find({ status: 'pending' }).sort('createdAt');
    successHandler(res, posts);
  },
  async confirmPost(req, res, next) {
    const postId = req.body?.postId;
    const status = req.body?.status;
    const rejectReason = req.body?.rejectReason;
    if (!postId || !status) {
      return next(errorHandler(400, '欄位未填寫正確'));
    }
    if (status !== 'approved' || status !== 'rejected') {
      return next(errorHandler(400, '審核狀態只能是「已通過」或「已拒絕」'));
    }
    if (status === 'rejected' && !rejectReason) {
      return next(errorHandler(400, '未填寫拒絕原因'));
    }
    // TODO:
  }
};

module.exports = admins;
