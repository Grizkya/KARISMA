"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("user");
  const [username, setUsername] = useState("John Doe");

  // Status simulasi: 'waiting' | 'review' | 'approved' | 'rejected' | ''
  const [bookingStatus, setBookingStatus] = useState("waiting");
  
  // State untuk melacak apakah notifikasi belum dibaca
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);

  // Mengatur warna indikator status notifikasi secara dinamis
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "waiting":
        return "bg-amber-400 border-amber-500 shadow-amber-400/50"; // 🟡 Menunggu 
      case "review":
        return "bg-blue-500 border-blue-600 shadow-blue-500/50"; // 🔵 Proses Review
      case "approved":
        return "bg-emerald-500 border-emerald-600 shadow-emerald-500/50"; // 🟢 Disetujui
      case "rejected":
        return "bg-rose-500 border-rose-600 shadow-rose-500/50"; // 🔴 Ditolak / Revisi
      default:
        return "hidden";
    }
  };

  const getStatusTooltip = (status) => {
    switch (status) {
      case "waiting":
        return "Status: Menunggu Verifikasi";
      case "review":
        return "Status: Proses Review";
      case "approved":
        return "Status: Disetujui (Approved)";
      case "rejected":
        return "Status: Ditolak / Revisi";
      default:
        return "Tidak Ada Notifikasi Baru";
    }
  };

  // Handler saat logo notifikasi diklik
  const handleNotificationClick = () => {
    setHasUnreadNotification(false);
  };

  return (
    <header className="bg-[#17315c] px-6 lg:px-10 py-3 border-b border-[#444] shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        
        <div className="flex items-center shrink-0">
          <Link href="/">
            <Image 
              src="/ravenue_unram_logo.png" 
              alt="Ravenue" 
              width={150} 
              height={40} 
              className="h-auto w-auto object-contain"
            />
          </Link>
        </div>

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
              href="/management"
              className="text-[1.05em] font-medium text-[#eee] transition-colors duration-300 ease-in-out hover:text-[#D18408]">
              Management
            </Link>
          )}
        </div>

        <div className="flex items-center space-x-5 shrink-0">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              
              <div className="relative group">
                <Link 
                  href="/notification" 
                  onClick={handleNotificationClick}
                  title={getStatusTooltip(bookingStatus)} 
                  className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200 block"
                >
                  <svg className="w-5 h-5 text-[#eee] group-hover:text-[#D18408] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {bookingStatus && hasUnreadNotification && (
                    <span className={`absolute top-1 right-1 w-3 h-3 rounded-full border-2 border-[#17315c] ${getStatusBadgeColor(bookingStatus)}`}></span>
                  )}
                </Link>

                <div className="absolute right-0 top-full mt-2 hidden group-hover:block bg-[#133D86] text-white text-xs py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap border border-white/10 z-50">
                  {getStatusTooltip(bookingStatus)}
                </div>
              </div>

              {/* PROFILE AKUN */}
              <Link 
                href="/profile" 
                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full hover:bg-white/10 transition-all duration-200 group"
              >
                <svg 
                  className="w-7 h-7 text-white group-hover:text-[#D18408] transition-colors" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                <span className="text-[0.95em] font-medium text-[#eee] group-hover:text-[#D18408] transition-colors max-w-30 truncate">
                  {username}
                </span>
              </Link>

            </div>
          ) : (
            <Link 
              href="/login"
              className="text-[1.05em] font-medium bg-[#D18408] hover:bg-[#A56806] text-[#091F44] transition-colors duration-300 ease-in-out px-4 py-1.5 rounded-md shadow-sm">
              Login
            </Link>
          )}
        </div>

      </nav>
    </header>
  );
}