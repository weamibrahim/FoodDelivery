import React, { useContext, useEffect, useState } from 'react';
import './top.css';
import { fetchProducts } from '../../Products';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import Menu from '../Menu/Menu';
import { CategoryContext } from '../../context/CategoryContext';
import { motion } from "framer-motion";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import Alert from '../../Alert';
export default function TopDishes() {
  const { addToCart  } = useContext(CartContext);
  const { x, searchP } = useContext(CategoryContext);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  products.length = 5;

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;

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
  if (error) return <div>{error}</div>;
  if (products.length === 0) {
    return <div className='min-h-screen flex justify-center items-center'>Loading products ....</div>;
  }

  return (
    <div>
        <div>
      {showAlert && <Alert message={alert.message} type={alert.type} onClose={closeAlert} />}
    </div>
      <motion.div
        className="m-auto container mb-28"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Menu />
        <h2 className="mt-28 title text-2xl">Top Dishes</h2>
        <div className="mx-4">
          {x === false ? (
            <ul className="cards-parent mt-5 border-orange-700 grid gap-5 container m-auto p-6 xl:grid-rows-1 xl:gap-5 lg:grid-rows-3 lg:grid-flow-col lg:gap-7 lg:p-10  md:gap-4 md:p-8">
              {products.map((product, index) => (
                <motion.div
                  key={product._id}
                  className="card w-full relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/productDetails/${product._id}`}>
                    <img
                    width={300}
                      className="card-img"
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
                    <p className="mb-2 tracking-tight text-gray-900 text-left">Category: {product.category}</p>
                    <p className="mb-3 text-red-900 text-left">Price: {product.price} $</p>
                  </div>
                  <button
                    className="bg-orange-700 p-2 rounded-lg text-white absolute bottom-7 right-4"
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
                    <MdOutlineAddShoppingCart />
                  </button>
                </motion.div>
              ))}
            </ul>
          ) : (
            <ul className="cards-parent mt-5 border-orange-700 grid gap-5 container m-auto p-6 xl:grid-rows-1 xl:gap-5 lg:grid-rows-3 lg:grid-flow-col lg:gap-7 lg:p-10 md:grid-rows-10 md:grid-flow-col md:gap-4 md:p-8">
              {searchP.map((product, index) => (
                <motion.div
                  key={product._id}
                  className="card w-full relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/productDetails/${product._id}`}>
                    <img
                    width={300}
                      className="card-img"
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
                    <p className="mb-2 tracking-tight text-gray-900 text-left">Category: {product.category}</p>
                    <p className="mb-3 text-red-900 text-left">Price: {product.price} $</p>
                  </div>
                  <button
                    className="bg-orange-700 p-2 rounded-lg text-white absolute bottom-7 right-4"
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
                    <MdOutlineAddShoppingCart />
                  </button>
                </motion.div>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </div>
  );
}
