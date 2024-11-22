const express = require("express");

const router = express.Router();

const StripeController = require("../Controller/StripeController");
const verifyToken=require("../Middleware/Authentication")

router.post("/create-checkout-session",verifyToken,StripeController.createCheckoutSession); 

module.exports = router