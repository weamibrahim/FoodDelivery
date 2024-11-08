import React from "react";
import Hero from "../components/Hero/Hero";
import TopDishes from "../components/Top-dishes/TopDishes";
import WhyUs from "../components/why-us/WhyUs";
import Reviews from "../components/Reviews/Reviews";


export default function Home() {
  return (
    <div>
      <Hero />
      {/* <Menu /> */}
     <div id="top" > <TopDishes /></div>
      <WhyUs />
      <Reviews />

     
    </div>
  );
}
