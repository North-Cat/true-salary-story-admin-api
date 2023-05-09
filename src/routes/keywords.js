const express = require('express');
const router = express.Router();
const asyncErrorHandler = require('service/asyncErrorHandler');
const { isAuth } = require('service/auth');
const { getKeywords, createKeyword } = require('controllers/keywords');
router.get('/', asyncErrorHandler(getKeywords));
// TODO: for 測試用, 之後移除
router.post('/createKeyword', asyncErrorHandler(createKeyword));
module.exports = router;
