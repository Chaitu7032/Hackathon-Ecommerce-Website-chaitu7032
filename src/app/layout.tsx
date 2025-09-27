import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from './component/header';
import Footer from "./component/footer";
import Navbar from "./component/navbar";
import ScrollToTop from "./component/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce Website by Maham Babbar",
  description: "An ecommerce website created by Maham Babbar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}> {/* ✅ Moved here */}
      <body>
        <Navbar /> {/* Navbar Component */}
        <Header />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}

