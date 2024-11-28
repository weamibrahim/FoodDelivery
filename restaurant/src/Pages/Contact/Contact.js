import React, { useState } from "react";
import "./contact.css";
import Header from "../../components/Header/Header";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
export default function Contact() {
  const [x,setX]=useState(false)
  const handleSubmit=(e)=>{
    e.preventDefault()
    setX(true)
  }
  return (
    <div className="overflow-hidden">
      <div className="contact-header h-96 ">
        <div className="absolute w-screen overlay  h-full">
          <Header />
          <div className="text-white translate-y-full py-5">
            <h1 className="font-semibold text-3xl mb-3">Contact Us</h1>
          </div>
        </div>
      </div>
      <div className="mt-20 flex flex-col-reverse md:flex-row   gap-5 justify-center m-5  lg:overflow-hidden lg:h-screen lg:pt-16 " >
    <div className="lg:w-1/3 lg:h-4/5 md:h-4/5 md:w-1/2 md:overflow-hidden rounde-md  sm:h-full ">
    <div className="grid grid-flow-row xl:grid-flow-col xl:grid-rows-2 gap-5 lg:grid-flow-col lg:grid-rows-2 sm:grid-rows-1   text-center  ">
    
    <div className="bg-orange-200 p-5 rounded-md ">
          <h5 ><FaPhoneVolume className=" m-auto text-orange-950 text-2xl " /></h5>
          <p>Phone</p>
          <p>123 456 789</p>
         
          
        </div>
        <div className="bg-orange-200 p-5 rounded-md">
          <h5 ><MdEmail className=" m-auto text-orange-950 text-2xl" /></h5>
          <p>Email</p>
          <p>rattouli@gmail.com</p>
         
          
        </div>
       
        <div className="bg-orange-200 p-5 rounded-md">
          <h5 ><IoLogoWhatsapp className=" m-auto text-orange-950 text-2xl" /></h5>
          <p>WhatsApp</p>
          <p>123 456 789</p>
         
          
        </div>
        <div className="bg-orange-200 p-5 rounded-md">
          <h5 ><IoLocation className=" m-auto text-orange-950 text-2xl" /></h5>
          <p>Location</p>
          <p>52,safa street,cairo </p>
         
          
        </div>
        
     </div>
     <div>
 <img src="/map.jpeg" className="rounded-md mt-5" alt=""/>
     </div>
    </div>
        <div className="lg:w-1/3 md:w-1/2 lg:h-full md:h-3/4 ">
          <div class="w-full h-4/5  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
            <form className="space-y-6 text-start " action="#" onSubmit={handleSubmit}>
              <h5 class="text-xl font-medium text-orange-700">
                Let us know your opinion
              </h5>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-orange-700"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="text"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                  placeholder="Name"
                  required
                />
              </div>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-orange-700"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-orange-700"
                >
                  Your message
                </label>
                <textarea
                  placeholder="your message"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5 "
                  required
                ></textarea>
              </div>
              <div class="flex items-start">
                <div class="flex items-start"></div>
              </div>
              <button
                type="submit"
                class="w-full text-white bg-orange-800   font-medium rounded-lg text-sm px-5 py-2.5 text-center   "
      
            >
                submit
             
              </button>
              
            </form>
            {x&&<div className="pt-1 text-green-700"> Message sent successfuly</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
