import React, { useContext, useState } from "react";

import { CartContext } from "../../context/CartContext";

import Header from "../../components/Header/Header";
import { CheckoutContext } from "../../context/CheckoutContext";
import { Link } from "react-router-dom";

export default function Checkout() {
 
  const { cart, getTotalPrice } = useContext(CartContext);
  const{submitCheckout}=useContext(CheckoutContext)
  const [updatedDetails, setUpdatedDetails] = useState({
  
   name: "",
 
   address:"",
    phone: "",
  });
 

  const handleChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };
const handleChangeSubmit=()=>{
  submitCheckout(updatedDetails)
}
  return (
    <>
      <div className="bg-orange-700">
        <Header />
      </div>
      <div className="flex flex-col mt-16 items-center min-h-screen p-4 mb-11 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>
        <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
          <form className="space-y-4">
            <div>
              <label className="block text-start text-sm font-medium text-gray-700">
                 Name:
              </label>
              <input
                type="text"
                name="name"
                value={updatedDetails.name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:ring-orange-700 focus:border-orange-700"
              />
            </div>
            
            
            <div>
              <label className="block text-start text-sm font-medium text-gray-700">
                Address:
              </label>
              <input
                type="text"
                name="address"
                value={updatedDetails.address}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:ring-orange-700 focus:border-orange-700"
              />
            </div>
            
            <div>
              <label className="block text-start text-sm font-medium text-gray-700">
                Phone:
              </label>
              <input
                type="text"
                name="phone"
                value={updatedDetails.phone}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-700 focus:border-orange-700"
              />
            
            </div>
            <hr></hr>
            <h2 className="text-lg font-bold mt-6 text-orange-700">Order Summary</h2>
            <div className="space-y-4 mt-4">
              {cart.map((item) => (
                <div
                  key={item.foodId._id}
                  className="flex justify-between items-center border-b pb-2 mb-2"
                >
                  <span className=" w-2/4 text-start">{item.foodId.name}</span>
                  <span>{item.quantity} x ${item.foodId.price.toFixed(2)}</span>
                  <span>${(item.quantity * item.foodId.price).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="text-lg font-semibold text-right">
              Total: ${getTotalPrice().toFixed(2)}
            </div>

          <button
              type="button"
              className="w-4/5 bg-orange-700 text-white py-2 rounded-md hover:bg-gray-300 hover:text-orange-700 transition duration-200 mt-4"
              onClick={handleChangeSubmit}
            >
              Confirm Purchase
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
