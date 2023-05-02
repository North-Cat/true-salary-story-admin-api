const express = require('express');
const router = express.Router();
const asyncErrorHandler = require('service/asyncErrorHandler');
const { login, logout, getUnconfirmedPost } = require('controllers/admins');
const { isAuth } = require('service/auth');
router.post('/login', asyncErrorHandler(login));
router.post('/logout', isAuth, asyncErrorHandler(logout));
// TODO: 確認是否需要:postId
router.post(
  '/unconfirmedPost/:postId',
  isAuth,
  asyncErrorHandler(getUnconfirmedPost),
);
module.exports = router;
