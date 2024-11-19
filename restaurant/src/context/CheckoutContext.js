import { createContext, useContext } from "react";
import { CartContext } from "./CartContext";

export const CheckoutContext = createContext();

export const CheckoutProvider = function ({ children }) {
  // Get and parse the user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null; // Ensure userId is defined if user exists
const {cart}=useContext(CartContext)
console.log(cart)
  const submitCheckout = (deliveryDetails) => {
    const requestBody = {
      userId,
      cart,
      deliveryDetails,
    };
    console.log(requestBody);

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://fooddelivery-ivory.vercel.app/api/stripe/create-checkout-session",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        if (!response.ok) {
          const responseData = await response.json();
          console.error("Error with checkout session:", response.status, responseData);
        } else {
          const responseData = await response.json();
          console.log("Checkout session created:", responseData);
          window.location.href=responseData.url
        }
      } catch (error) {
        console.error("Error creating checkout session:", error);
      }
    };
    fetchData();
  };

  return (
    <CheckoutContext.Provider value={{ submitCheckout }}>
      {children}
    </CheckoutContext.Provider>
  );
};
