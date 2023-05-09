const express = require('express');
const router = express.Router();
const asyncErrorHandler = require('service/asyncErrorHandler');
const { isAuth } = require('service/auth');
const {
  getKeywords,
  createKeyword,
  editKeywordStatus,
  deleteKeyword,
} = require('controllers/keywords');
router.get('/', asyncErrorHandler(getKeywords));
router.patch('/:id', isAuth, asyncErrorHandler(editKeywordStatus));
router.delete('/:id', isAuth, asyncErrorHandler(deleteKeyword));
// TODO: for 測試用, 之後移除
router.post('/createKeyword', asyncErrorHandler(createKeyword));
module.exports = router;
