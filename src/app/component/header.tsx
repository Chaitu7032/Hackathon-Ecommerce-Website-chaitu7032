"use client";

import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="animate-fade-in sticky top-0 z-50 bg-white/70 dark:bg-[#2e1f2f]/70 backdrop-blur-md shadow-md transition-all duration-300">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6 py-4">
        {/* Search Icon */}
        <span className="text-gray-900 dark:text-pink-100 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer">
          <CiSearch size={24} />
        </span>

        {/* Logo */}
        <h1 className="text-lg md:text-xl font-bold text-[#22202E] dark:text-pink-100">
          Avion
        </h1>

        {/* Cart & Profile Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="/shopping"
            className="text-gray-900 dark:text-pink-100 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <IoCartOutline size={24} />
          </a>
          <span className="text-gray-900 dark:text-pink-100 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            <FaRegUserCircle size={24} />
          </span>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="block md:hidden text-gray-900 dark:text-pink-100 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <GiHamburgerMenu size={24} />
        </button>
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex border-t border-gray-200 dark:border-pink-400/30">
        <div className="container mx-auto px-6 py-3 flex justify-center space-x-6 text-gray-600 dark:text-pink-100">
          {[
            { href: "/", label: "Plant Pots" },
            { href: "/homepage", label: "Ceramics" },
            { href: "/productlist", label: "Tables" },
            { href: "/about", label: "Chairs" },
            { href: "/product", label: "Crockery" },
            { href: "/shopping", label: "Tableware" },
            { href: "/uiux", label: "Cutlery" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="hover:text-blue-500 dark:hover:text-pink-300 transition font-medium"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/70 dark:bg-[#3a243f]/70 backdrop-blur-md shadow-lg transition-all duration-300 animate-fade-in-up">
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-2 text-gray-600 dark:text-pink-100">
            {[
              { href: "/", label: "Plant Pots" },
              { href: "/homepage", label: "Ceramics" },
              { href: "/productlist", label: "Tables" },
              { href: "/about", label: "Chairs" },
              { href: "/product", label: "Crockery" },
              { href: "/shopping", label: "Tableware" },
              { href: "/uiux", label: "Cutlery" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="block p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
