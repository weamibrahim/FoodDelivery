import React, { useContext ,useState,useEffect, useRef} from 'react'
import { fetchProducts } from '../../Products'
import "./menu.css"
import { CategoryContext } from '../../context/CategoryContext'
import {motion} from "framer-motion"
export default function Menu() {
        const scrollRef=useRef(null)
        const {salad,MainDishes,BreakFast,Sandwich,desserts,Juice,pasta}=useContext(CategoryContext)
        const [products,setProducts]=useState([])
       
        const [error ,setError]=useState(null)
        useEffect(()=>{
         const getProducts=async()=>{
             try{
                 const data =await fetchProducts()
                 setProducts(data)
             }
             catch(error){
     setError("failed to load products")
             }
         }
         getProducts()
        },[])
        if(error){
         return <div>{error}</div>
        }

        
  return (
   <div ref={scrollRef} style={{overflow:"hidden"}}>
         <motion.div className='mt-28' 
         >
        <h2 className='mb-6 title text-2xl text-orange-950'>Menu</h2>
      <div className='m-auto container grid grid-flow-row grid-cols-3 xl:grid-cols-7 md:grid-cols-4  '>
        <motion.div
           initial={{opacity:0,scale:0}}
           whileInView={{opacity:1,scale:1}}
           transition={{duration:0.6}}
           viewport={{once:true}}
        whileHover={{scale:0.8}}   onClick={()=>salad(products)}>
            <img 
            width={100}
            height={100}
            className=' menu-img' src='\Salad (1).jpeg' alt=''/>
            <h5 className=''>Salad</h5>
    </motion.div>
    <motion.div  
     initial={{opacity:0,scale:0}}
           whileInView={{opacity:1,scale:1}}
           transition={{duration:0.6}}
           viewport={{once:true}}
    whileHover={{scale:0.8}} onClick={()=>BreakFast(products)}>
            <img 
            width={100}
            height={100}
            className=' menu-img' src='\Salad (4).jpeg' alt=''/>
            <h5 className=''>Breakfast</h5>
    </motion.div>
    <motion.div 
     initial={{opacity:0,scale:0}}
           whileInView={{opacity:1,scale:1}}
           transition={{duration:0.6}}
           viewport={{once:true}}
    whileHover={{scale:0.8}}  onClick={()=>MainDishes(products)}>
            <img 
            width={100}
            height={100}
            className=' menu-img' src='\Salad (6).jpeg' alt=''/>
            <h5 className=''>Main dishes</h5>
    </motion.div>
    <motion.div 
     initial={{opacity:0,scale:0}}
           whileInView={{opacity:1,scale:1}}
           transition={{duration:0.6}}
           viewport={{once:true}}
    whileHover={{scale:0.8}}  onClick={()=>Sandwich(products)}>
            <img 
            width={100}
            height={100}
            className=' menu-img' src='\Sandwich.jpeg' alt=''/>
            <h5 className=''>Sandwich</h5>
    </motion.div>
    <motion.div 
     initial={{opacity:0,scale:0}}
           whileInView={{opacity:1,scale:1}}
           transition={{duration:0.6}}
           viewport={{once:true}}
    whileHover={{scale:0.8}}  onClick={()=>desserts(products)}>
            <img 
            width={100}
            height={100}
            className=' menu-img' src='\dessert.jpeg' alt=''/>
            <h5 className=''>Desserts</h5>
    </motion.div>
   <motion.div 
    initial={{opacity:0,scale:0}}
           whileInView={{opacity:1,scale:1}}
           transition={{duration:0.6}}
           viewport={{once:true}}
   whileHover={{scale:0.8}}  onClick={()=>Juice(products)}>
            <img 
            width={100}
            height={100}
            className=' menu-img' src='\Juice.jpeg' alt=''/>
            <h5 className=''>Juice</h5>
    </motion.div>
    <motion.div  
     initial={{opacity:0,scale:0}}
           whileInView={{opacity:1,scale:1}}
           transition={{duration:0.6}}
           viewport={{once:true}}
    whileHover={{scale:0.8}} onClick={()=>pasta(products)}>
            <img 
            width={100}
            height={100}
            className='menu-img' src='\Pasta.jpeg' alt=''/>
            <h5 className=''>Pasta</h5>
    </motion.div>
    </div>
    </motion.div>
   </div>
  )
}
