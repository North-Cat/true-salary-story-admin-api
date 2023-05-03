const express = require('express');
const router = express.Router();
const asyncErrorHandler = require('service/asyncErrorHandler');
const {
  login,
  logout,
  getUnconfirmedPosts,
  confirmPost,
} = require('controllers/admins');
const { isAuth } = require('service/auth');
router.post('/login', asyncErrorHandler(login));
router.post('/logout', isAuth, asyncErrorHandler(logout));
router.get('/unconfirmedPosts', isAuth, asyncErrorHandler(getUnconfirmedPosts));
router.post('/confirmPost', isAuth, asyncErrorHandler(confirmPost));
module.exports = router;
