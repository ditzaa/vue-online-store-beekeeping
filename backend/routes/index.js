const express = require("express");
const router = express.Router();

const productRouter = require("./Product");

router.use("/product", productRouter);

module.exports = router;
