const AppError = require('../utils/appError');

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};
// error handlers

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = `${value} already in use. Please try another email.`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () => {
  return new AppError('Invalid token, Please log in again.', 401);
};

const handleJWTExpired = () => {
  return new AppError('Your token is expired! Please log in again.', 401);
};
// end of error handlers

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  //   development errors
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }

  //   production errors
  if (process.env.NODE_ENV === 'production') {
    // error cases

    if (err.name === 'CastError') {
      return sendErrorProd(handleCastErrorDB(err), res);
    }
    if (err.code === 11000) {
      return sendErrorProd(handleDuplicateFieldsDB(err), res);
    }
    if (err.name === 'ValidationError') {
      return sendErrorProd(handleValidationErrorDB(err), res);
    }
    if (err.name === 'JsonWebTokenError') {
      return sendErrorProd(handleJWTError(), res);
    }
    if (err.name === 'TokenExpiredError') {
      return sendErrorProd(handleJWTExpired(), res);
    }
  }

  sendErrorProd(err, res);
};
