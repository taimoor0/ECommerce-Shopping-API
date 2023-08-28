const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  getOrder,
  addNewOrder,
  updateOrder,
  deleteOrder,
  getMonthlyIncome,
} = require("../controllers/order");

const { protectRoute, authorize } = require("../middleware/tokenAuth");

router.route("/orderIncome").get(getMonthlyIncome);

router.route("/").get(getAllOrders).post(addNewOrder);

router.route("/:userId").get(getOrder);

router.route("/:id").put(updateOrder).delete(deleteOrder);

module.exports = router;
