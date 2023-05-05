const express = require('express');
const router = express.Router();
const asyncErrorHandler = require('service/asyncErrorHandler');
const { getKeywords } = require('controllers/keywords');
router.get('/', asyncErrorHandler(getKeywords));
module.exports = router;