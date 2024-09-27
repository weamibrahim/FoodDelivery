const express = require("express");
const router = express.Router();

// Import the OrderController
const OrderController = require("../Controller/orderController");

// Define the routes
router.get("/:id", OrderController.getAllOrdersByUserId);

router.put("/", OrderController.updateOrder);

// Export the router
module.exports = router;