import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { IoMdCheckmark } from "react-icons/io";
import { LuSprout } from "react-icons/lu";
import { GoCreditCard } from "react-icons/go";

const Card1 = () => {
  return (
    <section className="container mx-auto px-6 md:px-11 lg:mt-8 animate-fade-in-up">
      <h3 className="text-3xl font-bold text-center text-[#2A254B] dark:text-[#5c1a32] mb-10">
        What makes our brand different
      </h3>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:p-7 sm:ml-8">
        {/* Card Template */}
        {[
          {
            Icon: TbTruckDelivery,
            title: "Next day as standard",
            desc: "Order before 3pm and get your order the next day as standard.",
          },
          {
            Icon: IoMdCheckmark,
            title: "Made by true artisans",
            desc: "Handmade crafted goods made with real passion and craftsmanship.",
          },
          {
            Icon: GoCreditCard,
            title: "Unbeatable prices",
            desc: "For our materials and quality you won’t find better prices anywhere.",
          },
          {
            Icon: LuSprout,
            title: "Recycled packaging",
            desc: "We ensure minimal environmental impact.",
          },
        ].map(({ Icon, title, desc }, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center p-6 rounded-2xl
                       bg-white/70 dark:bg-[#ffeef2]/70 backdrop-blur-md
                       hover:translate-y-[-6px] hover:shadow-xl transition-transform transition-shadow duration-300"
          >
            <div className="p-4 rounded-full bg-white/30 dark:bg-gray-800/40 backdrop-blur-sm mb-3">
              <Icon className="text-4xl text-[#2A254B] dark:text-[#5c1a32]" />
            </div>

            <h4 className="mt-2 font-medium text-lg mb-2 text-[#2A254B] dark:text-[#5c1a32]">
              {title}
            </h4>

            <p className="text-sm text-[#2A254B] dark:text-[#5c1a32]">{desc}</p>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="flex justify-center mt-8">
        <button
          className="p-4 w-[170px] h-[56px] text-[#2A254B] dark:text-[#5c1a32]
                     bg-yellow-400 hover:bg-yellow-500 font-semibold rounded-xl
                     transition transform hover:-translate-y-1 shadow-sm"
        >
          View collection
        </button>
      </div>
    </section>
  );
};

export default Card1;
