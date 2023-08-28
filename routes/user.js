const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  statsUser,
} = require("../controllers/user");

const { protectRoute, authorize } = require("../middleware/tokenAuth");

router.get("/stats", statsUser);

router.route("/").get(protectRoute, authorize("admin"), getAllUsers);

router
  .route("/:id")
  .get(protectRoute, authorize("admin", "user"), getSingleUser)
  .put(protectRoute, authorize("admin", "user"), updateUser)
  .delete(protectRoute, authorize("admin", "user"), deleteUser);

module.exports = router;
