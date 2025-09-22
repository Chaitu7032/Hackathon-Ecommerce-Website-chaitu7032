"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Moon, Sun, X, Menu } from "lucide-react";
import { auth } from "../firebaseConfig"; // adjust path
import { onAuthStateChanged, signOut } from "firebase/auth";

const navLinks = [
  { href: "/", label: "Home Page" },
  { href: "/homepage", label: "Home Page v.2" },
  { href: "/product", label: "Product Listing" },
  { href: "/about", label: "About Page" },
  { href: "/productlist", label: "Product Listings" },
  { href: "/shopping", label: "Shopping Baskets" },
  { href: "/uiux", label: "UI/UX" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Theme setup (persisted)
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const initial = stored || "light";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");

    // Auth listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="w-full navbar animate-fade-in-up">
      {/* Glassmorphic nav container (keeps layout's sticky wrapper simpler) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xl sm:text-2xl font-extrabold tracking-tight select-none"
            >
              <span className="inline-block rounded-md px-3 py-1 bg-gradient-to-r from-blue-300 via-purple-200 to-yellow-200 bg-clip-text text-transparent">
                My Ecommerce Website
              </span>
            </Link>
            {/* subtle glass badge */}
            <span className="hidden sm:inline-block text-xs font-medium px-2 py-1 rounded-lg bg-white/40 dark:bg-gray-800/50 backdrop-blur-sm">
              v1.0
            </span>
          </div>

          {/* Desktop links + actions */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center space-x-3">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  {/* .navbar a is defined in global.css for hover effects */}
                  <Link
                    href={href}
                    className="px-3 py-1 rounded-md text-sm font-medium"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Auth / CTA buttons */}
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="hidden sm:inline-block bg-green-400 hover:bg-green-500 text-[#2A254B] font-semibold py-2 px-4 rounded-xl transition-shadow shadow-sm"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="hidden sm:inline-block bg-red-400 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-xl transition-shadow shadow-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="hidden sm:inline-block bg-yellow-400 hover:bg-yellow-500 text-[#2A254B] font-semibold py-2 px-4 rounded-xl transition-shadow shadow-sm"
                >
                  Login / Signup
                </Link>
              )}

              {/* Theme toggle (glass circle) */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                className="p-2 rounded-full bg-white/20 dark:bg-gray-800/40 backdrop-blur-sm hover:scale-105 transition-transform"
              >
                {theme === "dark" ? (
                  <Sun size={18} className="text-yellow-400" />
                ) : (
                  <Moon size={18} className="text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/20 dark:bg-gray-800/40 backdrop-blur-sm"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-yellow-400" />
              ) : (
                <Moon size={18} className="text-white" />
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen((s) => !s)}
              aria-label="Toggle mobile menu"
              className="p-2 rounded-lg bg-white/10 dark:bg-gray-800/50"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown (animated) */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="rounded-2xl bg-white/40 dark:bg-gray-900/50 backdrop-blur-md p-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-left font-medium py-2 rounded-md hover:opacity-90"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-2 border-t border-white/10 dark:border-gray-700/40 mt-2">
              {user ? (
                <div className="space-y-2">
                  <Link
                    href="/profile"
                    className="block w-full text-center bg-green-400 hover:bg-green-500 text-[#2A254B] font-semibold py-2 px-4 rounded-xl"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-red-400 hover:bg-red-500 text-white font-semibold py-2 rounded-xl"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="block w-full text-center bg-yellow-400 hover:bg-yellow-500 text-[#2A254B] font-semibold py-2 px-4 rounded-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login / Signup
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
