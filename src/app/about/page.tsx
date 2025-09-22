"use client";

import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { IoMdCheckmark } from "react-icons/io";
import { LuSprout } from "react-icons/lu";
import { GoCreditCard } from "react-icons/go";
import Image from "next/image";

const About = () => {
  return (
    <div className="transition-colors duration-300 bg-[#FAFAFA] dark:bg-[#1a121c] text-[#2A254B] dark:text-[#F8D7E3]">
      {/* Top Hero */}
      <section
        className="relative w-full h-[300px] md:h-[360px] flex items-center"
        style={{
          backgroundImage: `url('/about-hero.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-white/10 dark:from-black/30 dark:via-transparent"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl bg-white/80 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight mb-3 text-[#2A254B] dark:text-[#F8D7E3]">
              A brand built on the love of craftsmanship, quality and outstanding customer service
            </h2>
            <p className="text-sm md:text-base text-[#2A254B] dark:text-[#e8bfcf]">
              From a small London studio to a global label — we design, craft and deliver pieces made to last.
            </p>
            <div className="mt-6">
              <button className="inline-block px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-[#2A254B] font-semibold transition transform hover:-translate-y-0.5 shadow-sm">
                View our products
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2 bg-[#2A254B] dark:bg-[#F8D2E0] rounded-2xl p-10 text-white dark:text-[#2A254B] shadow-lg">
            <h3 className="text-2xl md:text-3xl font-semibold mb-4">It started with a small idea</h3>
            <p className="mb-6 text-base leading-relaxed">
              Our story began in a small South London studio in 2014. Simple goals: beautiful, honest design and craftsmanship that lasts.
            </p>
            <button className="px-6 py-3 rounded-xl bg-white text-[#2A254B] font-semibold hover:bg-gray-100 transition shadow">
              View collection
            </button>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/ysofa.png"
                alt="Studio sofa"
                width={700}
                height={480}
                className="object-cover w-full h-[360px] md:h-[420px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white/60 dark:bg-gray-900/40">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2 flex flex-col gap-4">
            <h3 className="text-2xl md:text-3xl font-semibold">Our service is personal — exquisitely so</h3>
            <p className="text-base leading-relaxed text-[#2A254B] dark:text-[#e8bfcf]">
              Handmade furniture, available to everyone. We obsess over materials, finishes and the small details that make a piece special.
            </p>
            <div className="mt-4">
              <button className="px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-[#2A254B] font-semibold transition shadow-sm">
                Get in touch
              </button>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/blacksofa.png"
                alt="Black sofa"
                width={700}
                height={480}
                className="object-cover w-full h-[360px] md:h-[420px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-14">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-10 text-[#2A254B] dark:text-[#F8D7E3]">
            What makes our brand different
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                Icon: TbTruckDelivery,
                title: "Next day as standard",
                desc: "Order before 3pm and get your order the next day",
              },
              {
                Icon: IoMdCheckmark,
                title: "Made by true artisans",
                desc: "Handmade goods crafted with passion",
              },
              {
                Icon: GoCreditCard,
                title: "Unbeatable prices",
                desc: "Excellent value for material and quality",
              },
              {
                Icon: LuSprout,
                title: "Recycled packaging",
                desc: "Reducing our environmental footprint",
              },
            ].map(({ Icon, title, desc }, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-md hover:translate-y-[-6px] hover:shadow-xl transition transform duration-300"
              >
                <div className="p-4 rounded-full bg-white/30 dark:bg-gray-700/30 mb-3">
                  <Icon className="text-3xl text-[#2A254B] dark:text-[#F8D7E3]" />
                </div>
                <h4 className="font-medium text-lg mb-2 text-[#2A254B] dark:text-[#F8D7E3]">{title}</h4>
                <p className="text-sm text-[#2A254B] dark:text-[#e8bfcf]">{desc}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <button className="px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-[#2A254B] font-semibold shadow-sm transition">
              View collection
            </button>
          </div>
        </div>
      </section>

      {/* Signup CTA */}
      <section
        className="relative py-20"
        style={{
          backgroundImage: `url('/bg1.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto bg-white/10 dark:bg-black/30 backdrop-blur-md rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-semibold mb-3">Stay updated on new offers</h3>
            <p className="mb-6 text-sm md:text-base">Subscribe to our newsletter for the latest updates</p>

            <div className="flex flex-col md:flex-row gap-3 justify-center items-center">
              <input
                type="email"
                placeholder="Your email"
                className="w-full md:w-[340px] p-3 rounded-xl border border-transparent focus:outline-none text-black"
              />
              <button className="px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-[#2A254B] font-semibold shadow-sm transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
