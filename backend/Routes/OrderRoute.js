const express = require("express");
const router = express.Router();

// Import the OrderController
const OrderController = require("../Controller/orderController");
const verifyToken=require("../Middleware/Authentication")
const verifyRole=require("../Middleware/Authorization")
// Define the routes
router.get("/",verifyToken,verifyRole, OrderController.getAllOrders);
router.get("/:id",verifyToken, OrderController.getAllOrdersByUserId);

router.put("/:id",verifyToken,verifyRole, OrderController.updateOrder);

// Export the router
module.exports = router;