"use client";

import { useState } from "react";

export default function BookingsPage() {
  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

  // DATA BOOKING AKAN DIAMBIL DARI DATABASE NANTI
  const bookings = [];

  const filteredBookings = bookings.filter((booking) => {
    const keyword = search.toLowerCase();

    return (
      booking.nama?.toLowerCase().includes(keyword) ||
      booking.kegiatan?.toLowerCase().includes(keyword) ||
      booking.gedung?.toLowerCase().includes(keyword) ||
      booking.status?.toLowerCase().includes(keyword)
    );
  });

  // APPROVE
  const handleApprove = (booking) => {
    console.log("Approve:", booking);
    // Nanti dihubungkan ke API
  };

  // REJECT
  const handleReject = (booking) => {
    console.log("Reject:", booking);
    // Nanti dihubungkan ke API
  };

  // DELETE
  const handleDelete = (booking) => {
    console.log("Delete:", booking);
    // Nanti dihubungkan ke API
  };

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Booking
        </h1>

        <p className="mt-2 text-gray-500">
          Kelola pengajuan peminjaman gedung
        </p>
      </div>

      {/* RINGKASAN */}
      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Booking
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-800">
            {bookings.length}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Menunggu Persetujuan
          </p>

          <h2 className="mt-2 text-2xl font-bold text-yellow-600">
            {
              bookings.filter(
                (booking) =>
                  booking.status === "Menunggu"
              ).length
            }
          </h2>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Disetujui
          </p>

          <h2 className="mt-2 text-2xl font-bold text-green-600">
            {
              bookings.filter(
                (booking) =>
                  booking.status === "Disetujui"
              ).length
            }
          </h2>
        </div>
      </div>

      {/* SEARCH */}
      <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-semibold text-gray-800">
              Daftar Pengajuan
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Kelola seluruh pengajuan peminjaman
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>

            <input
              type="text"
              placeholder="Cari booking..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50 text-left">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  No
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Peminjam
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Kegiatan
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Gedung
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Tanggal
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking, index) => (
                  <tr
                    key={booking.id}
                    className="border-b last:border-0 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800">
                        {booking.nama}
                      </p>

                      <p className="text-xs text-gray-400">
                        {booking.email}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {booking.kegiatan}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {booking.gedung}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {booking.tanggal}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                        {booking.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-wrap justify-center gap-2">
                        <button
                          onClick={() =>
                            setSelectedBooking(booking)
                          }
                          className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
                        >
                          Detail
                        </button>

                        <button
                          onClick={() =>
                            handleApprove(booking)
                          }
                          className="rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-600 hover:bg-green-100"
                        >
                          Setujui
                        </button>

                        <button
                          onClick={() =>
                            handleReject(booking)
                          }
                          className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                        >
                          Tolak
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(booking)
                          }
                          className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-16 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-3xl">
                        📋
                      </div>

                      <h3 className="font-semibold text-gray-700">
                        Belum ada pengajuan
                      </h3>

                      <p className="mt-2 max-w-md text-sm text-gray-400">
                        Data booking akan muncul setelah
                        sistem terhubung dengan database.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DETAIL */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
            {/* HEADER MODAL */}
            <div className="flex items-center justify-between border-b px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Detail Booking
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Informasi lengkap pengajuan peminjaman
                </p>
              </div>

              <button
                onClick={() => setSelectedBooking(null)}
                className="text-xl text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* ISI DETAIL */}
            <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase text-gray-400">
                  Nama Peminjam
                </p>

                <p className="mt-1 font-medium text-gray-800">
                  {selectedBooking.nama}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-gray-400">
                  Email
                </p>

                <p className="mt-1 text-gray-700">
                  {selectedBooking.email}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-gray-400">
                  Kegiatan
                </p>

                <p className="mt-1 text-gray-700">
                  {selectedBooking.kegiatan}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-gray-400">
                  Gedung
                </p>

                <p className="mt-1 text-gray-700">
                  {selectedBooking.gedung}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-gray-400">
                  Tanggal
                </p>

                <p className="mt-1 text-gray-700">
                  {selectedBooking.tanggal}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-gray-400">
                  Waktu
                </p>

                <p className="mt-1 text-gray-700">
                  {selectedBooking.jam_mulai} -{" "}
                  {selectedBooking.jam_selesai}
                </p>
              </div>

              <div className="md:col-span-2">
                <p className="text-xs font-medium uppercase text-gray-400">
                  Deskripsi
                </p>

                <p className="mt-1 text-gray-700">
                  {selectedBooking.deskripsi}
                </p>
              </div>

              <div className="md:col-span-2">
                <p className="text-xs font-medium uppercase text-gray-400">
                  Status
                </p>

                <span className="mt-2 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                  {selectedBooking.status}
                </span>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3 border-t px-6 py-4">
              <button
                onClick={() =>
                  handleReject(selectedBooking)
                }
                className="rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-100"
              >
                Tolak
              </button>

              <button
                onClick={() =>
                  handleApprove(selectedBooking)
                }
                className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700"
              >
                Setujui
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}