const express = require("express");

const router = express.Router();

const StripeController = require("../Controller/StripeController");

router.post("/create-checkout-session",StripeController.createCheckoutSession); 

module.exports = router