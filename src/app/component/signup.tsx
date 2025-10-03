'use client'
import React, { useState, useEffect } from 'react';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      setSuccess('');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      setSuccess('');
      return;
    }
    setError('');
    setSuccess('Thank you for signing up!');
    setEmail('');
  };

  // Auto remove success message after 5 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 5000);
      return () => clearTimeout(timer); // cleanup on unmount or re-render
    }
  }, [success]);

  return (
    <section
      className="relative bg-cover bg-center w-full h-[481px] md:h-[550px] lg:h-[550px]"
      style={{ backgroundImage: "url('/signbg.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white dark:bg-[#ffe4e6] opacity-60 md:opacity-80 lg:opacity-80"></div>

      {/* Content */}
      <div className="container mx-auto px-4 py-24 md:py-32 lg:py-32 relative text-center text-[#2A254B] dark:text-[#5c1a32]">
        <h2 className="text-3xl font-semibold mb-2 md:text-4xl lg:text-4xl">
          Join the club and get the benefits
        </h2>
        <p className="text-lg mb-6 md:text-xl lg:text-xl">
          Sign up for our newsletter and receive exclusive offers on new ranges, sales, pop-up stores, and more
        </p>

        {/* Radio buttons */}
        <div className="flex justify-center mb-6 space-x-6 flex-wrap">
          {["Exclusive offers", "Free events", "Large discounts"].map((label, idx) => (
            <label key={idx} className="flex items-center">
              <input
                type="radio"
                name="offer"
                aria-label={label}
                className="form-radio text-[#2A254B] dark:text-[#5c1a32]"
              />
              <span className="ml-2">{label}</span>
            </label>
          ))}
        </div>

        {/* Input and button */}
        <form onSubmit={handleSubmit} className="flex justify-center flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-96 lg:w-96 p-4 text-lg bg-[#F9F9F9] dark:bg-[#f9c8d9] dark:text-[#5c1a32] rounded-md"
            aria-label="Email address"
          />
          <button type="submit" className="bg-[#2A254B] dark:bg-[#ff99ac] text-white dark:text-[#5c1a32] p-4 text-lg rounded-md hover:bg-[#3C2A5A] dark:hover:bg-[#ffb3c1] transition duration-300">
            Sign Up
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </div>
    </section>
  );
};

export default SignUp;
