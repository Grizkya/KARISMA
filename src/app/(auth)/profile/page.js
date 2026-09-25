"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api"; 
import { logoutAction } from "@/lib/auth";

export default function Profile() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  // Load Data Profil dari Backend / LocalStorage
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      // Periksa apakah token tersimpan di cookie
      const match = document.cookie.match(new RegExp('(^| )session_token=([^;]+)'));
      if (match && match[2]) {
        token = match[2];
        localStorage.setItem("token", token);
      }
    }

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const data = await apiFetch("/profile", { token }); // Memakai helper apiFetch
        if (data) {
          setUserData((prev) => ({
            ...prev,
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
          }));
        }
      } catch (err) {
        // Jika endpoint /profile belum ada, fallback ambil dari localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const userObj = JSON.parse(storedUser);
          setUserData((prev) => ({
            ...prev,
            name: userObj.name || "",
            email: userObj.email || "",
            phone: userObj.phone || "",
          }));
        }
      }
    };

    fetchUserProfile();
  }, [router]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Simpan Update Profil ke API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      await apiFetch("/profile", {
        method: "PUT",
        body: userData,
        token: token,
      });

      // Update LocalStorage agar sesuai
      localStorage.setItem("user", JSON.stringify(userData));
      alert("Profil berhasil diperbarui!");
      setIsEditing(false);
    } catch (err) {
      alert(err.message || "Gagal mengupdate profil.");
    } finally {
      setLoading(false);
    }
  };

  // Logout Handler
  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    await logoutAction(); // Menghapus cookie di server & mere-direct ke /login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-8">
      <div className="bg-[#133D86] w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-135.5">
        
        {/* SISI KIRI */}
        <div className="w-full md:w-1/2 p-8 md:p-12 text-white flex flex-col justify-center items-center text-center relative bg-linear-to-br from-[#133D86] to-[#f4b04252]">
          <Link 
            href="/" 
            className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 text-white/80 hover:text-[#F4B042] text-xs sm:text-sm font-medium transition-colors duration-200 px-3 py-1.5 sm:px-0 sm:py-0 rounded-full sm:rounded-none"
            title="Kembali ke Beranda"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="hidden xs:inline sm:inline">Beranda</span>
          </Link>

          <div className="mb-3 text-white p-3">
            <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wider mb-4 uppercase">
            Halo <br/> {userData.name || "User"}!
          </h2>
          <p className="text-sm text-gray-200 leading-relaxed max-w-sm">
            Kelola informasi profil akun Anda untuk mempermudah proses verifikasi dan peminjaman fasilitas kampus.
          </p>
        </div>

        {/* SISI KANAN */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-10 flex flex-col justify-center items-center">
          <div className="mb-6 w-full text-center">
            <h1 className="text-3xl sm:text-3xl font-bold text-[#133D86] tracking-tight">
              Profil Saya
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3.5">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Nama Lengkap</label>
              <input 
                type="text" 
                name="name"
                value={userData.name}
                onChange={handleChange}
                disabled={!isEditing}
                required
                className={`w-full px-4 py-2.5 border rounded-lg text-sm transition-all ${
                  isEditing 
                    ? "border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#133D86] bg-white text-gray-900" 
                    : "border-transparent bg-gray-100 text-gray-600 cursor-not-allowed"
                }`}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Email</label>
              <input 
                type="email" 
                name="email"
                value={userData.email}
                onChange={handleChange}
                disabled={!isEditing}
                required
                className={`w-full px-4 py-2.5 border rounded-lg text-sm transition-all ${
                  isEditing 
                    ? "border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#133D86] bg-white text-gray-900" 
                    : "border-transparent bg-gray-100 text-gray-600 cursor-not-allowed"
                }`}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Nomor Telepon</label>
              <input 
                type="tel" 
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                required
                className={`w-full px-4 py-2.5 border rounded-lg text-sm transition-all ${
                  isEditing 
                    ? "border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#133D86] bg-white text-gray-900" 
                    : "border-transparent bg-gray-100 text-gray-600 cursor-not-allowed"
                }`}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Password</label>
              <div className="relative w-full">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                  className={`w-full px-4 py-2.5 pr-10 border rounded-lg text-sm transition-all ${
                    isEditing 
                      ? "border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#133D86] bg-white text-gray-900" 
                      : "border-transparent bg-gray-100 text-gray-600 cursor-not-allowed"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <Image src="/openeye.png" alt="Open Eye" width={20} height={20} />
                  ) : (
                    <Image src="/closeeye.png" alt="Close Eye" width={20} height={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-3 mt-3">
              {isEditing ? (
                <>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="flex-1 bg-[#133D86] text-white py-2.5 rounded-lg font-semibold hover:bg-[#0d2a5e] transition duration-200 shadow-md text-sm disabled:opacity-50"
                  >
                    {loading ? "Menyimpan..." : "Simpan Perubahan"}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsEditing(false)}
                    className="px-4 bg-gray-200 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-300 transition duration-200 text-sm"
                  >
                    Batal
                  </button>
                </>
              ) : (
                <button 
                  type="button" 
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-[#133D86] text-white py-2.5 rounded-lg font-semibold hover:bg-[#0d2a5e] transition duration-200 shadow-md text-sm"
                >
                  Edit Profil
                </button>
              )}
            </div>

            <div className="text-center mt-2">
              <button 
                type="button"
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors duration-200 inline-flex items-center gap-1 bg-transparent border-0 cursor-pointer"
              >
                <span>Keluar dari Akun</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}