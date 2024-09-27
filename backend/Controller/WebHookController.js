require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const {createOrder } = require('../Controller/orderController');
const Cart = require('../Models/Cart');
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const WebhookController = {};

WebhookController.handleWebhook = async (req, res) => {
  // console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY);
  // console.log('STRIPE_WEBHOOK_SECRET:', process.env.STRIPE_WEBHOOK_SECRET);
  
  const sig = req.headers['stripe-signature'];
  //console.log('Stripe Signature:', sig);

  let event;

  try {
  
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  //console.log('Event Type:', event.type);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
     
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      const orderData = {
        userId: session.metadata.userId,
        items: lineItems.data.map(item => ({
          name: item.description,
          quantity: item.quantity,
         
          price: item.amount_subtotal / 100,
        })),
        totalAmount: session.amount_total / 100,
        DeliveryAddress: {
            name: session.metadata.name,
            address: session.metadata.address,
            phone: session.metadata.phone,
          },
          payment:true
      };

      // Save the order
    createOrder(orderData);
      
    //   Clear the cart after the order is processed
    await Cart.deleteOne({ userId: session.metadata.userId });

      console.log('Order successfully saved and cart cleared.');
    } catch (err) {
      console.error('Error processing order:', err);
    }
  }

  res.status(200).json({ received: true });
};

module.exports = WebhookController;
