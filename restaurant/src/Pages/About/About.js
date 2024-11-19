import React from "react";
import Header from "../../components/Header/Header";
import "./about.css";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="about ">
      {/* Header Section */}
      <div className="about-header h-96 relative overflow-hidden">
        <div className="absolute w-full overlay h-full ">
          <Header />
          <div className="text-white py-5 flex flex-col items-center justify-center h-full z-1">
            <h1 className="font-semibold text-3xl mb-3">About Us</h1>
            <p>OUR STORY FROM THE START</p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="mt-10">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:p-10 px-5 min-h-screen">
          <div className="md:p-10">
            <img
              width={360}
              className="object-cover lg:w-80 md:w-screen"
              src="/Muschel-Spaghetti in Tomatensugo.jpeg"
              alt="Delicious Spaghetti"
            />
          </div>

          <div className="lg:w-1/2 text-start md:text-center">
            <h2 className="font-semibold text-start text-2xl text-orange-950">Our Story</h2>
            <motion.p
             className="my-8 text-start"
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5 }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </motion.p>
          </div>
        </div>

        {/* Meet Our Chefs Section */}
        <div className="flex flex-col items-center justify-center min-h-screen">
  <motion.h2
    className="mt-10 text-3xl font-bold text-orange-950"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    Meet Our Chefs
  </motion.h2>
  <div className="p-8 flex flex-wrap justify-center gap-8">
    {[
      {
        name: "Thomas Keller",
        img: "/chef1.jpeg",
        description: "A Michelin-starred chef known for his mastery of French cuisine.",
        contact: "mailto:thomas.keller@example.com",
      },
      {
        name: "Elena Reygadas",
        img: "/chef2.jpeg",
        description: "Award-winning chef and advocate for sustainable cooking.",
        contact: "mailto:elena.reygadas@example.com",
      },
      {
        name: "Neven Salem",
        img: "/chef3.jpeg",
        description: "Renowned for modernizing traditional Egyptian recipes.",
        contact: "mailto:neven.salem@example.com",
      },
    ].map((chef, index) => (
      <motion.article
        key={index}
        className="w-72 p-5 border border-orange-800 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
      >
        <img
          width={300}
          className="w-full rounded-lg"
          src={chef.img}
          alt={`Photo of Chef ${chef.name}`}
        />
        <h3 className="mt-4 text-center text-xl font-semibold text-orange-950">
          {chef.name}
        </h3>
        <p className="mt-2 text-center text-sm text-gray-600">
          {chef.description}
        </p>
        <div className="mt-4 flex justify-center">
          <a
            href={chef.contact}
            className="text-orange-800 hover:text-orange-600 transition-colors"
            aria-label={`Contact ${chef.name}`}
          >
            <i className="fas fa-envelope text-xl"></i>
          </a>
        </div>
      </motion.article>
    ))}
  </div>
</div>

      </div>
    </div>
  );
}
