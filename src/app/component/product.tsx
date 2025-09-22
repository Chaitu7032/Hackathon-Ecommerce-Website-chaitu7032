"use client";

import React from "react";
import Image from "next/image";

const Product = () => {
  return (
    <div className="w-full h-auto bg-[#FAFAFA] dark:bg-[#1a121c] mt-11 transition-all animate-fade-in-up">
      {/* Product Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {/* Centered Heading */}
          <h3 className="text-3xl font-bold text-center text-[#2A254B] dark:text-[#F8D7E3] mb-10">
            New Ceramics
          </h3>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
            {[
              { img: "/chair.png", title: "The Dandy Chair", price: "£250" },
              { img: "/vase.png", title: "The Lucky Lamp", price: "£399" },
              { img: "/botal.png", title: "Rustic Vase Set", price: "£155" },
              { img: "/lamp.png", title: "The Stanley Table", price: "£125" },
            ].map((product, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#2e1f2f] shadow-lg p-4 rounded-xl hover:scale-105 transform transition-all duration-300 ease-in-out"
              >
                <Image
                  src={product.img}
                  alt={product.title}
                  width={500}
                  height={375}
                  className="w-full h-[375px] object-cover mb-4 rounded-lg drop-shadow-md"
                />
                <h4 className="text-lg font-semibold text-[#2A254B] dark:text-[#F8D7E3] text-center">
                  {product.title}
                </h4>
                <p className="text-[#2A254B] dark:text-[#F8D7E3] text-center">{product.price}</p>
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

export default Product;
