import React from "react";
import "./Whyus.css";
import { Link } from "react-router-dom";
export default function WhyUs() {
  return (
    <div className=" whyus min-h-screen flex flex-col lg:flex-row justify-center items-center  gap-8 lg:p-10 px-5 ">
      <div className="">
        <img width={360} className="object-cover" src="\download (7).jpeg"  alt=""/>
      </div>

      <div className="lg:w-1/2 text-start lg:text-start md:text-center ">
        <h2 className="font-semibold  text-3xl title">
          We are more than multiple services
        </h2>
        <p className=" my-8">
        We have 80 years of collective experience with the added benefit of objectivity.
We have been in your shoes, have been successful, have learned from mistakes (ours and others), and have a passion for the industry.
We have trusted resources for every imaginable need: designers, contractors, point of sales systems, kitchen equipment, software, glassware and everything in between.
We understand real budgets and real time lines.
Our vast resource network, and each of our team members’ unique set of skills allows for a “one stop shop” approach.
You can hire the entire group, or just one or two of our consultants depending on your needs.

        </p>
       <Link to={"/about"}> <button className="bg-orange-700 text-white p-3 w-1/3 rounded-md my-5">About Us</button></Link>
      </div>
      
    </div>
  );
}
