const express = require("express");

const router = express.Router();

const { productController } = require("../controllers");

router.get("/getAllProducts", productController.getAllProducts);
router.get("/getProductById/:id", productController.getProductById);
router.post("/add", productController.addProduct);

module.exports = router;
