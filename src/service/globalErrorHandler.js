const resErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: false,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: false,
      message: '系統錯誤,請洽系統管理員',
    });
  }
};

const resErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: false,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const globalErrorHandler = (err, req, res) => {
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === 'dev') {
    resErrorDev(err, res);
  }
  if (err.name === 'ValidationError') {
    err.message = '資料欄位未填寫正確';
    err.isOperational = true;
    resErrorProd(err, res);
  }
};

module.exports = globalErrorHandler;
