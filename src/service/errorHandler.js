const errorHandler = (httpStatus, errMessage) => {
  const error = new Error(errMessage);
  error.statusCode = httpStatus;
  return error;
};

module.exports = errorHandler;
