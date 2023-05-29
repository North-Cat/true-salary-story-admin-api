const mongoose = require('mongoose');
const errorHandler = require('service/errorHandler');

const objectIdValidator = (req, res, next) => {
  const id = req.params?.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(errorHandler(400, 'Id格式錯誤'));
  }
  next();
};

module.exports = objectIdValidator;
