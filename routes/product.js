const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getSingleProdcut,
  addNewProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const { protectRoute, authorize } = require("../middleware/tokenAuth");

router
  .route("/")
  .get(protectRoute, getAllProducts)
  .post(protectRoute, authorize("admin"), addNewProduct);

router
  .route("/:id")
  .get(protectRoute, getSingleProdcut)
  .put(protectRoute, authorize("admin"), updateProduct)
  .delete(protectRoute, authorize("admin"), deleteProduct);

module.exports = router;
