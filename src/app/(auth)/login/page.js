"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // 1. Tambahkan impor ini
import { loginAction } from "@/lib/auth";

export default function Login() {
  const router = useRouter(); // 2. Inisialisasi router di sini

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    document.cookie = "session_token=; path=/; max-age=0;";
    document.cookie = "user_role=; path=/; max-age=0;";
    document.cookie = "user_profile=; path=/; max-age=0;";
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await loginAction(email, password);

      if (res?.error) {
        setErrorMsg(res.error);
        setLoading(false);
        return;
      }

      const userData = res.user;
      const tokenData = res.token;

      if (tokenData) localStorage.setItem("token", tokenData);
      if (userData) localStorage.setItem("user", JSON.stringify(userData));

      const userRole = (
        userData?.role ||
        (email.toLowerCase().includes("admin") ? "admin" : "user")
      ).toLowerCase();

      document.cookie = `session_token=${tokenData}; path=/; max-age=${60 * 60 * 24 * 7};`;
      document.cookie = `user_role=${userRole}; path=/; max-age=${60 * 60 * 24 * 7};`;

      // Sekarang router sudah terdefinisi dan bisa berjalan normal
      if (userRole === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
      router.refresh();

    } catch (err) {
      // Buka komentar console.error di bawah jika ingin melihat pesan error asli di DevTools Console
      console.error("Login catch error:", err);
      setErrorMsg("Terjadi kesalahan. Silakan coba lagi.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-8">
      <div className="bg-[#133D86] w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-125">
        <div className="w-full md:w-1/2 p-8 md:p-12 text-white flex flex-col justify-center relative bg-linear-to-br from-[#133D86] to-[#f4b04252]">
          <Link 
            href="/" 
            className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 text-white/80 hover:text-[#F4B042] text-xs sm:text-sm font-medium transition-colors duration-200 px-3 py-1.5 sm:px-0 sm:py-0 rounded-full sm:rounded-none"
            title="Kembali ke Beranda"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="hidden xs:inline sm:inline">Beranda</span>
          </Link>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wider mb-2 uppercase">
            Welcome
          </h2>
          <h2 className="text-lg font-medium text-[#F4B042] mb-4 uppercase tracking-wide">
            Ravenue Unram
          </h2>
          <p className="text-sm text-gray-200 leading-relaxed max-w-sm">
            Sistem Informasi Peminjaman Gedung dan Ruangan Universitas Mataram. Silakan masuk untuk melanjutkan pemesanan.
          </p>
        </div>

        <div className="w-full md:w-1/2 bg-white p-8 md:p-10 flex flex-col justify-center items-center">
          <div className="mb-6 w-full text-center">
            <h1 className="text-3xl sm:text-3xl font-bold text-[#133D86] tracking-tight">
              Login
            </h1>
          </div>

          {errorMsg && (
            <div className="w-full mb-4 p-3 bg-red-100 text-red-700 text-xs rounded-lg border border-red-200">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4" autoComplete="off" data-lpignore="true">
            <input 
              type="email" 
              placeholder="Email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              suppressHydrationWarning
              data-lpignore="true"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#133D86] text-sm"
            />

            <div className="relative w-full">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                suppressHydrationWarning
                data-lpignore="true"
                className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#133D86] text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                suppressHydrationWarning
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <Image src="/openeye.png" alt="Open Eye" width={20} height={20} />
                ) : (
                  <Image src="/closeeye.png" alt="Close Eye" width={20} height={20} />
                )}
              </button>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              suppressHydrationWarning
              className="w-full bg-[#133D86] text-white py-2.5 rounded-lg font-semibold hover:bg-[#0d2a5e] transition duration-200 shadow-md mt-2 disabled:opacity-50"
            >
              {loading ? "Memproses..." : "Login"}
            </button>

            <div className="text-center mt-2">
              <p className="text-gray-600 text-sm leading-relaxed">
                Belum punya akun?
                <Link 
                  href="/register"
                  className="text-[#F4B042] ml-1 text-sm font-medium transition-colors duration-300 ease-in-out hover:text-[#b88431]"
                >
                  Daftar disini
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}