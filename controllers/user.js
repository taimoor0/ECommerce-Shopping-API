const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../middleware/errorResponse");
const User = require("../models/User.js");

// @desc        Get All Users
// @route       Get /api/v1/user
// @access      Private
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const query = req.query.new; // ?new=true
  const user = query
    ? await User.find().sort({ id: -1 }).limit(2)
    : await User.find();

  const length = user.length;
  res.status(200).json({ success: true, length, user });
});

// @desc        Get SIngle User
// @route       Get /api/v1/user/:id
// @access      Private
exports.getSingleUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({ success: true, user });
});

// @desc        Update User Details
// @route       PUT /api/v1/user/:id
// @access      Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true });
});

// @desc        Delete User
// @route       Delete /api/v1/user/:id
// @access      Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, Msg: `User ${user.username} delete` });
});

// @desc        Get User Stats
// @route       Get /api/v1/user/stats
// @access      Private
exports.statsUser = asyncHandler(async (req, res, next) => {
  const date = new Date();
  // const lastYear = new Date(date.setFullYear(date.setFullYear() - 1));
  const lastYear = new Date();
  lastYear.setFullYear(lastYear.getFullYear() - 1);

  console.log(lastYear);

  const data = await User.aggregate([
    { $match: { createdAt: { $gte: lastYear } } },
    { $project: { month: { $month: "$createdAt" } } },
    { $group: { _id: "$month", total: { $sum: 1 } } },
  ]);

  res.status(200).json({ success: true, data });
});
