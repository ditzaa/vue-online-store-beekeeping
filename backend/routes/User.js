const express = require("express");

const router = express.Router();

const { userController } = require("../controllers");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/registerAdmin", userController.registerAdmin);
router.post("/loginAdmin", userController.loginAdmin);

module.exports = router;
