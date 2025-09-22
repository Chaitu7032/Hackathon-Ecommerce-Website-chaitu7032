"use client";

import React from "react";
import Image from "next/image";

const CardLast = () => {
  return (
    <section className="w-full min-h-[603px] bg-[#FAFAFA] dark:bg-[#1a121c] text-[#2A254B] dark:text-[#F8D7E3] transition-all animate-fade-in-up">
      <div className="container mx-auto px-5 py-24 flex flex-col md:flex-row items-center gap-10">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
          <Image
            src="/sofa.png"
            alt="sofa"
            width={600}
            height={400}
            className="object-cover rounded-lg max-w-full h-auto drop-shadow-xl transition-all"
          />
        </div>

        {/* Text Section */}
        <div className="flex flex-col justify-center items-start w-full md:w-1/2 space-y-5 px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold leading-snug text-[#2A254B] dark:text-[#F8D7E3]">
            From a studio in London to a global brand with over 400 outlets
          </h2>
          <p className="text-[16px] sm:text-lg leading-relaxed font-normal text-[#2A254B] dark:text-[#e8bfcf]">
            When we started Avion the idea was simple. Make high-quality furniture affordable and available for the mass market.
          </p>
          <p className="text-[16px] sm:text-lg leading-relaxed font-normal text-[#2A254B] dark:text-[#e8bfcf]">
            Handmade, and lovingly crafted furniture and homeware is what we live, breathe, and design — so our Chelsea boutique became the hotbed for the London interior design community.
          </p>

          {/* Button */}
          <button className="mt-6 px-6 py-3 text-[#2A254B] dark:text-[#1a121c] bg-gray-200 dark:bg-[#F8D7E3] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-[#1a121c] transition-all duration-300 rounded-xl text-lg font-medium shadow-md">
            View collection
          </button>
        </div>
      </div>
    </section>
  );
};

export default CardLast;
