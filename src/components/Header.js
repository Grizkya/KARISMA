"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("user");
  const [username, setUsername] = useState("Pengguna");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      const match = document.cookie.match(new RegExp('(?:^|; )session_token=([^;]+)'));
      if (match && match[1]) {
        token = match[1];
        localStorage.setItem("token", token);
      }
    }
    const storedUser = localStorage.getItem("user");
    if (token) {
      setIsLoggedIn(true);
      if (storedUser) {
        try {
          const userObj = JSON.parse(storedUser);
          setUsername(userObj.name || userObj.email || "Pengguna");
          setRole((userObj.role || "user").toLowerCase());
        } catch (e) {
          console.error("Error reading user data", e);
        }
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleNotificationClick = () => {
    setHasUnreadNotification(false);
  };

  // Ambil huruf pertama username untuk Avatar Lingkaran
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "P";
  };

  return (
    <header className="bg-[#17315c] px-4 lg:px-10 py-3 border-b border-[#444] shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO */}
        <div className="flex items-center shrink-0">
          <Link href="/">
            <Image 
              src="/ravenue_unram_logo.png" 
              alt="Ravenue" 
              width={140} 
              height={36} 
              className="h-auto w-auto object-contain"
            />
          </Link>
        </div>

        {/* MENU NAVIGASI UTAMA (Desktop) */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            href="/"
            className="text-[1.05em] font-medium text-[#eee] transition-colors duration-300 ease-in-out hover:text-[#D18408]">
            Beranda
          </Link>
          <Link 
            href="/about"
            className="text-[1.05em] font-medium text-[#eee] transition-colors duration-300 ease-in-out hover:text-[#D18408]">
            Tentang
          </Link>
          {isLoggedIn && role === "user" && (
            <Link 
              href="/booking"
              className="text-[1.05em] font-medium text-[#eee] transition-colors duration-300 ease-in-out hover:text-[#D18408]">
              Booking
            </Link>
          )}
          {isLoggedIn && role === "admin" && (
            <Link 
              href="/admin"
              className="text-[1.05em] font-medium text-[#eee] transition-colors duration-300 ease-in-out hover:text-[#D18408]">
              Management
            </Link>
          )}
        </div>

        {/* BAGIAN USER / LOGIN (Desktop & Mobile Actions) */}
        <div className="flex items-center space-x-3 md:space-x-5 shrink-0">
          {isLoggedIn ? (
            <div className="flex items-center space-x-2 md:space-x-4">
              
              {/* TOMBOL NOTIFIKASI */}
              <div className="relative">
                <Link 
                  href="/notification" 
                  onClick={handleNotificationClick}
                  title="Notifikasi" 
                  className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200 block relative"
                >
                  <svg className="w-5 h-5 text-[#eee] hover:text-[#D18408] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  
                  {hasUnreadNotification && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-400 border-2 border-[#17315c] rounded-full"></span>
                  )}
                </Link>
              </div>

              {/* PROFILE AKUN AVATAR LINGKARAN */}
              <Link 
                href="/profile" 
                className="flex items-center gap-2 p-1 pr-2.5 rounded-full hover:bg-white/10 transition-all duration-200 group"
              >
                {/* Lingkaran Inisial Nama */}
                <div className="w-8 h-8 rounded-full bg-[#D18408] text-[#091F44] font-bold flex items-center justify-center text-sm shadow-md group-hover:bg-[#A56806] group-hover:text-white transition-colors">
                  {getInitial(username)}
                </div>

                <span className="hidden sm:inline text-[0.95em] font-medium text-[#eee] group-hover:text-[#D18408] transition-colors max-w-30 truncate">
                  {username}
                </span>
              </Link>

            </div>
          ) : (
            <Link 
              href="/login"
              className="text-[0.95em] md:text-[1.05em] font-medium bg-[#D18408] hover:bg-[#A56806] text-[#091F44] hover:text-white transition-colors duration-300 ease-in-out px-3.5 py-1.5 rounded-md shadow-sm">
              Login
            </Link>
          )}

          {/* HAMBURGER BUTTON (Mobile Only) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#eee] hover:text-[#D18408] hover:bg-white/10 focus:outline-none transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

      </nav>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 pb-2 border-t border-[#2a4878] space-y-2">
          <Link 
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-[#eee] hover:bg-[#2a4878] hover:text-[#D18408] transition-colors">
            Beranda
          </Link>
          <Link 
            href="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-[#eee] hover:bg-[#2a4878] hover:text-[#D18408] transition-colors">
            Tentang
          </Link>
          {isLoggedIn && role === "user" && (
            <Link 
              href="/booking"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-[#eee] hover:bg-[#2a4878] hover:text-[#D18408] transition-colors">
              Booking
            </Link>
          )}
          {isLoggedIn && role === "admin" && (
            <Link 
              href="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-[#eee] hover:bg-[#2a4878] hover:text-[#D18408] transition-colors">
              Management
            </Link>
          )}
        </div>
      )}
    </header>
  );
}