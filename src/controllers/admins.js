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
};

module.exports = admins;
