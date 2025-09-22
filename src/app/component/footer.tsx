"use client";

import React, { useState } from "react";
import { RiInstagramLine } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { SlSocialSkype, SlSocialTwitter, SlSocialPintarest } from "react-icons/sl";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError("");
    setShowSuccess(false);
  };

  const handleSubmit = () => {
    if (!email) return setEmailError("Email is required");
    if (!validateEmail(email)) return setEmailError("Please enter a valid email address");

    setShowSuccess(true);
    setEmail("");
    setEmailError("");
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <footer className="animate-fade-in-up w-full bg-white/30 dark:bg-gray-900/50 backdrop-blur-md text-[#2A254B] dark:text-[#FAFAFA] mt-12">
      <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10 lg:gap-4">
        {/* Menu */}
        <div className="flex-1 space-y-4">
          <h2 className="font-semibold tracking-widest text-lg">Menu</h2>
          <ul className="space-y-2">
            <li><a href="/product" className="hover:text-blue-500 transition">New arrivals</a></li>
            <li><a className="hover:text-blue-500 transition">Recently viewed</a></li>
            <li><a className="hover:text-blue-500 transition">Popular this week</a></li>
            <li><a href="/productlist" className="hover:text-blue-500 transition">All products</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="flex-1 space-y-4">
          <h2 className="font-semibold tracking-widest text-lg">Categories</h2>
          <ul className="space-y-2">
            <li><a href="/uiux" className="hover:text-blue-500 transition">Furniture</a></li>
            <li><a href="/homepage" className="hover:text-blue-500 transition">Homeware</a></li>
            <li><a href="/" className="hover:text-blue-500 transition">Plant pots</a></li>
            <li><a href="/about" className="hover:text-blue-500 transition">Chairs</a></li>
            <li><a href="/product" className="hover:text-blue-500 transition">Crockery</a></li>
          </ul>
        </div>

        {/* Company */}
        <div className="flex-1 space-y-4">
          <h2 className="font-semibold tracking-widest text-lg">Our Company</h2>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-blue-500 transition">About us</a></li>
            <li><a className="hover:text-blue-500 transition">Vacancies</a></li>
            <li><a className="hover:text-blue-500 transition">Contact us</a></li>
            <li><a className="hover:text-blue-500 transition">Privacy</a></li>
            <li><a className="hover:text-blue-500 transition">Returns policy</a></li>
          </ul>
        </div>

        {/* Mailing List */}
        <div className="flex-1 space-y-4">
          <h2 className="font-semibold tracking-widest text-lg">Join Our Mailing List</h2>
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2 w-full">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={handleEmailChange}
                className={`flex-1 p-3 rounded-xl text-black dark:text-[#2A254B] bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm border ${
                  emailError ? "border-red-500" : "border-transparent"
                } transition`}
              />
              <button
                onClick={handleSubmit}
                className="px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-[#2A254B] font-semibold transition transform hover:-translate-y-1"
              >
                Sign Up
              </button>
            </div>
            {emailError && <p className="text-red-400 text-sm">{emailError}</p>}
            {showSuccess && (
              <p className="text-green-400 text-sm font-medium tracking-wide">
                ✓ Thank you for subscribing!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-white/20 dark:bg-gray-800/40 backdrop-blur-sm py-4 mt-6">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm">&copy; 2024 MahamBabar (GIAIC)</p>
          <div className="flex space-x-4 text-2xl">
            <a href="#" className="hover:text-blue-500 transition"><FaFacebookSquare /></a>
            <a href="#" className="hover:text-blue-500 transition"><RiInstagramLine /></a>
            <a href="#" className="hover:text-blue-500 transition"><SlSocialSkype /></a>
            <a href="#" className="hover:text-blue-500 transition"><SlSocialTwitter /></a>
            <a href="#" className="hover:text-blue-500 transition"><FaLinkedin /></a>
            <a href="#" className="hover:text-blue-500 transition"><SlSocialPintarest /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
