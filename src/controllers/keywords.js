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
    const query = {};
    if (status) query.status = status;
    if (startDate) {
      const start = new Date(startDate);
      query.publishDate = { $gte: start };
    }
    if (endDate) {
      const end = new Date(endDate);
      query.publishDate = query.publishDate || {};
      query.publishDate.$lte = end;
    }
    const results = await Keyword.find(query).sort('rank');
    const keywords = results.map((el) => {
      const trimmedPublishDate = new Date(el.publishDate)
        .toISOString()
        .substring(0, 10);
      const plainDataWithoutMongooseProperties = el.toObject();
      return {
        ...plainDataWithoutMongooseProperties,
        publishDate: trimmedPublishDate,
      };
    });
    successHandler(res, keywords);
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
