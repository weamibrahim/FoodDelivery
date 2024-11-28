import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../../Products'; // Ensure this correctly fetches product data
import Header from '../../components/Header/Header';
import { CartContext } from '../../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const { addToCart} = useContext(CartContext);
  const [error, setError] = useState(null);
  
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null; // Ensure userId is not undefined

 

  // Log the id to ensure it's captured correctly
  useEffect(() => {
    console.log("ID from useParams:", id);
  }, [id]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        console.log("Products fetched:", data); // Log the products array
      } catch (error) {
        console.error("Failed to load products:", error);
        setError("Failed to load products");
      }
    };
    getProducts();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (products.length === 0) {
    return <section className='min-h-screen flex justify-center items-center'>Loading...</section>;
  }

  // Get the right product by ensuring both id and _id are strings
  const product = products.find((item) => String(item._id) === String(id));
  console.log("Found product:", product); // Log the found product

  if (!product) {
    return <section>Product not found</section>;
  }

  return (
    <div >
      <div className="bg-orange-800">
        <Header />
      </div>
      <section className="mt-20 lg:w-2/3 m-auto min-h-screen  h-auto p-10">
        <div
          key={product._id}
          className="flex flex-col items-center text-start h-full bg-white border border-gray-200 rounded-lg shadow lg:flex-row lg:max-w-3xl hover:bg-gray-100" 
          style={{ minHeight: '600px' }}
        >
          <img
            className="object-cover w-full rounded-t-lg h-96 lg:h-auto lg:w-72 lg:rounded-none lg:rounded-l-lg" 
            src={product.image}
            alt={product.name}
          />
          <div className="flex flex-col justify-between p-8 leading-normal lg:w-2/3"> 
            <h5 className="mb-4 text-3xl font-bold tracking-tight text-gray-900">{product.name}</h5>
            <p className="mb-5 font-normal text-lg text-gray-700">{product.description}</p>
            <p className="mb-5 font-normal text-lg text-gray-700">Price: {product.price} $</p>
            

            <div className="flex space-x-4">
    
              <button 
                onClick={() =>{ 
                  console.log(product)
                  addToCart(product,userId)}
                  }
                className="bg-orange-700 text-white px-4 py-2 rounded-md"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
