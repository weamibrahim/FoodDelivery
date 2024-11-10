const Order = require("../Models/Order");

const OrderController = {};

// Create a new order
OrderController.createOrder = async (newOrder) => {
  try {
    const order = new Order(newOrder);
    await order.save();
   
  } catch (error) {
    console.error("Error creating order:", error);
  }
};
// Get all orders for a user
OrderController.getAllOrdersByUserId = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get an all orders 
OrderController.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("userId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
// Update an order
OrderController.updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const {  status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        status,
      },
      {
        new: true,
      }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ updatedOrder, message: "Order updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = OrderController;
