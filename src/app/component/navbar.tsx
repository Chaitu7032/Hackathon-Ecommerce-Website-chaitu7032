"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { 
  Moon, 
  Sun, 
  Menu, 
  X, 
  ShoppingCart, 
  User, 
  Search,
  ChevronDown,
  Home,
  Package,
  Info,
  List,
  Palette,
  LogOut,
  UserPlus
} from "lucide-react";
import { auth } from "../firebaseConfig"; // adjust path
import { onAuthStateChanged, signOut } from "../mockFirebase";
// Move static data outside component to avoid recreating arrays each render
const MAIN_NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/homepage", label: "Home v.2", icon: Home },
  { href: "/product", label: "Product", icon: Package },
  { href: "/about", label: "About", icon: Info },
];

const SECONDARY_NAV_LINKS = [
  { href: "/productlist", label: "Product List", icon: List },
  { href: "/shopping", label: "Shopping", icon: ShoppingCart },
  { href: "/uiux", label: "UI/UX", icon: Palette },
];

const CATEGORY_LINKS = [
  { href: "/category/plant-pots", label: "Plant Pots" },
  { href: "/category/ceramics", label: "Ceramics" },
  { href: "/category/tables", label: "Tables" },
  { href: "/category/chairs", label: "Chairs" },
  { href: "/category/crockery", label: "Crockery" },
  { href: "/category/tableware", label: "Tableware" },
  { href: "/category/cutlery", label: "Cutlery" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [user, setUser] = useState<any>(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  useEffect(() => {
    // Theme setup
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const initial = stored || "light";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");

    // Auth state listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Set active link based on current path
    setActiveLink(window.location.pathname);

    return () => unsubscribe();
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  }, [theme]);

  const handleLogout = useCallback(async () => {
    await signOut(auth);
    setUser(null);
    setIsProfileDropdownOpen(false);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 theme-transition">
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200/20 dark:border-neutral-700/20"></div>
        
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Logo Section */}
              <div className="flex items-center space-x-4">
                <Link 
                  href="/" 
                  className="flex items-center space-x-3 group"
                  onClick={() => setActiveLink("/")}
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <span className="text-white font-bold text-lg lg:text-xl">E</span>
                  </div>
                  <div className="hidden sm:block">
                    <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                      Avion
                    </h1>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 -mt-1">
                      Ecommerce
                    </p>
                  </div>
                </Link>
              </div>

              {/* Desktop Navigation - Center */}
              <div className="hidden lg:flex items-center justify-center flex-1">
                <div className="flex items-center space-x-1">
                  {MAIN_NAV_LINKS.map(({ href, label, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setActiveLink(href)}
                      className={`
                        relative px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ease-in-out
                        flex items-center space-x-2 group
                        ${activeLink === href 
                          ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' 
                          : 'text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                        }
                      `}
                    >
                      <Icon size={16} className="group-hover:scale-110 transition-transform duration-200" />
                      <span>{label}</span>
                      {activeLink === href && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full"></div>
                      )}
                    </Link>
                  ))}
                  
                  {/* Categories Mega Dropdown */}
                  <div className="relative group">
                    <button className="flex items-center space-x-1 px-4 py-2 rounded-full font-medium text-sm text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all duration-300">
                      <span>Categories</span>
                      <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[640px] max-w-[90vw] bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 p-6">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {CATEGORY_LINKS.map(({ href, label }) => (
                          <Link
                            key={href}
                            href={href}
                            onClick={() => setActiveLink(href)}
                            className={`
                              rounded-lg px-4 py-3 text-sm font-medium tracking-wide transition-colors duration-200 border border-transparent
                              ${activeLink === href 
                                ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 border-primary-200 dark:border-primary-800' 
                                : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 hover:text-primary-600 dark:hover:text-primary-300'
                              }
                            `}
                          >
                            {label}
                          </Link>
                        ))}
                      </div>
                      <div className="mt-5 flex items-center justify-between border-t border-neutral-200 dark:border-neutral-700 pt-4">
                        <Link href="/productlist" className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400 hover:underline" onClick={() => setActiveLink('/productlist')}>
                          View All Products →
                        </Link>
                        <Link href="/shopping" className="text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors" onClick={() => setActiveLink('/shopping')}>
                          Go to Cart
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Links Dropdown (renamed More -> Others) */}
                  <div className="relative group">
                    <button className="flex items-center space-x-1 px-4 py-2 rounded-full font-medium text-sm text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all duration-300">
                      <span>Others</span>
                      <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                    </button>
                    <div className="absolute top-full right-0 mt-2 w-52 bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100">
                      <div className="py-2">
                        {SECONDARY_NAV_LINKS.map(({ href, label, icon: Icon }) => (
                          <Link
                            key={href}
                            href={href}
                            onClick={() => setActiveLink(href)}
                            className={`
                              flex items-center space-x-3 px-4 py-3 text-sm transition-colors duration-200
                              ${activeLink === href 
                                ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' 
                                : 'text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-700/50'
                              }
                            `}
                          >
                            <Icon size={16} />
                            <span>{label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center space-x-3">
                {/* Search Button - Hidden on mobile */}
                <button 
                  className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-300 hover:scale-105"
                  aria-label="Search"
                >
                  <Search size={18} />
                </button>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-300 hover:scale-105"
                  aria-label="Toggle Theme"
                >
                  {theme === "dark" ? (
                    <Sun size={18} className="text-yellow-500" />
                  ) : (
                    <Moon size={18} className="text-neutral-600" />
                  )}
                </button>

                {/* User Authentication */}
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                      className="flex items-center space-x-2 p-2 rounded-full bg-gradient-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <User size={18} />
                      <span className="hidden md:block text-sm font-medium">Profile</span>
                      <ChevronDown size={14} className={`hidden md:block transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Profile Dropdown */}
                    {isProfileDropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 animate-slide-down">
                        <div className="py-2">
                          <Link
                            href="/profile"
                            onClick={() => setIsProfileDropdownOpen(false)}
                            className="flex items-center space-x-3 px-4 py-3 text-sm text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors duration-200"
                          >
                            <User size={16} />
                            <span>My Profile</span>
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                          >
                            <LogOut size={16} />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href="/auth/login"
                    className="btn-primary"
                  >
                    <UserPlus size={16} className="mr-2" />
                    <span className="hidden sm:inline">Login</span>
                    <span className="sm:hidden">Join</span>
                  </Link>
                )}

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-300"
                  aria-label="Toggle mobile menu"
                >
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={closeMobileMenu}
          ></div>
          
          {/* Mobile Menu Panel */}
          <div className="absolute top-16 right-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-neutral-900 shadow-2xl animate-slide-down">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Menu</h2>
                  <button
                    onClick={closeMobileMenu}
                    className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto p-6 space-y-1">
                {[...MAIN_NAV_LINKS, ...SECONDARY_NAV_LINKS].map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => {
                      setActiveLink(href);
                      closeMobileMenu();
                    }}
                    className={`
                      flex items-center space-x-4 p-4 rounded-xl font-medium transition-all duration-200
                      ${activeLink === href 
                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' 
                        : 'text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-neutral-200 dark:border-neutral-700 space-y-4">
                {user ? (
                  <>
                    <Link
                      href="/profile"
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-primary text-white font-medium"
                    >
                      <User size={20} />
                      <span>My Profile</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        closeMobileMenu();
                      }}
                      className="flex items-center space-x-3 w-full p-4 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium transition-colors duration-200"
                    >
                      <LogOut size={20} />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth/login"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center space-x-3 p-4 rounded-xl bg-gradient-primary text-white font-medium"
                  >
                    <UserPlus size={20} />
                    <span>Login / Signup</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16 lg:h-20"></div>
    </>
  );
};

export default Navbar;

