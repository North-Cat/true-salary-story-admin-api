const express = require('express');
const router = express.Router();
const asyncErrorHandler = require('service/asyncErrorHandler');
const {
  login,
  logout,
  getUnconfirmedPosts,
  confirmPost,
  getConfirmedPosts,
  createPost,
  removePost,
} = require('controllers/admins');
const { isAuth } = require('service/auth');
router.post('/login', asyncErrorHandler(login));
router.post('/logout', isAuth, asyncErrorHandler(logout));
router.get('/unconfirmedPosts', isAuth, asyncErrorHandler(getUnconfirmedPosts));
router.get('/confirmedPosts', isAuth, asyncErrorHandler(getConfirmedPosts));
router.post('/confirmPost', isAuth, asyncErrorHandler(confirmPost));
router.post('/removePost', isAuth, asyncErrorHandler(removePost));
// TODO: for 測試用, 之後移除
router.post('/createPost', asyncErrorHandler(createPost));
module.exports = router;
