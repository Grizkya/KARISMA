"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/lib/auth";

function getUserStorageKey(userObj) {
  if (!userObj) return "default_user";
  const id = userObj.id ?? userObj.user_id;
  if (id) return `id_${id}`;
  if (userObj.email) {
    return `email_${String(userObj.email).toLowerCase().trim().replace(/[^a-z0-9]/g, "_")}`;
  }
  if (userObj.name) {
    return `name_${String(userObj.name).toLowerCase().trim().replace(/[^a-z0-9]/g, "_")}`;
  }
  return "default_user";
}

function checkIsNotificationRead(userKey) {
  if (typeof window === "undefined" || !userKey) return false;
  try {
    if (localStorage.getItem(`notif_read_${userKey}`) === "true") return true;
    const cookieMatch = document.cookie.match(new RegExp(`(?:^|; )notif_read_${userKey}=([^;]+)`));
    if (cookieMatch && cookieMatch[1] === "true") return true;
  } catch (e) {}
  return false;
}

function markNotificationAsRead(userKey) {
  if (typeof window === "undefined" || !userKey) return;
  try {
    localStorage.setItem(`notif_read_${userKey}`, "true");
    document.cookie = `notif_read_${userKey}=true; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    window.dispatchEvent(new Event("notifications_read"));
  } catch (e) {
    console.error("Error saving notif read status", e);
  }
}

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("user");
  const [username, setUsername] = useState("Pengguna");
  const [email, setEmail] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [hasUnreadNotification, setHasUnreadNotification] = useState(false);
  const [currentUserKey, setCurrentUserKey] = useState(null);
  const userDropdownRef = useRef(null);

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
      let userObj = null;
      if (storedUser) {
        try {
          userObj = JSON.parse(storedUser);
        } catch (e) {
          console.error("Error reading user data", e);
        }
      }
      if (!userObj) {
        const profileMatch = document.cookie.match(new RegExp('(?:^|; )user_profile=([^;]+)'));
        if (profileMatch && profileMatch[1]) {
          try {
            userObj = JSON.parse(decodeURIComponent(profileMatch[1]));
          } catch (e) {}
        }
      }
      if (userObj) {
        setUsername(userObj.name || userObj.username || userObj.email || "Pengguna");
        setEmail(userObj.email || "-");
        setRole((userObj.role || "user").toLowerCase());

        const uKey = getUserStorageKey(userObj);
        setCurrentUserKey(uKey);
        const isRead = checkIsNotificationRead(uKey);
        setHasUnreadNotification(!isRead);
      } else {
        const fallbackKey = "default_user";
        setCurrentUserKey(fallbackKey);
        const isRead = checkIsNotificationRead(fallbackKey);
        setHasUnreadNotification(!isRead);
      }
    } else {
      setIsLoggedIn(false);
      setHasUnreadNotification(false);
    }
  }, []);

  // Sinkronisasi status notifikasi jika dibaca di halaman /notification atau tab lain
  useEffect(() => {
    const handleReadEvent = () => {
      setHasUnreadNotification(false);
    };
    window.addEventListener("notifications_read", handleReadEvent);
    window.addEventListener("storage", handleReadEvent);
    return () => {
      window.removeEventListener("notifications_read", handleReadEvent);
      window.removeEventListener("storage", handleReadEvent);
    };
  }, []);

  // Tutup dropdown saat klik di luar elemen dropdown atau tekan Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleNotificationClick = () => {
    setHasUnreadNotification(false);
    let key = currentUserKey;
    if (!key && typeof window !== "undefined") {
      const stored = localStorage.getItem("user");
      if (stored) {
        try {
          key = getUserStorageKey(JSON.parse(stored));
        } catch (e) {}
      }
    }
    if (!key) key = "default_user";
    markNotificationAsRead(key);
  };

  const handleLogout = async () => {
    setIsUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      document.cookie = "session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "user_role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "user_profile=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      await logoutAction();
    } catch {
      router.push("/login");
      router.refresh();
    }
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

              {/* PROFILE AKUN AVATAR & DROPDOWN MENU */}
              <div className="relative" ref={userDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  aria-expanded={isUserDropdownOpen}
                  aria-haspopup="true"
                  className="flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-white/10 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-[#D18408]/50 cursor-pointer"
                >
                  {/* Lingkaran Inisial Nama */}
                  <div className="w-8 h-8 rounded-full bg-[#D18408] text-[#091F44] font-bold flex items-center justify-center text-sm shadow-md group-hover:bg-[#e09214] transition-colors shrink-0">
                    {getInitial(username)}
                  </div>

                  <span className="hidden sm:inline text-[0.95em] font-medium text-[#eee] group-hover:text-[#D18408] transition-colors max-w-32 truncate text-left">
                    {username}
                  </span>

                  {/* Icon Chevron Arrow */}
                  <svg 
                    className={`w-4 h-4 text-gray-300 transition-transform duration-200 ${isUserDropdownOpen ? "rotate-180 text-[#D18408]" : "group-hover:text-[#D18408]"}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* DROPDOWN POPUP MENU */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#132746] border border-[#2a4878] rounded-xl shadow-2xl p-3 z-50 backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-150">
                    {/* Data Akun: Hanya Email */}
                    <div className="pb-3 border-b border-[#2a4878]/70">
                      <div className="flex items-start gap-2.5 text-xs text-gray-300">
                        <svg className="w-4 h-4 text-[#D18408] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">Email</p>
                          <p className="text-sm font-medium text-white truncate" title={email}>
                            {email || "-"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tombol Logout */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-white hover:bg-red-600/80 rounded-lg transition-colors font-medium cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>

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
          {isLoggedIn && (
            <div className="pt-2 border-t border-[#2a4878]">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-red-500/15 hover:text-red-300 transition-colors text-left cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}