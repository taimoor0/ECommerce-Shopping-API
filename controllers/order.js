const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../middleware/errorResponse");
const Order = require("../models/Order");

// @desc        Get All Orders
// @route       Get /api/v1/order
// @access      Public
exports.getAllOrders = asyncHandler(async (req, res, next) => {
  const order = await Order.find().populate(
    "products.productId",
    "title description"
  );

  res.status(200).json({ success: true, order });
});

// @desc        Get Single User, Order
// @route       Get /api/v1/order/:userId
// @access      Private
exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.find({ userId: req.params.userId }).populate(
    "products.productId",
    "title description"
  );

  res.status(200).json({ success: true, order });
});

// @desc        Add New Order
// @route       POST /api/v1/order
// @access      Private
exports.addNewOrder = asyncHandler(async (req, res, next) => {
  const newOrder = new Order(req.body);

  console.log("new order is here= ", newOrder);

  newOrder.save();

  res.status(200).json({ success: true, newOrder });
});

// @desc        Update Order
// @route       PUT /api/v1/order/:id
// @access      Private
exports.updateOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, msg: "Order is updated", order });
});

// @desc        Delete Order
// @route       Delete /api/v1/order/:id
// @access      Private
exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, msg: "Order is deleted" });
});

// @desc        Get Monthly Income
// @route       GET /api/v1/order/orderIncome
// @access      Private
exports.getMonthlyIncome = asyncHandler(async (req, res, next) => {
  const date = new Date();

  const lastMonth = new Date(date);
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  const previousMonth = new Date(lastMonth);
  previousMonth.setMonth(previousMonth.getMonth() - 1);

  console.log("Here is date = ", date);
  console.log("Here is lastMonth = ", lastMonth);
  console.log("Here is previous = ", previousMonth);

  const income = await Order.aggregate([
    { $match: { createdAt: { $gte: previousMonth } } },
    {
      $project: {
        month: { $month: "$createdAt" },
        sales: "$amount",
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: "$sales" },
      },
    },
  ]);

  console.log("Here is orderIncome = ", income);

  res.status(200).json({ success: true, income });
});
