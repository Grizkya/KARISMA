"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getPendingBookings } from "./actions";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const [showSearch, setShowSearch] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [search, setSearch] = useState("");
  const [searchMessage, setSearchMessage] = useState("");

  // =========================
  // NOTIFICATION STATE
  // =========================

  const [pendingBookings, setPendingBookings] = useState([]);
  const [notificationLoading, setNotificationLoading] =
    useState(false);

  // =========================
  // MENU
  // =========================

  const menus = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: "▦",
      description: "Halaman utama admin",
    },
    {
      name: "Data User",
      href: "/admin/users",
      icon: "♙",
      description: "Kelola data pengguna",
    },
    {
      name: "Booking",
      href: "/admin/bookings",
      icon: "▤",
      description: "Kelola pengajuan booking",
    },
    {
      name: "Gedung",
      href: "/admin/buildings",
      icon: "▥",
      description: "Kelola data gedung",
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
  // NOTIFICATION
  // =========================

  const loadNotifications = async () => {
    try {
      setNotificationLoading(true);

      const result = await getPendingBookings();

      setPendingBookings(
        Array.isArray(result) ? result : []
      );
    } catch (error) {
      console.error(
        "Gagal mengambil notifikasi booking:",
        error
      );
    } finally {
      setNotificationLoading(false);
    }
  };

  useEffect(() => {
    const refreshNotifications = () => {
      void loadNotifications();
    };

    // Cek ketika halaman admin pertama kali dibuka
    const initialLoad = setTimeout(() => {
      refreshNotifications();
    }, 0);

    // Cek ulang setiap 10 detik
    const interval = setInterval(() => {
      refreshNotifications();
    }, 10000);

    return () => {
      clearTimeout(initialLoad);
      clearInterval(interval);
    };
  }, []);

  // =========================
  // SEARCH
  // =========================

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      setSearchMessage(
        "Silakan masukkan kata pencarian."
      );
      return;
    }

    const foundMenu = menus.find((menu) => {
      const menuName = menu.name.toLowerCase();
      const menuDescription =
        menu.description.toLowerCase();

      return (
        menuName.includes(keyword) ||
        menuDescription.includes(keyword)
      );
    });

    if (foundMenu) {
      setSearchMessage("");
      setShowSearch(false);
      setShowNotification(false);
      setShowProfile(false);
      setSearch("");

      router.push(foundMenu.href);
      return;
    }

    setSearchMessage(
      `"${search}" tidak ditemukan.`
    );
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);

    if (searchMessage) {
      setSearchMessage("");
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = async () => {
    try {
      document.cookie =
        "session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      document.cookie =
        "user_profile=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      setShowLogoutModal(false);
      setShowMobileMenu(false);

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout gagal:", error);
    }
  };

  // =========================
  // MOBILE MENU
  // =========================

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* =========================
          MOBILE OVERLAY
      ========================= */}

      {showMobileMenu && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-[#1D2B42] text-white transition-transform duration-300 md:translate-x-0 ${
          showMobileMenu
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* LOGO */}

        <div className="flex h-28 items-center justify-between border-b border-white/10 px-6">
          <img
            src="/ravenue_unram_logo.png"
            alt="RaVenue Universitas Mataram"
            className="h-16 w-auto object-contain"
          />

          {/* CLOSE MOBILE MENU */}

          <button
            type="button"
            onClick={closeMobileMenu}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-white/80 transition hover:bg-white/10 hover:text-white md:hidden"
            aria-label="Tutup menu"
          >
            ×
          </button>
        </div>

        {/* MENU */}

        <nav className="flex-1 overflow-y-auto px-4 py-7">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-blue-200/70">
            Menu
          </p>

          <div className="space-y-2">
            {menus.map((menu) => {
              const isActive =
                activeMenu.href === menu.href;

              return (
                <a
                  key={menu.href}
                  href={menu.href}
                  onClick={closeMobileMenu}
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

        {/* LOGOUT SIDEBAR */}

        <div className="border-t border-white/10 p-4">
          <button
            type="button"
            onClick={() => {
              setShowLogoutModal(true);
              setShowMobileMenu(false);
            }}
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <span className="text-lg">↪</span>

            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <div className="min-h-screen md:ml-64">
        {/* =========================
            HEADER
        ========================= */}

        <header className="sticky top-0 z-30 flex min-h-20 items-center justify-between bg-[#133D86] px-4 py-3 shadow-sm sm:px-6 md:px-8">
          {/* LEFT HEADER */}

          <div className="flex min-w-0 items-center gap-3">
            {/* HAMBURGER MOBILE */}

            <button
              type="button"
              onClick={() => {
                setShowMobileMenu(true);
                setShowSearch(false);
                setShowNotification(false);
                setShowProfile(false);
              }}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white transition hover:bg-white/10 md:hidden"
              aria-label="Buka menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* PAGE NAME */}

            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-wide text-blue-100 sm:text-xs">
                Admin
              </p>

              <h2 className="mt-0.5 truncate text-base font-bold text-white sm:text-lg">
                {activeMenu.name}
              </h2>
            </div>
          </div>

          {/* RIGHT HEADER */}

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
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
                  setSearchMessage("");
                }}
                className="flex h-10 w-10 items-center justify-center rounded-lg transition hover:bg-white/10"
                title="Cari"
              >
                <svg
                  className="h-5 w-5 text-[#eee] transition-colors hover:text-[#D18408]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                  />
                </svg>
              </button>

              {/* SEARCH BOX */}

              {showSearch && (
                <div className="absolute right-0 top-12 w-[calc(100vw-2rem)] max-w-80 rounded-xl bg-white p-3 shadow-xl">
                  <form onSubmit={handleSearchSubmit}>
                    <div className="flex items-center rounded-lg border border-gray-300 px-3">
                      <svg
                        className="mr-2 h-5 w-5 shrink-0 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                        />
                      </svg>

                      <input
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder={`Cari di ${activeMenu.name}...`}
                        autoFocus
                        className="w-full min-w-0 py-2.5 text-sm text-gray-700 outline-none"
                      />
                    </div>

                    {/* HASIL SEARCH */}

                    {search.trim() && (
                      <div className="mt-2">
                        {menus
                          .filter((menu) => {
                            const keyword =
                              search.toLowerCase();

                            return (
                              menu.name
                                .toLowerCase()
                                .includes(keyword) ||
                              menu.description
                                .toLowerCase()
                                .includes(keyword)
                            );
                          })
                          .map((menu) => (
                            <button
                              key={menu.href}
                              type="button"
                              onClick={() => {
                                setShowSearch(false);
                                setSearch("");
                                setSearchMessage("");
                                router.push(menu.href);
                              }}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition hover:bg-blue-50"
                            >
                              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-sm text-[#133D86]">
                                {menu.icon}
                              </span>

                              <span className="min-w-0">
                                <span className="block text-sm font-semibold text-gray-800">
                                  {menu.name}
                                </span>

                                <span className="block text-xs text-gray-500">
                                  {menu.description}
                                </span>
                              </span>
                            </button>
                          ))}

                        {/* TIDAK ADA HASIL */}

                        {menus.filter((menu) => {
                          const keyword =
                            search.toLowerCase();

                          return (
                            menu.name
                              .toLowerCase()
                              .includes(keyword) ||
                            menu.description
                              .toLowerCase()
                              .includes(keyword)
                          );
                        }).length === 0 && (
                          <div className="px-3 py-4 text-center">
                            <p className="text-sm font-medium text-gray-700">
                              Tidak ditemukan
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              Coba gunakan kata kunci lain.
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* PESAN */}

                    {searchMessage && (
                      <p className="mt-2 px-1 text-xs text-red-500">
                        {searchMessage}
                      </p>
                    )}
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
                  setShowNotification(
                    !showNotification
                  );
                  setShowSearch(false);
                  setShowProfile(false);
                }}
                className="relative flex h-10 w-10 items-center justify-center rounded-lg transition hover:bg-white/10"
                title="Notifikasi"
              >
                <svg
                  className="h-5 w-5 text-[#eee] transition-colors hover:text-[#D18408]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>

                {/* JUMLAH NOTIFIKASI */}

                {pendingBookings.length > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                    {pendingBookings.length > 9
                      ? "9+"
                      : pendingBookings.length}
                  </span>
                )}
              </button>

              {/* =========================
                  NOTIFICATION DROPDOWN
              ========================= */}

              {showNotification && (
                <div className="absolute right-0 top-12 z-50 w-[calc(100vw-2rem)] max-w-80 overflow-hidden rounded-xl bg-white shadow-xl">
                  {/* HEADER */}

                  <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                    <div>
                      <h3 className="text-sm font-bold text-gray-800">
                        Notifikasi
                      </h3>

                      <p className="mt-0.5 text-xs text-gray-400">
                        Pengajuan peminjaman
                      </p>
                    </div>

                    {pendingBookings.length > 0 && (
                      <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">
                        {pendingBookings.length} baru
                      </span>
                    )}
                  </div>

                  {/* LOADING */}

                  {notificationLoading ? (
                    <div className="px-4 py-8 text-center">
                      <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-[#133D86]" />

                      <p className="text-sm text-gray-500">
                        Memeriksa pengajuan...
                      </p>
                    </div>
                  ) : pendingBookings.length ===
                    0 ? (
                    /* TIDAK ADA NOTIFIKASI */

                    <div className="px-4 py-8 text-center">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-6 w-6 text-gray-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9a6 6 0 1 0-12 0v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                          />
                        </svg>
                      </div>

                      <p className="text-sm font-medium text-gray-700">
                        Belum ada pengajuan
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Pengajuan baru akan muncul di
                        sini.
                      </p>
                    </div>
                  ) : (
                    /* ADA NOTIFIKASI */

                    <div>
                      <div className="max-h-80 overflow-y-auto">
                        {pendingBookings.map(
                          (booking) => (
                            <button
                              key={booking.id}
                              type="button"
                              onClick={() => {
                                setShowNotification(
                                  false
                                );

                                router.push(
                                  "/admin/bookings"
                                );
                              }}
                              className="w-full border-b border-gray-100 px-4 py-4 text-left transition hover:bg-gray-50"
                            >
                              <div className="flex gap-3">
                                {/* ICON */}

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#133D86]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.8}
                                    stroke="currentColor"
                                    className="h-5 w-5"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                  </svg>
                                </div>

                                {/* INFORMASI BOOKING */}

                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-semibold text-gray-800">
                                    Pengajuan baru
                                  </p>

                                  <p className="mt-1 truncate text-xs text-gray-600">
                                    {booking.event_name ||
                                      "Kegiatan"}
                                  </p>

                                  <p className="mt-1 text-xs text-gray-400">
                                    {booking.user_name ||
                                      "Peminjam"}
                                    {" • "}
                                    {booking.venue_name ||
                                      "Gedung"}
                                  </p>

                                  {booking.created_at && (
                                    <p className="mt-1 text-[11px] text-gray-400">
                                      {booking.created_at}
                                    </p>
                                  )}
                                </div>

                                {/* PENANDA BARU */}

                                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                              </div>
                            </button>
                          )
                        )}
                      </div>

                      {/* LIHAT SEMUA */}

                      <button
                        type="button"
                        onClick={() => {
                          setShowNotification(false);
                          router.push(
                            "/admin/bookings"
                          );
                        }}
                        className="w-full border-t border-gray-200 px-4 py-3 text-center text-sm font-semibold text-[#133D86] hover:bg-gray-50"
                      >
                        Lihat semua pengajuan
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* =========================
                PROFILE
            ========================= */}

            <div className="relative ml-1 border-l border-white/20 pl-2 sm:ml-2 sm:pl-4">
              <button
                type="button"
                onClick={() => {
                  setShowProfile(!showProfile);
                  setShowSearch(false);
                  setShowNotification(false);
                }}
                className="flex items-center gap-2 rounded-lg px-1.5 py-1.5 transition hover:bg-white/10 sm:gap-3 sm:px-2"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-[#133D86] sm:h-10 sm:w-10">
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

                <span className="hidden text-xs text-blue-100 sm:block">
                  {showProfile ? "▴" : "▾"}
                </span>
              </button>

              {showProfile && (
                <div className="absolute right-0 top-14 w-64 max-w-[calc(100vw-2rem)] rounded-xl bg-white p-2 shadow-xl">
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
            PAGE CONTENT
        ========================= */}

        <main className="p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>

      {/* =========================
          LOGOUT MODAL
      ========================= */}

      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-2xl">
                ↪
              </div>

              <h3 className="text-lg font-bold text-gray-800">
                Keluar dari akun?
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Apakah kamu yakin ingin keluar dari
                halaman admin?
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() =>
                  setShowLogoutModal(false)
                }
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