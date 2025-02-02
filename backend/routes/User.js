const express = require("express");

const router = express.Router();
const {
  authenticateUser,
  authorizeRole,
} = require("../middlewares/authMiddleware.js");
const { userController } = require("../controllers");
const { validateToken } = require("../controllers/AuthController.js");

router.get("/favorites", authenticateUser, userController.getFavorites);
router.get(
  "/favorites/:productId",
  authenticateUser,
  userController.getFavoriteStatus
);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/registerAdmin", userController.registerAdmin);
router.post("/loginAdmin", userController.loginAdmin);
router.post("/toggleFavorite", authenticateUser, userController.toggleFavorite);

module.exports = router;
