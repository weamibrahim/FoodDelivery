import React, { useContext ,useState,useEffect} from 'react'
import { fetchProducts } from '../../Products'
import "./menu.css"
import { CategoryContext } from '../../context/CategoryContext'
export default function Menu() {
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
    <div className='mt-28' >
        <h2 className='mb-6 title text-2xl'>Menu</h2>
      <div className='m-auto container grid grid-flow-row grid-cols-3 xl:grid-cols-7 md:grid-cols-4  '>
        <div onClick={()=>salad()}>
            <img 
            width={100}
            height={100}
            className=' menu-img' src='\Salad (1).jpeg' alt=''/>
            <h5 className=''>All</h5>
    </div>
    <div onClick={()=>BreakFast(products)}>
            <img 
            width={100}
            height={100}
            className=' menu-img' src='\Salad (4).jpeg' alt=''/>
            <h5 className=''>Breakfast</h5>
    </div>
    <div onClick={()=>MainDishes(products)}>
            <img 
            width={100}
            height={100}
            className=' menu-img' src='\Salad (6).jpeg' alt=''/>
            <h5 className=''>Main dishes</h5>
    </div>
    <div onClick={()=>Sandwich(products)}>
            <img 
            width={100}
            height={100}
            className=' menu-img' src='\Sandwich.jpeg' alt=''/>
            <h5 className=''>Sandwich</h5>
    </div>
    <div onClick={()=>desserts(products)}>
            <img 
            width={100}
            height={100}
            className=' menu-img' src='\dessert.jpeg' alt=''/>
            <h5 className=''>Desserts</h5>
    </div>
    <div onClick={()=>Juice(products)}>
            <img 
            width={100}
            height={100}
            className=' menu-img' src='\Juice.jpeg' alt=''/>
            <h5 className=''>Juice</h5>
    </div>
    <div onClick={()=>pasta(products)}>
            <img 
            width={100}
            height={100}
            className='menu-img' src='\Pasta.jpeg' alt=''/>
            <h5 className=''>Pasta</h5>
    </div>
    </div>
    </div>
  )
}
