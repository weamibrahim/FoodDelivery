const express = require("express");
const router = express.Router();

// Import the FavoriteController
const FavoriteController = require("../Controller/FavoriteController");

// Define the routes
router.get("/:userId", FavoriteController.getFavorites);
router.post("/:foodId", FavoriteController.createFavorite);
router.delete("/:foodId", FavoriteController.deleteFavorite);

// Export the router
module.exports = router;