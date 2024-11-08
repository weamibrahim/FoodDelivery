import React, { useState,useEffect,useContext } from 'react'
import { fetchProducts } from "../Products";
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
export default function Menu() {
    const [products,setProducts]=useState([])
    const [error,setError]=useState(null)
    const { addToCart } = useContext(CartContext);
    const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null; // Ensure userId is not undefined

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        setError('Failed to load products');
      }
    };
    getProducts();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (products.length === 0) {
    return <div>No products available.</div>; // Handle no products case
  }

  return (
    <div>
        <div className='bg-orange-700'><Header/></div>
        <h1 className='text-2xl title mt-16'>Our Products </h1>
       <ul
           
           className="cards-parent mt-5  border-orange-700 grid gap-5 container m-auto p-6 xl:grid-rows-5  xl:gap-7  lg:grid-rows-3 lg:grid-flow-col lg:gap-7 lg:p-10 md:grid-rows-10 md:grid-flow-col md:gap-4 md:p-8"
         >
           {products.map((product) => (
             <div
               key={product.id}
              
               className="card w-full "
             >
             <Link to={`/productDetails/${product._id}`}>
                 <img
                   className="card-img"
                   src="/East Meets West_ Shirataki Noodles Paired with Chicken, Feta, and Tomato Medley.jpeg"
                   alt={product.name}
                 />
               </Link>
               <div className="p-5">
               <Link to={`/productDetails/${product._id}`}>
                   <h5 className="mb-2 font-bold tracking-tight text-gray-900 text-left">
                     {product.name}
                   </h5>
                 </Link>
       
                 <p className="mb-3 text-red-900 text-left">
                  Price: {product.price} $
                 </p>
               </div>
               <button
                 className="bg-orange-700  p-2 rounded-lg text-white"
                 onClick={() => {
                   if (userId) {
                     addToCart(product, userId);
                   } else {
                     alert("Please log in to add items to the cart.");
                   }
                 }}
               >
                 Add to Cart
               </button>
             </div>
           ))}
         </ul>
    </div>
  )
}
