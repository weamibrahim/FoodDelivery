const express = require("express");
const router = express.Router();

// Import the CartController
const CartController = require("../Controller/CartController");
cons
// Define the routes
router.get("/:userId", CartController.getCart);
router.post("/", CartController.addToCart);
router.put("/remove-item/:userId/:foodId", CartController.deleteItem);
router.delete("/:userId", CartController.deleteCart);
router.put("/incrementQuantity/:userId/:foodId", CartController.incrementQuantity);
router.put("/decrementQuantity/:userId/:foodId", CartController.decrementQuantity);

// Export the router
module.exports = router;