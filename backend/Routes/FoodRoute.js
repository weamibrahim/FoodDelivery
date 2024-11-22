const express = require("express");
const router = express.Router();

// Import the FoodController
const FoodController = require("../Controller/FoodController");
const upload = require("../Middleware/Upload");
const verifyToken=require("../Middleware/Authentication")
const verifyRole=require("../Middleware/Authorization")
// Define the routes
router.get("/", FoodController.getAllFoods);
router.get("/:id", FoodController.getFoodById);
router.post("/" , verifyToken , verifyRole, upload.single("image"), FoodController.createFood);
router.put("/:id",verifyToken,verifyRole,upload.single("image"), FoodController.updateFood);
router.delete("/:id",verifyToken,verifyRole, FoodController.deleteFood);

// Export the router
module.exports = router;
 