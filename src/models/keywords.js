const mongoose = require('mongoose');

const keywordSchema = new mongoose.Schema(
  {
    rank: {
      type: Number,
    },
    score: {
      type: Number,
    },
    keyword: {
      type: String,
      required: [true, '請輸入關鍵字'],
    },
    status: {
      type: Number,
      default: 0,
    },
    linkNumber: {
      type: Number,
    },
  },
  { timestamps: true },
);

const Keyword = mongoose.model('Keyword', keywordSchema);

module.exports = Keyword;
