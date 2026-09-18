"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const [showSearch, setShowSearch] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [search, setSearch] = useState("");

  const menus = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: "▦",
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
      icon: "▥",
    },
  ];

  const activeMenu =
    menus.find((menu) => {
      if (menu.href === "/admin") {
        return pathname === "/admin";
      }

      return pathname.startsWith(menu.href);
    }) || menus[0];

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = async () => {
    try {
      // Hapus session yang tersimpan di browser
      document.cookie =
        "session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      document.cookie =
        "user_profile=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      setShowLogoutModal(false);

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout gagal:", error);
    }
  };

  // =========================
  // SEARCH
  // =========================
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    console.log("Pencarian:", search);

    // Untuk sementara search hanya membuka input.
    // Pencarian data tiap halaman tetap dilakukan
    // oleh search masing-masing halaman.
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* =========================
          SIDEBAR
      ========================= */}
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-[#1D2B42] text-white">
        {/* LOGO */}
        <div className="flex h-28 items-center border-b border-white/10 px-6">
          <Image
            src="/ravenue_unram_logo.png"
            alt="RaVenue Universitas Mataram"
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* MENU */}
        <nav className="flex-1 px-4 py-7">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-blue-200/70">
            Menu
          </p>

          <div className="space-y-2">
            {menus.map((menu) => {
              const isActive = activeMenu.href === menu.href;

              return (
                <a
                  key={menu.href}
                  href={menu.href}
                  className={`flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-semibold transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="flex w-6 justify-center text-base">
                    {menu.icon}
                  </span>

                  <span>{menu.name}</span>
                </a>
              );
            })}
          </div>
        </nav>

        {/* LOGOUT */}
        <div className="border-t border-white/10 p-4">
          <button
            type="button"
            onClick={() => setShowLogoutModal(true)}
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <span className="text-lg">↪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* =========================
          MAIN
      ========================= */}
      <div className="ml-64 min-h-screen">
        {/* =========================
            HEADER
        ========================= */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between bg-[#133D86] px-8 shadow-sm">
          {/* TITLE */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-blue-100">
              Admin
            </p>

            <h2 className="mt-1 text-lg font-bold text-white">
              {activeMenu.name}
            </h2>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            {/* =========================
                SEARCH
            ========================= */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowSearch(!showSearch);
                  setShowNotification(false);
                  setShowProfile(false);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-xl text-white transition hover:bg-white/10"
                title="Cari"
              >
                🔍
              </button>

              {showSearch && (
                <div className="absolute right-0 top-12 w-80 rounded-xl bg-white p-3 shadow-xl">
                  <form onSubmit={handleSearchSubmit}>
                    <div className="flex items-center rounded-lg border border-gray-300 px-3">
                      <span className="mr-2 text-gray-400">🔍</span>

                      <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={`Cari di ${activeMenu.name}...`}
                        autoFocus
                        className="w-full py-2.5 text-sm text-gray-700 outline-none"
                      />
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* =========================
                NOTIFICATION
            ========================= */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowNotification(!showNotification);
                  setShowSearch(false);
                  setShowProfile(false);
                }}
                className="relative flex h-10 w-10 items-center justify-center rounded-lg text-xl text-white transition hover:bg-white/10"
                title="Notifikasi"
              >
                🔔

                <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-red-400" />
              </button>

              {showNotification && (
                <div className="absolute right-0 top-12 w-80 overflow-hidden rounded-xl bg-white shadow-xl">
                  <div className="border-b border-gray-200 px-4 py-3">
                    <h3 className="text-sm font-bold text-gray-800">
                      Notifikasi
                    </h3>
                  </div>

                  <div className="px-4 py-8 text-center">
                    <div className="mb-2 text-3xl">🔔</div>

                    <p className="text-sm font-medium text-gray-700">
                      Belum ada notifikasi
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Notifikasi booking akan muncul di sini.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* =========================
                PROFILE
            ========================= */}
            <div className="relative ml-2 border-l border-white/20 pl-4">
              <button
                type="button"
                onClick={() => {
                  setShowProfile(!showProfile);
                  setShowSearch(false);
                  setShowNotification(false);
                }}
                className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-white/10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-bold text-[#133D86]">
                  A
                </div>

                <div className="hidden text-left sm:block">
                  <p className="text-sm font-semibold text-white">
                    Administrator
                  </p>

                  <p className="text-xs text-blue-100">
                    Admin
                  </p>
                </div>

                <span className="text-xs text-blue-100">
                  {showProfile ? "▴" : "▾"}
                </span>
              </button>

              {showProfile && (
                <div className="absolute right-0 top-14 w-64 rounded-xl bg-white p-2 shadow-xl">
                  <div className="px-3 py-3">
                    <p className="text-sm font-semibold text-gray-800">
                      Administrator
                    </p>

                    <p className="text-xs text-gray-500">
                      Admin RaVenue
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* =========================
            CONTENT
        ========================= */}
        <main className="p-8">{children}</main>
      </div>

      {/* =========================
          LOGOUT MODAL
      ========================= */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-2xl">
                ↪
              </div>

              <h3 className="text-lg font-bold text-gray-800">
                Keluar dari akun?
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Apakah kamu yakin ingin keluar dari halaman admin?
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Ya, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}