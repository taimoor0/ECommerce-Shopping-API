const ErrorResponse = require("../middleware/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  console.log(err.message);

  //   Mongoose Server error or Duplicate Key
  if (err.code === 11000) {
    const message = `Duplicate valued entered`;
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
