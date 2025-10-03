import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { IoMdCheckmark } from "react-icons/io";
import { LuSprout } from "react-icons/lu";
import { GoCreditCard } from "react-icons/go";
import Image from "next/image";

const About = () => {
  return (
    <div className="dark:bg-[#F8EAFB] dark:text-[#2A254B] transition-colors duration-500">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center w-full h-[277px] bg-[#FFFFFF] dark:bg-[#FCE8F5]"
  style={{ backgroundImage: "url('/bg1.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#FFFFFF] dark:bg-[#FCE8F5] w-full sm:w-[80%] md:w-[70%] lg:w-[60%] h-full mt-[52px] ml-6 sm:ml-12 md:ml-16 lg:ml-24"></div>
        <div className="container mx-auto px-4 py-24 w-full flex justify-between items-center relative text-center text-[#2A254B] dark:text-[#2A254B]">
          <div className="text-left w-3/4 p-4">
            <h2 className="text-3xl font-[300] ml-10 mb-2">
              A brand built on the love of craftmanship
              <br />
              quality and outstanding customer service
            </h2>
          </div>
          <div className="w-full flex justify-center items-center mx-auto">
            <button className="bg-[#F9F9F9] dark:bg-[#F8D2E0] w-full sm:w-[192px] h-[56px] text-[#2A254B] dark:text-[#2A254B] p-4 text-lg hover:bg-black hover:text-white rounded-lg">
              View our products
            </button>
          </div>
        </div>
      </section>

      {/* Sofa Section */}
      <section className="w-full min-h-[603px] bg-[#FAFAFA] dark:bg-[#FDE8F5] text-[#2A254B]">
        <div className="container mx-auto flex flex-col md:flex-row lg:flex-row px-5 py-24 items-center gap-10">
          <div className="bg-[#2A254B] dark:bg-[#F8D2E0] lg:w-1/2 md:w-1/2 w-full h-[460px] flex justify-start items-start p-14">
            <div className="flex flex-col justify-between h-full text-left text-[#FAFAFA] dark:text-[#2A254B]">
              <div>
                <h2 className="text-2xl sm:text-3xl font-normal leading-snug mb-4">
                  It started with a small idea
                </h2>
                <p className="text-[16px] font-[400] sm:text-lg leading-relaxed mb-6">
                  A global brand with local beginnings, our story began in a
                  small studio in South London in early 2014
                </p>
              </div>
              <button className="p-4 w-[170px] h-[56px] text-[#2A254B] bg-gray-200 dark:bg-white dark:text-[#2A254B] border-0 focus:outline-none hover:bg-black hover:text-white text-lg self-start">
                View collection
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 md:w-1/2 w-full flex justify-center items-center">
            <Image
              className="object-cover rounded-lg max-w-full h-auto"
              alt="hero"
              src="/ysofa.png"
              width={500}
              height={300}
            />
          </div>
        </div>
      </section>

      {/* Second Card */}
      <section className="w-full min-h-[603px] bg-[#FAFAFA] dark:bg-[#FDE8F5] text-[#2A254B]">
        <div className="container mx-auto flex px-5 py-24 flex-col md:flex-row-reverse lg:flex-row-reverse items-center gap-10">
          <div className="flex flex-col justify-center items-start lg:w-1/2 md:w-1/2 w-full">
            <h2 className="text-2xl sm:text-3xl font-normal leading-snug mb-6">
              Our service isn&apos;t just personal; it&apos;s actually hyper personally exquisite
            </h2>
            <p className="text-[16px] font-[400] sm:text-lg leading-relaxed mb-4">
              When we started Avion the idea was simple: Make high-quality furniture affordable and available for the mass market
            </p>
            <p className="text-[16px] font-[400] sm:text-lg leading-relaxed mb-4">
              Handmade and lovingly crafted furniture and homeware is what we live, breathe, and design...
            </p>
            <button className="p-4 w-[170px] h-[56px] text-[#2A254B] mt-2 bg-gray-200 dark:bg-white dark:text-[#2A254B] border-0 focus:outline-none hover:bg-black hover:text-white text-lg">
              Get in touch
            </button>
          </div>
          <div className="lg:w-1/2 md:w-1/2 w-full flex justify-center items-center">
            <Image
              className="object-cover rounded-lg max-w-full h-auto"
              alt="hero"
              src="/blacksofa.png"
              width={500}
              height={300}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div className="container mx-auto px-6 md:px-11">
        <h3 className="text-3xl font-bold text-center text-[#2A254B] dark:text-[#2A254B] mb-10">
          What makes our brand different
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:p-7 sm:ml-8">
          {[{
            Icon: TbTruckDelivery,
            title: "Next day as standard",
            desc: "Order before 3pm and get your order the next day"
          }, {
            Icon: IoMdCheckmark,
            title: "Made by true artisans",
            desc: "Handmade crafted goods made with passion"
          }, {
            Icon: GoCreditCard,
            title: "Unbeatable prices",
            desc: "For our materials, you won’t find better prices"
          }, {
            Icon: LuSprout,
            title: "Recycled packaging",
            desc: "We ensure minimal environmental impact"
          }].map(({ Icon, title, desc }, idx) => (
            <div key={idx} className="text-center flex flex-col items-center bg-white dark:bg-[#F3C8D8] p-4 hover:bg-gray-200 dark:hover:bg-[#F4BED6] transition-all duration-300 ease-in-out rounded-lg">
              <Icon className="text-4xl text-[#2A254B]" />
              <h4 className="mt-3 font-[400] text-lg mb-2 text-[#2A254B]">{title}</h4>
              <p className="text-center text-[#2A254B]">{desc}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button className="p-4 w-[170px] h-[56px] text-[#2A254B] bg-gray-200 dark:bg-white dark:text-[#2A254B] border-0 focus:outline-none hover:bg-black hover:text-white text-lg">
            View collection
          </button>
        </div>
      </div>

      {/* Signup Section */}
      <section
        className="relative bg-cover bg-center w-full h-[481px] sm:h-[550px]"
        style={{
          backgroundImage: "url('bg1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 py-24 flex justify-center items-center">
          <div className="text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-normal leading-snug mb-6">
              Stay updated on new offers
            </h2>
            <p className="text-lg mb-6">
              Subscribe to our newsletter for the latest updates
            </p>
            <div className="flex flex-col gap-4 justify-center items-center md:flex-row">
              <input
                type="text"
                placeholder="Your email"
                className="p-4 w-full max-w-[350px] text-[#2A254B] bg-[#F9F9F9] dark:bg-white dark:text-[#2A254B] border border-[#CCCCCC] rounded-lg"
              />
              <button
                className="p-4 w-full max-w-[170px] text-[#2A254B] bg-gray-200 dark:bg-white dark:text-[#2A254B] hover:bg-black hover:text-white text-lg rounded-lg"
              >
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
