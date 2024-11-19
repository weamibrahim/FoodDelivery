import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import Header from "../../components/Header/Header";

export default function OrderSummary() {
  const { cart } = useContext(CartContext);

  return (
    <div className="min-h-screen">
         <div className="bg-orange-700"><Header/></div>
      {cart.length === 0 ? (
        <div className="text-center mt-10">No products</div>
      ) : (
        cart.map((item) => {
          const { foodId, quantity } = item; // Destructure foodId and quantity
          return (
            <div className="container  m-auto">
                  
            <div key={item._id} className="flex items-center justify-between gap-4 p-4 border-b">
              <div>
                <img
                  src={foodId.image}
                  alt={foodId.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </div>
            
                <div className="font-semibold">{foodId.name}</div>
                <div className="text-gray-600">Price:{foodId.price}$</div>
                <div className="text-sm text-gray-500">Quantity: {quantity}</div>
                <div>shipped</div>
          
            </div>
            </div>
          );
        })
      )}
    </div>
    
  );
}
