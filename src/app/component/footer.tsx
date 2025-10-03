"use client";

import React, { useState } from "react";
import { RiInstagramLine } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { SlSocialSkype } from "react-icons/sl";
import { SlSocialTwitter } from "react-icons/sl";
import { SlSocialPintarest } from "react-icons/sl";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError("");
    setShowSuccess(false);
  };

  const handleSubmit = () => {
    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Mock successful submission
    setShowSuccess(true);
    setEmail("");
    setEmailError("");
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <div>
      {/* Footer Section */}
      <footer className="body-font w-full bg-[#2A254B] text-[#FFFFFF]">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col-reverse md:flex-row md:text-left text-center order-first gap-2">
            {/* Menu Column */}
            <div className="lg:w-1/4 md:w-1/3 w-full px-4">
              <h2 className="font-medium tracking-widest text-lg mb-3">Menu</h2>
              <nav className="list-none mb-10 space-y-2">
                <li><a href="/product" className="hover:text-gray-400">New arrivals</a></li>
                <li><span aria-disabled="true" className="cursor-not-allowed text-gray-400">Recently viewed</span></li>
                <li><span aria-disabled="true" className="cursor-not-allowed text-gray-400">Popular this week</span></li>
                <li><a href="/productlist" className="hover:text-gray-400">All products</a></li>
              </nav>
            </div>

            {/* Categories Column */}
            <div className="lg:w-1/4 md:w-1/3 w-full px-4">
              <h2 className="font-medium tracking-widest text-lg mb-3">Categories</h2>
              <nav className="list-none mb-10 space-y-2">
                <li><a href="/category/plant-pots" className="hover:text-gray-400">Plant Pots</a></li>
                <li><a href="/category/ceramics" className="hover:text-gray-400">Ceramics</a></li>
                <li><a href="/category/tables" className="hover:text-gray-400">Tables</a></li>
                <li><a href="/category/chairs" className="hover:text-gray-400">Chairs</a></li>
                <li><a href="/category/crockery" className="hover:text-gray-400">Crockery</a></li>
              </nav>
            </div>

            {/* Company Column */}
            <div className="lg:w-1/4 md:w-1/3 w-full px-4">
              <h2 className="font-medium tracking-widest text-lg mb-3">Our Company</h2>
              <nav className="list-none mb-10 space-y-2">
                <li><a href="/about" className="hover:text-gray-400">About us</a></li>
                <li><span aria-disabled="true" className="cursor-not-allowed text-gray-400">Vacancies</span></li>
                <li><a href="/contact" className="hover:text-gray-400">Contact us</a></li>
                <li><span aria-disabled="true" className="cursor-not-allowed text-gray-400">Privacy</span></li>
                <li><span aria-disabled="true" className="cursor-not-allowed text-gray-400">Returns policy</span></li>
              </nav>
            </div>

            {/* Mailing List Column (Right side) */}
            <div className="lg:w-1/2 md:w-full w-full px-4">
              <h2 className="font-medium tracking-widest text-lg mb-3 font-[Clash Display] lg:ml-10">Join Our Mailing List</h2>
              <div className="flex flex-col items-center">
                <div className="flex flex-wrap justify-center space-x-2 w-full">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={handleEmailChange}
                    className={`w-full sm:w-96 p-3 text-lg bg-[#dedbdb] mb-2 sm:mb-0 md:w-full lg:w-80 text-black ${emailError ? 'border-2 border-red-500' : ''}`}
                    style={{ height: '50px' }}
                  />
                  <button 
                    onClick={handleSubmit}
                    className="bg-[#FAFAFA] text-[#2A254B] w-full sm:w-[90px] p-3 sm:p-1 hover:bg-[#dedbdb] sm:mt-2"
                  >
                    Sign Up
                  </button>
                </div>
                {emailError && (
                  <p className="text-red-400 text-sm mt-1 w-full text-left lg:ml-10">{emailError}</p>
                )}
                {showSuccess && (
  <p className="text-green-400 text-sm mt-2 font-medium tracking-wide w-full text-left lg:ml-10">
    ✓ Thank you for subscribing to our mailing list!
  </p>
)}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="bg-[#2A254B] py-4">
          <div className="container mx-auto flex justify-between items-center">
            <p className="text-sm sm:ml-10">© Copyright {new Date().getFullYear()} MahamBabar (GIAIC)</p>
            <div className="flex space-x-4 text-2xl sm:mr-10 sm:space-x-2 ">
              <a href="#" className="hover:text-gray-400"><FaFacebookSquare /></a>
              <a href="#" className="hover:text-gray-400"><RiInstagramLine /></a>
              <a href="#" className="hover:text-gray-400"><SlSocialSkype /></a>
              <a href="#" className="hover:text-gray-400"><SlSocialTwitter /></a>
              <a href="#" className="hover:text-gray-400"><FaLinkedin /></a>
              <a href="#" className="hover:text-gray-400"><SlSocialPintarest /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
