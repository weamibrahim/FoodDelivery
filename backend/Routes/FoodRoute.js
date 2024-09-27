const express = require("express");
const router = express.Router();

// Import the FoodController
const FoodController = require("../Controller/FoodController");

// Define the routes
router.get("/", FoodController.getAllFoods);
router.get("/:id", FoodController.getFoodById);
router.post("/", FoodController.createFood);
router.put("/:id", FoodController.updateFood);
router.delete("/:id", FoodController.deleteFood);

// Export the router
module.exports = router;
