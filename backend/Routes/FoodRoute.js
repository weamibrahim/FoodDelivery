const express = require("express");
const router = express.Router();

// Import the FoodController
const FoodController = require("../Controller/FoodController");
const upload = require("../Middleware/Upload");
// Define the routes
router.get("/", FoodController.getAllFoods);
router.get("/:id", FoodController.getFoodById);
router.post("/",upload.single("image"), FoodController.createFood);
router.put("/:id",upload.single("image"), FoodController.updateFood);
router.delete("/:id", FoodController.deleteFood);

// Export the router
module.exports = router;
