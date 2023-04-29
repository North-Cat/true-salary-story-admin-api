const express = require('express');
const router = express.Router();
const asyncErrorHandler = require('service/asyncErrorHandler');
const { login, logout } = require('controllers/admins');
const { isAuth } = require('service/auth');
router.post('/login', asyncErrorHandler(login));
router.post('/logout', isAuth, asyncErrorHandler(logout));
module.exports = router;
