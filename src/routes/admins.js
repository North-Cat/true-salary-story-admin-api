const express = require('express');
const router = express.Router();
const asyncErrorHandler = require('service/asyncErrorHandler');
const { login, logout, getUnconfirmedPosts } = require('controllers/admins');
const { isAuth } = require('service/auth');
router.post('/login', asyncErrorHandler(login));
router.post('/logout', isAuth, asyncErrorHandler(logout));
// TODO: 確認get or post
router.get('/unconfirmedPosts', isAuth, asyncErrorHandler(getUnconfirmedPosts));
module.exports = router;
