const successHandler = require('service/successHandler');
const errorHandler = require('service/errorHandler');
const Keyword = require('models/keywords');
const keywords = {
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
    const keywords = await Keyword.find(query).sort('rank');
    successHandler(res, keywords);
  },
};

module.exports = keywords;
