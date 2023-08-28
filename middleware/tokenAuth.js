const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const ErrorResponse = require("./errorResponse");
const User = require("../models/User");

// Protect Routes With creating AUTHENTICATION middleware for all routes
exports.protectRoute = asyncHandler(async (req, res, next) => {
  let token;

  // Set token in postman
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = await req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse(`Not Authorized to access this route`, 401));
  }

  try {
    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    console.log("decoded Token", decodedToken);

    req.user = await User.findById({ _id: decodedToken.id });

    console.log("protected user:", req.user);

    next();
  } catch (err) {
    return next(new ErrorResponse(`Invalid Token`, 401));
  }
});

// Give access to a specific user like admin
exports.authorize = (...isAdmin) => {
  return (req, res, next) => {
    if (!isAdmin.includes(req.user.isAdmin)) {
      return next(
        new ErrorResponse("Not authorized to perform the action", 403)
      );
    }
    next();
  };
};
