const   Cart = require("../Models/Cart");

const CartController = {};

// Add item to cart 
CartController.addToCart = async (req, res) => {
    try {
        const { userId, foodId, quantity } = req.body;

        let cart = await Cart.findOne({ userId});

        if (!cart) {
               cart = await new Cart({ userId, items: [{foodId, quantity}] });
              
        }else{
        const itemIndex = cart.items.findIndex((p) => p.foodId == foodId);
        if (itemIndex >=0) {
            cart.items[itemIndex].quantity += quantity;
        } else {
           
            cart.items.push({ foodId, quantity });
        }
    }
        await cart.save();


        res.status(201).json({ cart, message: "Cart created successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Get cart
CartController.getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId }).populate("items.foodId");
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Delete cart
CartController.deleteCart = async (req, res) => {
    try {
        const { userId} = req.body;
      const cart = await Cart.findOne({ userId });
      cart.items = [];
      cart.save();
       
        res.status(200).json({ message: "Cart deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// increment item from cart
CartController.incrementQuantity = async (req, res) => {
    try {
        const { userId, foodId } = req.params;
        console.log(userId,foodId);
        const cart = await Cart.findOne({ userId });
console.log(cart);
        const itemIndex = cart.items.findIndex((p) => p.foodId == foodId);
        if (itemIndex >= 0) {
            cart.items[itemIndex].quantity += 1;
        }
        await cart.save();
        console.log(cart);
        res.status(200).json({ message: "Quantity incremented successfully" ,cart});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};
// decrement item from cart
CartController.decrementQuantity = async (req, res) => {
    try {
        const { userId, foodId } = req.params;
        const cart = await Cart.findOne({ userId });
       
        const itemIndex = cart.items.findIndex((p) => p.foodId == foodId);
        if (itemIndex >= 0) {
            cart.items[itemIndex].quantity -= 1;

            if (cart.items[itemIndex].quantity == 0) {
                cart.items.splice(itemIndex, 1);
            }
        }
        await cart.save();
        res.status(200).json({cart, message: "Quantity decremented successfully" });
    } catch (error) {
        res.status(500).json({message: error.message });
    }
};
// Delete item from cart
CartController.deleteItem = async (req, res) => {
    try {
        const { userId, foodId } = req.params;
        const cart = await Cart.findOne({ userId });
        const itemIndex = cart.items.findIndex((p) => p.foodId == foodId);
        cart.items.splice(itemIndex, 1);
        await cart.save();
        res.status(200).json({ message: "Item deleted successfully" ,cart});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = CartController