"use client";

import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import ScrollToTop from './ScrollToTop';

interface MainLayoutProps {
  children: React.ReactNode;
  // Removed legacy Header (secondary nav) to simplify navigation.
  // Keeping prop placeholder commented out for backward compatibility if needed.
  // showHeader?: boolean;
  showFooter?: boolean;
}

export default function MainLayout({ 
  children, 
  // showHeader = false (deprecated),
  showFooter = true 
}: MainLayoutProps) {
  return (
    <>
  <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      {showFooter && <Footer />}
      <ScrollToTop />
    </>
  );
}