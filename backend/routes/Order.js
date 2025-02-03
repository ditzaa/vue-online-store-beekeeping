const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authorizeRole,
  verifyAdminToken,
} = require("../middlewares/authMiddleware");
const { orderController } = require("../controllers");

router.get("/getAllOrders", orderController.getAllOrders);
router.get("/getOrderById/:id", orderController.getOrderById);
router.post("/add", authenticateUser, orderController.addOrder);
router.patch("/updateOrder/:id", verifyAdminToken, orderController.updateOrder);

module.exports = router;
