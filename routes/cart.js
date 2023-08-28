const express = require("express");
const router = express.Router();

const {
  getAllCarts,
  getCart,
  addNewCart,
  updateCart,
  deleteCart,
} = require("../controllers/cart");

const { protectRoute, authorize } = require("../middleware/tokenAuth");

router.route("/").get(getAllCarts).post(addNewCart);

router.route("/:userId").get(getCart);

router.route("/:id").put(updateCart).delete(deleteCart);

module.exports = router;
