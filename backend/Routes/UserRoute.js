const express = require("express");
const router = express.Router();

// Import the UserController
const UserController = require("../Controller/UserController");

// Define the routes
router.get("/", UserController.getAllUsers);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

// Export the router
module.exports = router;