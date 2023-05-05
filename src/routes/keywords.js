const express = require('express');
const router = express.Router();
const asyncErrorHandler = require('service/asyncErrorHandler');
const { isAuth } = require('service/auth');
const { getKeywords } = require('controllers/keywords');
router.get('/', isAuth, asyncErrorHandler(getKeywords));
module.exports = router;
