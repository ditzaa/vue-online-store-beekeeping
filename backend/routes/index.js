const express = require("express");
const router = express.Router();

const productRouter = require("./Product");
const orderRouter = require("./Order");
const userRouter = require("./User");

router.use("/product", productRouter);
router.use("/order", orderRouter);
router.use("/user", userRouter);

module.exports = router;
