import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCart = async (userId) => {
    
    try {
      const response = await fetch(
        `https://food-delivery-two-phi.vercel.app/api/cart/${userId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        }
      );
      const data = await response.json();
      if (response.ok) setCart(data.items || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
    
    }
  };

  const addToCart = async (product, userId) => {
    setIsLoading(true);
    try {
      await fetch("https://food-delivery-two-phi.vercel.app/api/cart/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ userId, foodId: product._id, quantity: 1 }),
      });
      fetchCart(userId);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const incrementQuantity = async (foodId, userId) => {
    try {
      await fetch(`https://food-delivery-two-phi.vercel.app/api/cart/incrementQuantity/${userId}/${foodId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      fetchCart(userId); // تحديث العربة بعد نجاح العملية
    } catch (error) {
      console.error("Error incrementing quantity:", error);
    }
  };
  
  const decrementQuantity = async (foodId, userId) => {
    try {
      await fetch(`https://food-delivery-two-phi.vercel.app/api/cart/decrementQuantity/${userId}/${foodId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      fetchCart(userId); // تحديث العربة بعد نجاح العملية
    } catch (error) {
      console.error("Error decrementing quantity:", error);
    }
  };
  

  const deleteItem = async (foodId, userId) => {
    try {
      await fetch(
        `https://food-delivery-two-phi.vercel.app/api/cart/remove-item/${userId}/${foodId}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        }
      );
      fetchCart(userId);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const deleteCart = async (userId) => {
    try {
      await fetch(`https://food-delivery-two-phi.vercel.app/api/cart/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      setCart([]);
    } catch (error) {
      console.error("Error deleting cart:", error);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.foodId?.price || 0) * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        fetchCart,
        addToCart,
        incrementQuantity,
        decrementQuantity,
        deleteItem,
        deleteCart,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
