"use client";

import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="container mx-auto px-6 md:px-11 mt-10 animate-fade-in-up">
      <div className="w-full max-w-[1280px] mx-auto">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between">
          {/* Left Content */}
          <div className="md:w-1/2 text-left space-y-6 sm:px-4 sm:py-6">
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2A254B] dark:text-[#F8D7E3] sm:mb-4 lg:mb-16 leading-snug">
              The furniture brand for the future&apos;s lifestyle, with timeless designs
            </h2>

            {/* Paragraph */}
            <p className="text-lg md:text-xl text-[#2A254B] dark:text-[#e8bfcf] leading-relaxed sm:mb-6">
              A new era in eco-friendly furniture with Avelon, the French luxury retail brand featuring elegant fonts, tasteful colors, and a stunning digital showcase built with modern technologies.
            </p>

            {/* Button */}
            <div className="sm:mt-4">
              <button className="p-4 w-[170px] h-[56px] rounded-xl text-[#2A254B] dark:text-[#1a121c] bg-gray-200 dark:bg-[#F8D7E3] hover:bg-[#2A254B] hover:text-white dark:hover:bg-white dark:hover:text-[#1a121c] transition-all duration-300 ease-in-out text-lg font-medium shadow-md">
                View Collection
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
            <Image
              src="/chair.png"
              alt="Chair"
              width={500}
              height={500}
              className="w-full max-w-[400px] md:max-w-[500px] h-auto object-cover drop-shadow-xl rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
