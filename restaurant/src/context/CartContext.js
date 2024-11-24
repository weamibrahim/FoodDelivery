import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // قائمة المنتجات في السلة
  const [isLoading, setIsLoading] = useState(false); // حالة التحميل

  // جلب بيانات السلة عند تحميل التطبيق
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.id) {
      fetchCart(user.id);
    }
  }, []);

  // دالة لجلب بيانات السلة من الـ API
  const fetchCart = async (userId) => {
    setIsLoading(true);
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

      if (response.ok) {
        setCart(Array.isArray(responseData.items) ? responseData.items : []);
      } else {
        console.error("Error fetching cart:", response.status, responseData);
      }
    } catch (error) {
      console.error("Error with fetchCart API request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // إضافة منتج للسلة
  const addToCart = async (product, userId) => {
    if (!product || !product._id) {
      console.error("Invalid product or missing _id:", product);
      return;
    }

    setIsLoading(true);
    try {
      const existingItem = cart.find((item) => item._id === product._id);
      if (existingItem) {
        await incrementQuantity(product._id, userId);
      } else {
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

        if (response.ok) {
          fetchCart(userId);
        } else {
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
    } finally {
      setIsLoading(false);
    }
  };

  // زيادة الكمية
  const incrementQuantity = async (foodId, userId) => {
    setIsLoading(true);
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

      if (response.ok) {
        fetchCart(userId);
      } else {
        const responseData = await response.json();
        console.error(
          "Error incrementing product quantity:",
          response.status,
          responseData
        );
      }
    } catch (error) {
      console.error("Error with incrementQuantity API request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // تقليل الكمية
  const decrementQuantity = async (foodId, userId) => {
    setIsLoading(true);
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

      if (response.ok) {
        fetchCart(userId);
      } else {
        const responseData = await response.json();
        console.error(
          "Error decrementing product quantity:",
          response.status,
          responseData
        );
      }
    } catch (error) {
      console.error("Error with decrementQuantity API request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // حذف عنصر معين من السلة
  const deleteItem = async (foodId, userId) => {
    setIsLoading(true);
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

      if (response.ok) {
        fetchCart(userId); // تحديث بيانات السلة بعد الحذف
      } else {
        const responseData = await response.json();
        console.error(
          "Error deleting item from cart:",
          response.status,
          responseData
        );
      }
    } catch (error) {
      console.error("Error with deleteItem API request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // مسح السلة بالكامل
  const deleteCart = async (userId) => {
    setIsLoading(true);
    try {
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

      if (response.ok) {
        setCart([]);
      } else {
        const responseData = await response.json();
        console.error("Error deleting cart:", response.status, responseData);
      }
    } catch (error) {
      console.error("Error with deleteCart API request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // حساب إجمالي السعر
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
