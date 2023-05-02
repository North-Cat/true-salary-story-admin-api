const express = require('express');
const router = express.Router();
const asyncErrorHandler = require('service/asyncErrorHandler');
const { signUp, logIn, logOut } = require('controllers/admins');
const { isAuth } = require('service/auth');
router.post('/signup', asyncErrorHandler(signUp));
router.post('/login', asyncErrorHandler(logIn));
router.post('/logout', isAuth, asyncErrorHandler(logOut));
module.exports = router;
