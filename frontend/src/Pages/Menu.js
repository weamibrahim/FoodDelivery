import React, { useState,useEffect,useContext } from 'react'
import { fetchProducts } from "../Products";
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import Alert from "../Alert"
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
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const closeAlert = () => {
    setShowAlert(false);
  };
  if (error) {
    return <div>{error}</div>;
  }

  if (products.length === 0) {
    return <div className='min-h-screen flex justify-center items-center'>Loading products ....</div>;
  }

  return (
    <div className='min-h-screen'>
        <div className='bg-orange-700'><Header/></div>
        <div>
      {showAlert && <Alert message={alert.message} type={alert.type} onClose={closeAlert} />}
    </div>
        <h1 className='text-2xl title mt-16'>Our Products </h1>
       <ul
           
           className="cards-parent mt-5  mb-10 border-orange-700 grid grid-flow-row gap-5 container m-auto p-6 lg:grid-cols-4 md:grid-rows-3   "
         >
           {products.map((product) => (
             <div
               key={product.id}
              
               className="card w-full "
             >
             <Link to={`/productDetails/${product._id}`}>
                 <img
                 width={300}
                   className="card-img w-full"
                   src={product.image}
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
                 className="bg-orange-700  py-1 px-2 rounded-lg text-white"
                 onClick={() => {
                  if (userId) {
                    addToCart(product, userId);
                   setAlert({message:"Item added to cart successfuly" ,type:"success"})
                    setShowAlert(true)
                  } else {
                    
                  
                    setAlert({message:"Please log in to add items to the cart." ,type:"error"})
                    setShowAlert(true)
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
