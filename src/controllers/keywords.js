const successHandler = require('service/successHandler');
const errorHandler = require('service/errorHandler');
const Keyword = require('models/keywords');
const keywords = {
  // TODO: for 測試用, 之後移除
  async createKeyword(req, res) {
    const newKeyword = await Keyword.create(req.body);
    successHandler(res, newKeyword);
  },
  async getKeywords(req, res) {
    const startDate = req.query?.startDate;
    const endDate = req.query?.endDate;
    const status = req.query?.status;
    const page = req.query?.page || 1;
    const limit = req.query?.limit || 10;
    const query = {};
    if (status) query.status = status;
    if (startDate) {
      const start = new Date(startDate);
      query.updatedAt = { $gte: start };
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      query.updatedAt = query.updatedAt || {};
      query.updatedAt.$lte = end;
    }
    const keywords = await Keyword.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ updatedAt: -1 });
    const totalCount = await Keyword.countDocuments(query);
    const data = {
      keywords,
      totalCount,
    };
    successHandler(res, data);
  },
  async editKeywordStatus(req, res, next) {
    const id = req.params?.id;
    const status = req.body?.status;
    if (status === '') {
      return next(errorHandler(400, '未填寫關鍵字狀態'));
    }
    if (typeof status !== 'number') {
      return next(errorHandler(400, '關鍵字格式不正確'));
    }
    const theKeyword = await Keyword.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      },
    );
    if (theKeyword) {
      successHandler(res, theKeyword);
    } else {
      return next(errorHandler(400, '查無此id, 更新失敗'));
    }
  },
  async deleteKeyword(req, res, next) {
    const id = req.params?.id;
    const theKeyword = await Keyword.findByIdAndDelete(id);
    if (theKeyword) {
      successHandler(res, {});
    } else {
      return next(errorHandler(400, '查無此id, 更新失敗'));
    }
  },
};

module.exports = keywords;
