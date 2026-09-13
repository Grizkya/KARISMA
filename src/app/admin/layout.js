
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const [showNotification, setShowNotification] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [search, setSearch] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menus = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: "▣",
    },
    {
      name: "Data User",
      href: "/admin/users",
      icon: "♙",
    },
    {
      name: "Booking",
      href: "/admin/bookings",
      icon: "▤",
    },
    {
      name: "Gedung",
      href: "/admin/buildings",
      icon: "⌂",
    },
  ];

  // Menentukan menu yang sedang aktif
  const activeMenu =
    menus.find((menu) => {
      if (menu.href === "/admin") {
        return pathname === "/admin";
      }

      return pathname.startsWith(menu.href);
    }) || menus[0];

  // Fungsi Search
  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) {
      return;
    }

    const keyword = search.toLowerCase();

    if (
      keyword.includes("user") ||
      keyword.includes("pengguna")
    ) {
      router.push("/admin/users");
    } else if (
      keyword.includes("booking") ||
      keyword.includes("peminjaman")
    ) {
      router.push("/admin/bookings");
    } else if (
      keyword.includes("gedung") ||
      keyword.includes("ruangan")
    ) {
      router.push("/admin/buildings");
    }
  };

  // Fungsi Logout
  const handleLogout = () => {
    setShowProfile(false);
    setShowLogoutModal(false);

    // Nanti bisa diganti dengan fungsi logout dari sistem autentikasi
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* =====================================================
          SIDEBAR ADMIN
      ====================================================== */}

      <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-slate-800 text-white">

        {/* ================= LOGO ================= */}

        <div className="flex h-28 items-center border-b border-slate-700 px-6">
          <img
            src="/ravenue_unram_logo.png"
            alt="RaVenue Universitas Mataram"
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* ================= MENU ================= */}

        <nav className="flex-1 px-4 py-7">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Menu
          </p>

          <div className="space-y-2">
            {menus.map((menu) => {
              const isActive = activeMenu.href === menu.href;

              return (
                <a
                  key={menu.href}
                  href={menu.href}
                  className={`flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <span className="flex w-6 justify-center text-lg">
                    {menu.icon}
                  </span>

                  <span>{menu.name}</span>
                </a>
              );
            })}
          </div>
        </nav>

        {/* ================= LOGOUT ================= */}

        <div className="border-t border-slate-700 p-4">
          <button
            type="button"
            onClick={() => setShowLogoutModal(true)}
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
          >
            <span className="flex w-6 justify-center text-lg">
              ↪
            </span>

            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* =====================================================
          KONTEN UTAMA
      ====================================================== */}

      <div className="ml-64 min-h-screen">

        {/* ================= HEADER ================= */}

        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-8 shadow-sm">

          {/* ================= JUDUL HALAMAN ================= */}

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Admin
            </p>

            <h2 className="mt-1 text-lg font-bold text-gray-800">
              {activeMenu.name}
            </h2>
          </div>

          {/* ================= BAGIAN KANAN HEADER ================= */}

          <div className="flex items-center gap-5">

            {/* ================= SEARCH ================= */}

            <form
              onSubmit={handleSearch}
              className="flex items-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
            >
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-32 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
              />

              <button
                type="submit"
                className="ml-2 text-sm text-gray-400 transition hover:text-blue-600"
                aria-label="Search"
              >
                ⌕
              </button>
            </form>

            {/* ================= NOTIFICATION ================= */}

            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setShowNotification(!showNotification)
                }
                className="relative flex h-10 w-10 items-center justify-center rounded-lg text-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                aria-label="Notifikasi"
              >
                ♧

                {/* Titik notifikasi */}

                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
              </button>

              {/* Panel Notifikasi */}

              {showNotification && (
                <div className="absolute right-0 top-12 z-50 w-72 border border-gray-200 bg-white shadow-lg">

                  <div className="border-b border-gray-200 px-4 py-3">
                    <p className="text-sm font-semibold text-gray-800">
                      Notifikasi
                    </p>
                  </div>

                  <div className="px-4 py-5">
                    <p className="text-sm text-gray-500">
                      Belum ada notifikasi baru.
                    </p>
                  </div>

                </div>
              )}
            </div>

            {/* ================= ADMIN PROFILE ================= */}

            <div className="relative border-l border-gray-200 pl-5">

              <button
                type="button"
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-3 text-left"
              >

                {/* Avatar Admin */}

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                  A
                </div>

                {/* Informasi Admin */}

                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-gray-800">
                    Administrator
                  </p>

                  <p className="text-xs text-gray-500">
                    Admin
                  </p>
                </div>

                <span className="text-xs text-gray-400">
                  ▾
                </span>

              </button>

              {/* Dropdown Profile */}

              {showProfile && (
                <div className="absolute right-0 top-14 z-50 w-52 border border-gray-200 bg-white shadow-lg">

                  <div className="border-b border-gray-200 px-4 py-3">
                    <p className="text-sm font-semibold text-gray-800">
                      Administrator
                    </p>

                    <p className="text-xs text-gray-500">
                      Admin
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowLogoutModal(true)}
                    className="w-full px-4 py-3 text-left text-sm text-gray-600 transition hover:bg-gray-50 hover:text-red-600"
                  >
                    Logout
                  </button>

                </div>
              )}

            </div>
          </div>
        </header>

        {/* ================= ISI HALAMAN ================= */}

        <main className="p-8">
          {children}
        </main>

      </div>

      {/* =====================================================
          MODAL KONFIRMASI LOGOUT
      ====================================================== */}

      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">

          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">

            {/* Icon */}

            <div className="flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-2xl text-red-600">
                ↪
              </div>
            </div>

            {/* Judul */}

            <h3 className="mt-4 text-center text-lg font-bold text-gray-800">
              Yakin ingin keluar?
            </h3>

            {/* Pesan */}

            <p className="mt-2 text-center text-sm text-gray-500">
              Apakah kamu yakin ingin keluar dari akun admin?
            </p>

            {/* Tombol */}

            <div className="mt-6 flex gap-3">

              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Ya, Keluar
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

