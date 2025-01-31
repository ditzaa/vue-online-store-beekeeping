const express = require("express");

const router = express.Router();

const { productController } = require("../controllers");

router.get("/getAllProducts", productController.getAllProducts);
router.get("/getProductById/:id", productController.getProductById);
router.get("/getMainProducts", productController.getMainProducts);
router.get("/search", productController.searchProducts);
router.post("/add", productController.addProduct);

module.exports = router;
