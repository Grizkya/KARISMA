"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("user");

  // logout mau di halaman akun
  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <header className="bg-[#091F44] px-10 py-2.5 border-b border-[#444] shadow-sm">
      <nav className="max-w-300 mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6 text-[1.1em] font-medium text-[#eee]">
          <Link href="/"><Image src="/ravenue_unram_logo.png" alt="Ravenue" width={250} height={0} /></Link>
        </div>
        <div className="flex items-center space-x-8">
          <Link 
            href="/"
            className="text-[1.1em] font-medium text-[#eee] transition-colors duration-300 ease-in-out hover:text-[#D18408]">
            Home
          </Link>
          {isLoggedIn && role === "user" && (
            <Link 
              href="/booking"
              className="text-[1.1em] font-medium text-[#eee] transition-colors duration-300 ease-in-out hover:text-[#D18408]">
              Booking
            </Link>
          )}
          {isLoggedIn && role === "admin" && (
            <Link 
              href="/management"
              className="text-[1.1em] font-medium text-[#eee] transition-colors duration-300 ease-in-out hover:text-[#D18408]">
              Management
            </Link>
          )}
          {isLoggedIn ? (
            <>
              <div className="relative">
                <Link href="/notification"> {/* Notification atau status belum dibuat */}
                  <Image 
                    src="/notification_logo.png"
                    alt="Notification" 
                    width={20} 
                    height={20}
                  />
                </Link>
              </div>
              <div className="relative">
                <Link href="/profile"> {/* Profile belum dibuat */}
                  <Image 
                    src="/account_logo.png"
                    alt="Account" 
                    width={20} 
                    height={20}
                  />
                </Link>
              </div>
            </>
            
          ) : (
          <Link 
            href="/login"
            className="text-[1.1em] font-medium bg-[#D18408] hover:bg-[#A56806] text-[#091F44] transition-colors duration-300 ease-in-out px-3 py-1 rounded-md">
            Login
          </Link>
          )}
        </div>
      </nav>
      
    </header>
  );
}