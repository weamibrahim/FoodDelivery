import React from "react";
import Header from "../../components/Header/Header";
import "./about.css";
export default function About() {
  return (
    <div className="about">
      <div className="about-header h-96">
        <div className="absolute w-screen overlay  h-full">
          <Header />
          <div className="text-white translate-y-full py-5">
            <h1 className="font-semibold text-3xl mb-3">About Us</h1>
            <p>OUR STORY FROM THE START</p>
          </div>
        </div>
      </div>

   <div className=" mt-10">
    <div className=" flex flex-col lg:flex-row justify-center items-center  gap-8 lg:p-10 px-5 ">
        <div className=" md:p-10">
          <img width={360} className="object-cover lg:w-80 md:w-screen" src="\Muschel-Spaghetti in Tomatensugo.jpeg" />
        </div>

        <div className="lg:w-1/2 text-start lg:text-start md:text-center ">
          <h2 className="font-semibold  text-2xl">Our Story</h2>
          <p className=" my-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          
        </div>
      </div>
      <div className=' m-auto h-screen '>
    <h2 className='mt-28 text-2xl font-semibold'>Meet Our Chefs</h2>
    <div className="p-10 flex flex-col items-center lg:flex-row md:flex-row justify-center gap-5 sm:m-auto">
      <div className="p-5 border border-orange-800 rounded-md sm:text-center">
        <img width={300} className="rounded-md" src="/chef1.jpeg"/>
        <div>
          <h2 className="lg:text-2xl md:text-xl sm:text-sm mt-5 text-orange-950">Thomas keller</h2>
        </div>
      </div>
      <div className="p-5 border border-orange-800 rounded-md">
        <img width={300} className="rounded-md" src="/chef2.jpeg"/>
        <div>
          <h2 className="lg:text-2xl md:text-xl sm:text-sm mt-5 text-orange-950">Elena Reygadas</h2>
        </div>
      </div>
      <div className="p-5 border border-orange-800 rounded-md">
        <img width={300} className="rounded-md" src="/chef3.jpeg"/>
        <div>
          <h2 className="lg:text-2xl md:text-xl sm:text-sm mt-5 text-orange-950">Neven Salem </h2>
        </div>
      </div>
    </div>
   </div>
      </div>

    </div>
  );
}
