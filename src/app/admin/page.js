"use client";

import { useEffect, useState } from "react";
import { getDashboardData } from "./actions";

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState({
    users: [],
    bookings: [],
    venues: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const data = await getDashboardData();

        setDashboardData(data);
      } catch (err) {
        console.error("Gagal mengambil data dashboard:", err);

        setError(
          err.message ||
            "Gagal mengambil data dashboard."
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const totalUser = dashboardData.users.length;

  const totalBooking = dashboardData.bookings.length;

  const totalGedung = dashboardData.venues.length;

  const menunggu = dashboardData.bookings.filter(
    (booking) => booking.status === "pending"
  ).length;

  const disetujui = dashboardData.bookings.filter(
    (booking) => booking.status === "approved"
  ).length;

  const ditolak = dashboardData.bookings.filter(
    (booking) => booking.status === "rejected"
  ).length;

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#133D86] tracking-tight mt-1">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Memantau pembaruan RaVenue
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* STATISTICS */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

        {/* USER */}
        <div className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total User
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-800">
                {loading ? "..." : totalUser}
              </h2>

              <p className="mt-2 text-xs text-gray-400">
                Data pengguna
              </p>
            </div>

          
          </div>
        </div>

        {/* BOOKING */}
        <div className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Booking
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-800">
                {loading ? "..." : totalBooking}
              </h2>

              <p className="mt-2 text-xs text-gray-400">
                Seluruh pengajuan
              </p>
            </div>

          
          </div>
        </div>

        {/* GEDUNG */}
        <div className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Gedung
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-800">
                {loading ? "..." : totalGedung}
              </h2>

              <p className="mt-2 text-xs text-gray-400">
                Gedung tersedia
              </p>
            </div>

            
          </div>
        </div>
      </div>

      {/* STATUS BOOKING */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          Status Booking
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          {/* MENUNGGU */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-xl">
                ⏳
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Menunggu
                </p>

                <h3 className="text-2xl font-bold text-gray-800">
                  {loading ? "..." : menunggu}
                </h3>
              </div>
            </div>
          </div>

          {/* DISETUJUI */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-xl">
                ✓
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Disetujui
                </p>

                <h3 className="text-2xl font-bold text-gray-800">
                  {loading ? "..." : disetujui}
                </h3>
              </div>
            </div>
          </div>

          {/* DITOLAK */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-200 text-xl">
                ✕
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Ditolak
                </p>

                <h3 className="text-2xl font-bold text-gray-800">
                  {loading ? "..." : ditolak}
                </h3>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM CONTENT */}
      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* PENGAJUAN TERBARU */}
        <div className="rounded-xl bg-white shadow-sm">
          <div className="border-b px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-gray-800">
                  Pengajuan Terbaru
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Pengajuan peminjaman terbaru
                </p>
              </div>

              <a
                href="/admin/bookings"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Lihat semua
              </a>
            </div>
          </div>

          <div className="space-y-3 p-6">
            {loading ? (
              <div className="py-8 text-center text-sm text-gray-400">
                Memuat data...
              </div>
            ) : dashboardData.bookings.length > 0 ? (
              dashboardData.bookings
                .slice(0, 5)
                .map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        {booking.event_name}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {booking.user_name} •{" "}
                        {booking.venue_name}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {booking.date} •{" "}
                        {booking.start_time} -{" "}
                        {booking.end_time}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : booking.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {booking.status === "pending"
                        ? "Menunggu"
                        : booking.status === "approved"
                        ? "Disetujui"
                        : booking.status === "rejected"
                        ? "Ditolak"
                        : booking.status}
                    </span>
                  </div>
                ))
            ) : (
              <div className="flex min-h-48 items-center justify-center">
                <div className="text-center">
                  <div className="mb-3 text-4xl">
                    📋
                  </div>

                  <p className="font-medium text-gray-600">
                    Belum ada pengajuan
                  </p>

                  <p className="mt-1 text-sm text-gray-400">
                    Belum ada data booking
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* GEDUNG */}
        <div className="rounded-xl bg-white shadow-sm">
          <div className="border-b px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-gray-800">
                  Gedung
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Daftar gedung yang dapat dipinjam:
                </p>
              </div>

              <a
                href="/admin/buildings"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Kelola
              </a>
            </div>
          </div>

          <div className="space-y-3 p-6">
            {loading ? (
              <div className="py-8 text-center text-sm text-gray-400">
                Memuat data gedung...
              </div>
            ) : dashboardData.venues.length > 0 ? (
              dashboardData.venues.map((venue) => (
                <div
                  key={venue.id}
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                      🏢
                    </div>

                    <div>
                      <p className="font-medium text-gray-800">
                        {venue.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        {venue.location}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    {venue.status === "available"
                      ? "Tersedia"
                      : venue.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-sm text-gray-400">
                Belum ada data gedung
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}