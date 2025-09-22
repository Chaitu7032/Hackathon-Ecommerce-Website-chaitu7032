"use client";

import React from "react";
import Image from "next/image";

const ProductTwo = () => {
  return (
    <div className="w-full h-auto bg-[#FAFAFA] dark:bg-[#1a121c] mt-11 transition-all animate-fade-in-up">
      <section className="py-16">
        <div className="container mx-auto px-6">
          {/* Heading */}
          <h2 className="text-3xl font-bold text-center text-[#2A254B] dark:text-[#F8D7E3] mb-10">
            Our popular products
          </h2>

          {/* Product Grid */}
          <div className="flex flex-wrap justify-center gap-10">
            {[
              { img: "/lsofa.png", name: "The Popular Suede Sofa", price: "£980" },
              { img: "/chairb.png", name: "The Dandy Chair", price: "£350" },
              { img: "/botal.png", name: "Rustic Vase Set", price: "£250" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#2e1f2f] w-full md:w-full lg:w-[30%] h-auto shadow-lg p-4 rounded-xl hover:scale-105 transform transition-all duration-300"
              >
                <Image
                  src={item.img}
                  alt={item.name}
                  width={500}
                  height={375}
                  className="w-full h-[375px] object-cover mb-4 rounded-lg drop-shadow-md"
                />
                <h4 className="text-lg font-semibold text-[#2A254B] dark:text-[#F8D7E3] text-center">
                  {item.name}
                </h4>
                <p className="text-[#2A254B] dark:text-[#F8D7E3] text-center">{item.price}</p>
              </div>
            ))}
          </div>

          {/* Centered Button */}
          <div className="flex justify-center mt-8">
            <button className="p-4 w-[170px] h-[56px] text-[#2A254B] dark:text-[#1a121c] bg-gray-200 dark:bg-[#F8D7E3] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-[#1a121c] rounded-xl text-lg font-medium shadow-md transition-all duration-300">
              View collection
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductTwo;
