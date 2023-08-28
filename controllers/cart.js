const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../middleware/errorResponse");
const Cart = require("../models/Cart");

// @desc        Get All User Carts
// @route       Get /api/v1/cart
// @access      Public
exports.getAllCarts = asyncHandler(async (req, res, next) => {
  const cart = await Cart.find();

  res.status(200).json({ success: true, cart });
});

// @desc        Get Single User, Cart
// @route       Get /api/v1/cart/:userId
// @access      Private
exports.getCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ userId: req.params.userId });

  res.status(200).json({ success: true, cart });
});

// @desc        Create or Add Cart
// @route       POST /api/v1/cart
// @access      Private
exports.addNewCart = asyncHandler(async (req, res, next) => {
  const newCart = new Cart(req.body);

  console.log("new cart here = ", newCart);

  newCart.save();

  res.status(200).json({ success: true, newCart });
});

// @desc        Update Cart
// @route       PUT /api/v1/cart/:id
// @access      Private
exports.updateCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, msg: "Cart is updated", cart });
});

// @desc        Delete Cart
// @route       Delete /api/v1/cart/:id
// @access      Private
exports.deleteCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, msg: "Cart is deleted" });
});
