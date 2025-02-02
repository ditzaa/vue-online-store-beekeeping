const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authorizeRole,
} = require("../middlewares/authMiddleware");
const { orderController } = require("../controllers");

router.get("/getAllOrders", orderController.getAllOrders);
router.get("/getOrderById/:id", orderController.getOrderById);
router.post("/add", orderController.addOrder);

module.exports = router;
