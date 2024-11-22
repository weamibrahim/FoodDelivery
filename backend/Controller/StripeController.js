require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const StripeController = {};

StripeController.createCheckoutSession = async (req, res) => {
  // console.log(req.body);
  const { userId, cart, deliveryDetails } = req.body;

  cartItems = cart;

  //   console.log(userId);
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ error: "Invalid cart items" });
  }

  try {
    const lineItems = cartItems.map((item) => {
      const { name, price } = item.foodId;
      const unitAmount = Math.round(price * 100);
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: name,
          },
          unit_amount: unitAmount,
        },
        quantity: item.quantity,
      };
    });

    const baseURL =
      process.env.BASE_URL || "https://food-delivery-two-phi.vercel.app";
    if (!baseURL.startsWith("http://") && !baseURL.startsWith("https://")) {
      throw new Error("BASE_URL must start with http:// or https://");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${baseURL}/order`,
      cancel_url: `${baseURL}/cart`,
      metadata: {
        userId: userId,
        name: deliveryDetails.name,
        address: deliveryDetails.address,
        phone: deliveryDetails.phone,
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.log("Stripe API Error:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};

module.exports = StripeController;
