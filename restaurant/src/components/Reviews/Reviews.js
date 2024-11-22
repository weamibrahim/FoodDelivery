import React, { useRef } from "react";
import "./reviews.css";
import { motion } from "framer-motion";

export default function Reviews() {
  const scrollRef = useRef(null);

  return (
    <div ref={scrollRef} style={{ overflow: "hidden" }}>
      <motion.div
        className="container mt-16 p-5 min-h-screen m-auto"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="font-semibold text-2xl my-10 title text-orange-950">What our customers say?</h2>

        <div className="grid mb-8 gap-3 rounded-lg shadow-sm lg:grid-cols-4 md:mb-12 md:grid-cols-2">
          <figure className="flex flex-col bg-orange-100 items-center justify-center p-8 text-center border border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg">
            <blockquote className="max-w-2xl mx-auto mb-4 text-gray-600">
              <h3 className="text-lg font-semibold text-gray-900">Fast and Reliable!</h3>
              <p className="my-4">
                "The delivery was on time, and the food was still hot. I couldn’t ask for better service. Highly recommended!"
              </p>
            </blockquote>
            <figcaption className="flex items-center justify-center">
              <img
                className="rounded-full w-9 h-9"
                src="https://randomuser.me/api/portraits/men/45.jpg"
                alt="profile"
              />
              <div className="space-y-0.5 font-medium text-left rtl:text-right ms-3">
                <div>Ahmed Saad</div>
                <div className="text-sm text-gray-600">Customer from Cairo</div>
              </div>
            </figcaption>
          </figure>

          <figure className="flex flex-col items-center bg-orange-100 justify-center p-8 text-center md:rounded-se-lg">
            <blockquote className="max-w-2xl mx-auto mb-4 text-gray-600 lg:mb-8">
              <h3 className="text-lg font-semibold text-gray-900">Delicious food, great service</h3>
              <p className="my-4">
                "The variety on the app is amazing. I’ve ordered from five different restaurants, and each time it was perfect!"
              </p>
            </blockquote>
            <figcaption className="flex items-center justify-center">
              <img
                className="rounded-full w-9 h-9"
                src="https://randomuser.me/api/portraits/women/33.jpg"
                alt="profile"
              />
              <div className="space-y-0.5 font-medium text-left rtl:text-right ms-3">
                <div>Mariam Hassan</div>
                <div className="text-sm text-gray-600">Customer from Alexandria</div>
              </div>
            </figcaption>
          </figure>

          <figure className="flex flex-col items-center bg-orange-100 justify-center p-8 text-center md:rounded-es-lg md:border-b-0">
            <blockquote className="max-w-2xl mx-auto mb-4 lg:mb-8 text-gray-600">
              <h3 className="text-lg font-semibold text-gray-900">Affordable and Tasty!</h3>
              <p className="my-4">
                "I love how easy it is to find deals on the app. The combo meals are a lifesaver for family dinners!"
              </p>
            </blockquote>
            <figcaption className="flex items-center justify-center">
              <img
                className="rounded-full w-9 h-9"
                src="https://randomuser.me/api/portraits/men/60.jpg"
                alt="profile"
              />
              <div className="space-y-0.5 font-medium text-left rtl:text-right ms-3">
                <div>Omar Khalil</div>
                <div className="text-sm text-gray-600">Customer from Giza</div>
              </div>
            </figcaption>
          </figure>

          <figure className="flex flex-col items-center bg-orange-100 justify-center p-8 text-center rounded-b-lg md:rounded-se-lg">
            <blockquote className="max-w-2xl mx-auto mb-4 lg:mb-8 text-gray-600">
              <h3 className="text-lg font-semibold text-gray-900">Perfect for late-night cravings</h3>
              <p className="my-4">
                "I ordered at midnight, and the food arrived fresh and hot. This app is my go-to for late-night snacks!"
              </p>
            </blockquote>
            <figcaption className="flex items-center justify-center">
              <img
                className="rounded-full w-9 h-9"
                src="https://randomuser.me/api/portraits/women/48.jpg"
                alt="profile"
              />
              <div className="space-y-0.5 font-medium text-left rtl:text-right ms-3">
                <div>Hala Mostafa</div>
                <div className="text-sm text-gray-600">Customer from Mansoura</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </motion.div>
    </div>
  );
}
