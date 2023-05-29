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
const objectIdValidator = require('service/objectIdValidator');
router.get('/', isAuth, asyncErrorHandler(getKeywords));
router.patch(
  '/:id',
  isAuth,
  objectIdValidator,
  asyncErrorHandler(editKeywordStatus),
);
router.delete(
  '/:id',
  isAuth,
  objectIdValidator,
  asyncErrorHandler(deleteKeyword),
);
// TODO: for 測試用, 之後移除
router.post('/createKeyword', asyncErrorHandler(createKeyword));
module.exports = router;
