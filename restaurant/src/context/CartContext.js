import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Initialize cart from local storage
  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart"));
    if (Array.isArray(localCart)) {
      setCart(localCart);
    } else {
      setCart([]);
    }
  }, []);

  // Sync cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Fetch cart from backend
  const fetchCart = async (userId) => {
    try {
      const response = await fetch(
        `https://food-delivery-two-phi.vercel.app/api/cart/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const responseData = await response.json();
      console.log("Fetched Cart Data:", responseData);

      if (response.ok) {
        setCart(Array.isArray(responseData.items) ? responseData.items : []);
      } else {
        console.error("Error fetching cart:", response.status, responseData);
      }
    } catch (error) {
      console.error("Error with fetchCart API request:", error);
    }
  };

  // Add to cart
  const addToCart = async (product, userId) => {
    console.log("Product received in addToCart:", product);

    if (!product || !product._id) {
      console.error("Invalid product or missing _id:", product);
      return;
    }

    try {
      console.log("cart", cart);
      const existingItem = cart.find((item) => item._id === product._id);
      console.log("Existing item in cart:", existingItem);
      if (existingItem) {
        await incrementQuantity(product._id, userId);
      } else {
        const newItem = { ...product, quantity: 1 };
        setCart((prevCart) => [...prevCart, newItem]);

        const requestBody = {
          userId,
          foodId: product._id,
          quantity: 1,
        };

        const response = await fetch(
          "https://food-delivery-two-phi.vercel.app/api/cart/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(requestBody),
          }
        );

        if (!response.ok) {
          const responseData = await response.json();
          console.error(
            "Error adding product to the cart:",
            response.status,
            responseData
          );
        }
      }
    } catch (error) {
      console.error("Error with addToCart API request:", error);
    }
  };

  // Increment quantity
  const incrementQuantity = async (foodId, userId) => {
    const updatedCart = cart.map((item) =>
      item.foodId._id === foodId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updatedCart);

    try {
      const response = await fetch(
        `https://food-delivery-two-phi.vercel.app/api/cart/incrementQuantity/${userId}/${foodId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!response.ok) {
        const responseData = await response.json();
        console.error(
          "Error incrementing product quantity:",
          response.status,
          responseData
        );

        const rollbackCart = cart.map((item) =>
          item.foodId._id === foodId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        setCart(rollbackCart);
      }
    } catch (error) {
      console.error("Error with incrementQuantity API request:", error);
    }
  };

  // Decrement quantity
  const decrementQuantity = async (foodId, userId) => {
    const item = cart.find((item) => item.foodId._id === foodId);
    if (item && item.quantity === 1) {
      await deleteItem(foodId, userId);
    } else {
      const updatedCart = cart.map((item) =>
        item.foodId._id === foodId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setCart(updatedCart);

      try {
        const response = await fetch(
          `https://food-delivery-two-phi.vercel.app/api/cart/decrementQuantity/${userId}/${foodId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (!response.ok) {
          const responseData = await response.json();
          console.error(
            "Error decrementing product quantity:",
            response.status,
            responseData
          );

          const rollbackCart = cart.map((item) =>
            item.foodId._id === foodId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          setCart(rollbackCart);
        }
      } catch (error) {
        console.error("Error with decrementQuantity API request:", error);
      }
    }
  };

  // Delete item from cart
  const deleteItem = async (foodId, userId) => {
    const updatedCart = cart.filter((item) => item.foodId._id !== foodId);
    setCart(updatedCart);

    try {
      const response = await fetch(
        `https://food-delivery-two-phi.vercel.app/api/cart/remove-item/${userId}/${foodId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!response.ok) {
        const responseData = await response.json();
        console.error(
          "Error deleting item from cart:",
          response.status,
          responseData
        );
        setCart([
          ...updatedCart,
          cart.find((item) => item.foodId._id === foodId),
        ]);
      }
    } catch (error) {
      console.error("Error with deleteItem API request:", error);
    }
  };

  // Delete entire cart
  const deleteCart = async (userId) => {
    try {
      setCart([]);

      const response = await fetch(
        `https://food-delivery-two-phi.vercel.app/api/cart/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!response.ok) {
        const responseData = await response.json();
        console.error("Error deleting cart:", response.status, responseData);
      }
    } catch (error) {
      console.error("Error with deleteCart API request:", error);
    }
  };

  // Log the cart after changes
  useEffect(() => {
    console.log("Cart state updated:", cart);
  }, [cart]);

  // Calculate total price
  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      if (item.foodId && typeof item.foodId.price === "number") {
        return total + item.foodId.price * item.quantity;
      }
      console.warn("Item is missing foodId or price:", item);
      return total;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        incrementQuantity,
        decrementQuantity,
        deleteItem,
        deleteCart,
        fetchCart,
        cart: Array.isArray(cart) ? cart : [], // Ensure cart is always an array
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
