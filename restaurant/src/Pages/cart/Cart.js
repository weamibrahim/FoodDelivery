import React, { useContext, useEffect } from 'react';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { Button } from '@headlessui/react';
// ES2015 module syntax
import { Fade } from "@progress/kendo-react-animation";
export default function Cart() {
  const { cart, fetchCart, incrementQuantity, decrementQuantity, deleteItem, deleteCart, getTotalPrice } = useContext(CartContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null; // Ensure userId is not undefined

  useEffect(() => {
    if (userId) {
      fetchCart(userId);
    }
  }, [userId]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-orange-700"><Header /></div>
      <h1 className="text-center text-2xl font-bold mt-4">Your Dishes</h1>

      <div className="mx-4 flex-grow">
        {cart.length === 0 ? (
          <div className="text-center mt-10">No products</div>
        ) : (
          <ul className="mt-5 grid gap-5 container mx-auto p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cart.map((product) => (
              product.foodId ? (
                <li key={product.foodId._id} className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Link to={'/productDetails'}>
                    <img className="object-cover w-full h-48 rounded-t-lg" src="/East Meets West_ Shirataki Noodles Paired with Chicken, Feta, and Tomato Medley.jpeg" alt="" />
                  </Link>
                  <div className="p-4">
                    <Link to={'/productDetails'}>
                      <h5 className="mb-2 text-xl font-bold text-gray-900">{product.foodId.name}</h5>
                    </Link>
                    <p className="mb-4 text-gray-700">{product.foodId.description}</p>
                    <p className="mb-4 text-lg text-gray-700">Price: {product.foodId.price} $</p>
                    <div className="flex items-center space-x-2">
                      <p>Quantity: {product.quantity}</p>
                      <button onClick={() => decrementQuantity(product.foodId._id, userId)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                      <button onClick={() => incrementQuantity(product.foodId._id, userId)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                      <button onClick={() => deleteItem(product.foodId._id, userId)} className="px-2 py-1 bg-orange-700 text-white rounded">Remove</button>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={product._id || Math.random()} className="text-red-500">Invalid product data</li>
              )
            ))}
            <div className="col-span-full mt-4 text-lg font-bold">Total price: {getTotalPrice()} $</div>
         <div className='flex col-span-full justify-center  mb-10 '>
         <button onClick={() => deleteCart(userId)} className="col-span-full mt-2 mr-9 px-4 py-2 bg-orange-700 text-white rounded">Clear Cart</button>
          <Link  to={"/checkout"}><button className='col-span-full mt-2 px-4 py-2 bg-orange-700 text-white rounded'>Checkout</button></Link>
         
          </div> </ul>
        )}
      </div>
    </div>
  );
}
