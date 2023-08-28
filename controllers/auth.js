const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../middleware/errorResponse");
const User = require("../models/User");

// @desc        Register new user
// @route       POST /api/v1/auth/signup
// @access      public
exports.signup = asyncHandler(async (req, res, next) => {
  const { username, email, password, isAdmin } = req.body;

  // Check Username and Email
  const isUserExist = await User.findOne({ username, email });
  if (!isUserExist) {
    const user = await User.create({
      username,
      email,
      password,
      isAdmin,
    });

    const token = await user.getSignedJwtToken();

    res
      .status(201)
      .json({ success: true, msg: `User Created`, token, result: user });
  } else {
    return next(new ErrorResponse(`Username or Email already exists`, 409));
  }
});

// @desc        Login user
// @route       POST /api/v1/auth/login
// @access      public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, checkPassword } = req.body;

  // Check user details
  if (!email || !checkPassword) {
    return next(new ErrorResponse(`Please provide users details`, 400));
  }

  // Check valid user
  const user = await User.findOne({ email }).select("+password");
  const isMatch = await user.matchPassword(checkPassword);

  if (!user || !isMatch) {
    return next(new ErrorResponse(`Invalid Email or Password`, 404));
  }

  const token = await user.getSignedJwtToken();

  const { password, ...others } = user._doc;

  res.status(200).json({ success: true, token, ...others });
});
