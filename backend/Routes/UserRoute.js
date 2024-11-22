const express = require("express");
const router = express.Router();

// Import the UserController
const UserController = require("../Controller/UserController");
const verifyToken=require("../Middleware/Authentication")
const verifyRole=require("../Middleware/Authorization")
// Define the routes
router.get("/",verifyToken,verifyRole, UserController.getAllUsers);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.put("/:id",verifyToken, UserController.updateUser);
router.delete("/:id",verifyToken,verifyRole, UserController.deleteUser);

// Export the router
module.exports = router;