const express = require("express");

const router = express.Router();

const { productController } = require("../controllers");

router.get("/getAllProducts", productController.getAllProducts);
// router.post("/add", playerController.addFavoritePlayer);
// router.delete("/remove", playerController.removeFavoritePlayer);
// router.get(
//   "/favorites/:userId/:idTransfermarkt",
//   playerController.isFavoritePlayer
// );
// router.get(
//   "/friends-favorites/:userId",
//   playerController.getFriendsFavoritePlayers
// );

module.exports = router;
