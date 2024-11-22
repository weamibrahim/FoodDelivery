const express = require("express");
const router = express.Router();

// Import the CartController
const CartController = require("../Controller/CartController");
const verifyToken  = require("../Middleware/Authentication");
// Define the routes
router.get("/:userId",verifyToken, CartController.getCart);
router.post("/",verifyToken, CartController.addToCart);
router.put("/remove-item/:userId/:foodId",verifyToken, CartController.deleteItem);
router.delete("/:userId",verifyToken, CartController.deleteCart);
router.put("/incrementQuantity/:userId/:foodId",verifyToken, CartController.incrementQuantity);
router.put("/decrementQuantity/:userId/:foodId",verifyToken, CartController.decrementQuantity);

// Export the router
module.exports = router;