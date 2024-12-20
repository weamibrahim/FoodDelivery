import React, { useContext } from 'react';
import './hero.css';
import Header from '../Header/Header';
import {motion} from "framer-motion"
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
export default function Hero() {
  const {cart}=useContext(CartContext)
  console.log(cart)
  return (
    <>
      {/* For medium and larger screens */}
      <div className=' hero-section-parent hidden lg:block'
     
      >
        <div className='hero-content-parent'>
          <Header />
          <motion.div className='hero-content p-9 lg:left-24 lg:text-left rounded-lg'
           initial={{x:"-100vw"}}
           animate={{x:0}}
           transition={{duration:1,delay:0.5}}
          >
            <h1 className='uppercase font-bold text-4xl text-orange-200 lg:text-start '>LA Ratatouille</h1>
            <p className='text-xl mt-3 text-white lg:text-start'>If you are not impressed get your money back</p>
           <Link to='/menu'> <button className='bg-orange-700 py-2  px-5 rounded mt-5 text-white' 
      
           >Order Now !</button></Link>
          </motion.div>
        </div>
        
      </div>

      {/* For small screens */}
      <div className=' hero-section-parent2 lg:hidden'
   
      >
        <div className='hero-content-parent'>
          <Header />
          <motion.div className='hero-content p-9 lg:left-24 rounded-lg text-center  w-full '
           initial={{x:"-100vw"}}
           animate={{x:0}}
           transition={{duration:1,delay:0.5}}>
            <h1 className='uppercase font-bold text-3xl text-orange-200 md:text-center '>LA Ratatouille</h1>
            <p className='text-lg mt-3 text-white md:text-center'>If you are not impressed get your money back</p>
            <a href='#top'> <motion.button className='bg-orange-700 py-2  px-5 rounded mt-5 text-white'>Order Now !</motion.button></a>
          </motion.div>
        </div>
      </div>
    </>
  );
}
