"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { Moon, Sun, X, Menu, Laptop2, Check, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/homepage", label: "Home v2" },
  { href: "/product", label: "Products" },
  { href: "/productlist", label: "Listings" },
  { href: "/shopping", label: "Cart" },
  { href: "/about", label: "About" },
  { href: "/uiux", label: "UI/UX" },
];

// Avion category list (add more here). Each label automatically gets a slug.
const categories = [
  "Plant Pots",
  "Ceramics",
  "Tables",
  "Chairs",
  "Crockery",
  "Tableware",
  "Cutlery",
].map((label) => ({
  label,
  slug: label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
}));

const linkBase = "relative px-3 py-2 rounded-md text-[13px] font-medium tracking-wide text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition after:content-[''] after:absolute after:left-2 after:right-2 after:bottom-1 after:h-0.5 after:bg-gradient-to-r after:from-sky-400 after:via-indigo-300 after:to-amber-300 after:rounded-full after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:after:scale-x-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60";
const linkActive = "text-slate-900 dark:text-white after:scale-x-100";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [themePref, setThemePref] = useState<"light" | "dark" | "system">("light");
  const [effectiveTheme, setEffectiveTheme] = useState<"light" | "dark">("light");
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const themeButtonRef = useRef<HTMLButtonElement | null>(null);
  const themeMenuRef = useRef<HTMLDivElement | null>(null);

  const applyTheme = useCallback((pref: "light" | "dark" | "system") => {
    if (typeof window === "undefined") return;
    let systemDark = false;
    try {
      systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {}
    const resolved: "light" | "dark" = pref === "system" ? (systemDark ? "dark" : "light") : pref;
    setEffectiveTheme(resolved);
    document.documentElement.classList.toggle("dark", resolved === "dark");
  }, []);

  useEffect(() => {
    const stored = (localStorage.getItem("themePreference") as typeof themePref | null) || "light";
    setThemePref(stored);
    applyTheme(stored);
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => {
      const currentPref = localStorage.getItem("themePreference");
      if (currentPref === "system") applyTheme("system");
    };
    media.addEventListener("change", listener);
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => {
      media.removeEventListener("change", listener);
      unsubscribe();
    };
  }, [applyTheme]); // Remove themePref from dependency array

  useEffect(() => {
    if (!showThemeMenu) return;
    const click = (e: MouseEvent) => {
      if (
        themeMenuRef.current &&
        !themeMenuRef.current.contains(e.target as Node) &&
        themeButtonRef.current &&
        !themeButtonRef.current.contains(e.target as Node)
      )
        setShowThemeMenu(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setShowThemeMenu(false);
    window.addEventListener("mousedown", click);
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("mousedown", click);
      window.removeEventListener("keydown", esc);
    };
  }, [showThemeMenu]);

  const setPreference = (pref: "light" | "dark" | "system") => {
    setThemePref(pref);
    localStorage.setItem("themePreference", pref);
    applyTheme(pref);
    setShowThemeMenu(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (e) {
      console.error(e);
    }
  };

  const closeMobile = () => setIsMobileMenuOpen(false);

  return (
    <nav className="w-full sticky top-0 z-50 font-[system-ui]">
      {/* Primary bar */}
  <div className="relative z-40 bg-white/85 dark:bg-gray-900/70 backdrop-blur-xl border-b border-slate-200/60 dark:border-gray-700/60 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-4 px-4 sm:px-6 lg:px-10 h-16">
          {/* Brand */}
          <Link href="/" className="flex flex-col leading-none select-none group shrink-0">
            <span className="font-extrabold tracking-tight text-xl bg-gradient-to-r from-sky-400 via-indigo-300 to-amber-300 bg-clip-text text-transparent group-hover:brightness-110">My Ecommerce</span>
            <span className="font-extrabold -mt-1 tracking-tight text-xl bg-gradient-to-r from-sky-400 via-indigo-300 to-amber-300 bg-clip-text text-transparent">Website</span>
          </Link>
          <span className="hidden md:inline text-[11px] font-medium px-2 py-1 rounded-full bg-white/70 dark:bg-gray-700/60 text-slate-700 dark:text-slate-200 shadow-inner">v1.0</span>

            {/* Desktop nav links (center) */}
          <ul className="hidden md:flex items-center gap-2 lg:gap-3 xl:gap-4 mx-auto" role="menubar" aria-label="Main navigation">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link href={href} className={`${linkBase} ${active ? linkActive : ""}`}>{label}</Link>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4 shrink-0">
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 via-emerald-300 to-green-500 text-gray-900 font-semibold text-sm px-4 py-2 shadow-sm hover:shadow-md transition active:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-red-600 text-white font-semibold text-sm px-4 py-2 shadow-sm hover:shadow-md transition active:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/60"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 via-amber-300 to-yellow-500 text-[#2A254B] font-semibold text-sm px-5 py-2 shadow-sm hover:shadow-md transition active:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
              >
                Login / Signup
              </Link>
            )}
            <div className="relative">
              <button
                ref={themeButtonRef}
                onClick={() => setShowThemeMenu((s) => !s)}
                aria-haspopup="menu"
                aria-expanded={showThemeMenu}
                aria-label="Theme selector"
                className="inline-flex items-center gap-1 rounded-lg border border-white/50 dark:border-gray-700/60 bg-white/70 dark:bg-gray-800/70 hover:bg-white/90 dark:hover:bg-gray-700/70 px-3 py-2 shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
              >
                {effectiveTheme === "dark" ? <Sun size={16} className="text-amber-300" /> : <Moon size={16} className="text-slate-700" />}
                <span className="hidden xl:inline text-[11px] font-semibold uppercase text-slate-600 dark:text-slate-300">{themePref}</span>
                <ChevronDown size={14} className={`transition ${showThemeMenu ? "rotate-180" : "rotate-0"}`} />
              </button>
              {showThemeMenu && (
                <div
                  ref={themeMenuRef}
                  role="menu"
                  aria-label="Select theme"
                  className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-slate-200/70 dark:border-gray-700/70 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-1 shadow-xl ring-1 ring-black/5 dark:ring-white/10 z-[200] animate-fadeIn"
                >
                  {[
                    { key: "light", label: "Light", icon: <Sun size={14} /> },
                    { key: "dark", label: "Dark", icon: <Moon size={14} /> },
                    { key: "system", label: "System", icon: <Laptop2 size={14} /> },
                  ].map((opt) => {
                    const active = themePref === opt.key;
                    return (
                      <button
                        key={opt.key}
                        role="menuitemradio"
                        aria-checked={active}
                        onClick={() => setPreference(opt.key as any)}
                        className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-md text-sm text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50 hover:bg-white/80 dark:hover:bg-gray-800/70 ${
                          active
                            ? "bg-white/80 dark:bg-gray-800/70 text-slate-900 dark:text-white shadow-sm"
                            : "text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        <span className="inline-flex items-center gap-2">
                          {opt.icon}
                          {opt.label}
                        </span>
                        {active && <Check size={14} className="text-indigo-500" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Mobile toggles */}
          <div className="md:hidden flex items-center gap-2 ml-auto">
            <button
              ref={themeButtonRef}
              onClick={() => setShowThemeMenu((s) => !s)}
              aria-label="Theme selector"
              aria-expanded={showThemeMenu}
              className="inline-flex items-center justify-center rounded-lg border border-white/50 dark:border-gray-700/60 bg-white/70 dark:bg-gray-800/70 hover:bg-white/90 dark:hover:bg-gray-700/70 p-2 shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
            >
              {effectiveTheme === "dark" ? <Sun size={18} className="text-amber-300" /> : <Moon size={18} className="text-slate-700" />}
            </button>
            {showThemeMenu && (
              <div
                ref={themeMenuRef}
                role="menu"
                aria-label="Select theme"
                className="absolute right-4 top-16 w-44 rounded-lg border border-slate-200/70 dark:border-gray-700/70 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-1 shadow-xl ring-1 ring-black/5 dark:ring-white/10 z-[200] animate-fadeIn"
              >
                {[
                  { key: "light", label: "Light", icon: <Sun size={14} /> },
                  { key: "dark", label: "Dark", icon: <Moon size={14} /> },
                  { key: "system", label: "System", icon: <Laptop2 size={14} /> },
                ].map((opt) => {
                  const active = themePref === opt.key;
                  return (
                    <button
                      key={opt.key}
                      role="menuitemradio"
                      aria-checked={active}
                      onClick={() => setPreference(opt.key as any)}
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-md text-sm text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50 hover:bg-white/80 dark:hover:bg-gray-800/70 ${
                        active
                          ? "bg-white/80 dark:bg-gray-800/70 text-slate-900 dark:text-white shadow-sm"
                          : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <span className="inline-flex items-center gap-2">
                        {opt.icon}
                        {opt.label}
                      </span>
                      {active && <Check size={14} className="text-indigo-500" />}
                    </button>
                  );
                })}
              </div>
            )}
            <button
              onClick={() => setIsMobileMenuOpen((s) => !s)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              className="inline-flex items-center justify-center rounded-lg border border-white/50 dark:border-gray-700/60 bg-white/70 dark:bg-gray-800/70 hover:bg-white/90 dark:hover:bg-gray-700/70 p-2 shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Avion category bar (desktop) */}
  <div className="hidden md:block relative z-10 bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl border-b border-slate-200/60 dark:border-gray-700/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-3 flex flex-col gap-3">
          <h2 className="text-center text-xl font-semibold tracking-wide text-slate-800 dark:text-slate-100">Avion</h2>
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-medium">
            {categories.map(({ label, slug }) => {
              const active = pathname.startsWith(`/category/${slug}`);
              return (
                <li key={slug}>
                  <Link
                    href={`/category/${slug}`}
                    className={`relative px-1 py-1 transition group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 ${
                      active
                        ? "text-slate-900 dark:text-white"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <span
                      className={`after:content-[''] after:block after:h-0.5 after:bg-gradient-to-r after:from-sky-400 after:via-indigo-300 after:to-amber-300 after:origin-left after:transition-transform after:duration-300 ${
                        active ? "after:scale-x-100" : "after:scale-x-0 group-hover:after:scale-x-100"
                      }`}
                    ></span>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Mobile slide-out menu */}
      <div
        className={`md:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-slate-200/60 dark:border-gray-700/60 shadow-xl transition-[max-height,opacity] duration-500 overflow-hidden ${
          isMobileMenuOpen ? "max-h-[640px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-4">
          <ul className="flex flex-col gap-1" role="menubar" aria-label="Mobile navigation">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={closeMobile}
                    className={`block ${linkBase} rounded-lg ${active ? linkActive : ""}`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/50 dark:border-gray-700/50">
            {categories.map(({ label, slug }) => {
              const active = pathname.startsWith(`/category/${slug}`);
              return (
                <Link
                  key={slug}
                  href={`/category/${slug}`}
                  onClick={closeMobile}
                  className={`text-xs font-medium px-3 py-1 rounded-full shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50 ${
                    active
                      ? "bg-gradient-to-r from-sky-400 via-indigo-300 to-amber-300 text-slate-900"
                      : "bg-white/70 dark:bg-gray-800/70 text-slate-600 dark:text-slate-300 hover:bg-white/90 dark:hover:bg-gray-700/70"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
          <div className="pt-2 border-t border-slate-200/50 dark:border-gray-700/50 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  href="/profile"
                  onClick={closeMobile}
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 via-emerald-300 to-green-500 text-gray-900 font-semibold text-sm px-5 py-2 shadow-sm hover:shadow-md transition active:translate-y-px"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMobile();
                  }}
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-red-600 text-white font-semibold text-sm px-5 py-2 shadow-sm hover:shadow-md transition active:translate-y-px"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                onClick={closeMobile}
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 via-amber-300 to-yellow-500 text-[#2A254B] font-semibold text-sm px-5 py-2 shadow-sm hover:shadow-md transition active:translate-y-px"
              >
                Login / Signup
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
