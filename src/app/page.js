"use client";

import { useEffect, useMemo, useState } from "react";

import { getBookings } from "./admin/bookings/actions";

const filters = [
  { label: "Semua", value: "semua" },
  { label: "Menunggu", value: "pending" },
  { label: "Disetujui", value: "approved" },
  { label: "Ditolak", value: "rejected" },
];

export default function Management() {
  const [activeFilter, setActiveFilter] = useState("semua");
  const [search, setSearch] = useState("");
  const [pengajuan, setPengajuan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    try {
      setLoading(true);
      setError("");

      const data = await getBookings();

      const dataBookings = Array.isArray(data) ? data : [];

      const formattedBookings = dataBookings.map((booking) => ({
        id: booking.id,
        namaPeminjam: booking.user_name || "-",
        keperluan: booking.event_name || "-",
        gedung: booking.venue_name || "-",
        lokasiGedung: booking.venue_location || "-",
        tanggal: booking.date || "-",
        jamMulai: booking.start_time || "-",
        jamSelesai: booking.end_time || "-",
        jam:
          booking.start_time && booking.end_time
            ? `${booking.start_time} - ${booking.end_time}`
            : "-",
        jumlahPeserta: booking.participant_count ?? 0,
        deskripsi: booking.purpose || "-",
        status: booking.status || "pending",
        catatanAdmin: booking.admin_note || "",
        createdAt: booking.created_at || "-",
        userId: booking.user_id,
        venueId: booking.venue_id,
      }));

      setPengajuan(formattedBookings);
    } catch (err) {
      console.error("Gagal mengambil data booking:", err);

      setError(
        err.message || "Gagal mengambil data pengajuan."
      );
    } finally {
      setLoading(false);
    }
  }

  const filteredPengajuan = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return pengajuan.filter((item) => {
      const cocokStatus =
        activeFilter === "semua" ||
        item.status === activeFilter;

      const cocokSearch =
        item.gedung?.toLowerCase().includes(keyword) ||
        item.namaPeminjam?.toLowerCase().includes(keyword) ||
        item.keperluan?.toLowerCase().includes(keyword) ||
        item.status?.toLowerCase().includes(keyword);

      return cocokStatus && cocokSearch;
    });
  }, [pengajuan, activeFilter, search]);

  const totalPengajuan = pengajuan.length;

  const totalMenunggu = pengajuan.filter(
    (item) => item.status === "pending"
  ).length;

  const totalDisetujui = pengajuan.filter(
    (item) => item.status === "approved"
  ).length;

  const totalDitolak = pengajuan.filter(
    (item) => item.status === "rejected"
  ).length;

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <header className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Approval Management
              </h1>

              <p className="mt-2 text-gray-500">
                Tinjau dan kelola pengajuan peminjaman gedung.
                Berikan persetujuan atau penolakan terhadap
                pengajuan yang masuk.
              </p>
            </div>

            {/* ADMIN BADGE */}
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                A
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Administrator
                </p>

                <p className="text-xs text-gray-500">
                  Admin RaVenue
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* ERROR */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            <p className="font-semibold">
              Gagal mengambil data booking
            </p>

            <p className="mt-1">
              {error}
            </p>

            <button
              onClick={loadBookings}
              className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* SUMMARY */}
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            title="Total Pengajuan"
            value={loading ? "..." : totalPengajuan}
            description="Seluruh pengajuan"
            icon="📋"
          />

          <SummaryCard
            title="Menunggu"
            value={loading ? "..." : totalMenunggu}
            description="Perlu ditinjau"
            icon="⏳"
          />

          <SummaryCard
            title="Disetujui"
            value={loading ? "..." : totalDisetujui}
            description="Pengajuan diterima"
            icon="✓"
          />

          <SummaryCard
            title="Ditolak"
            value={loading ? "..." : totalDitolak}
            description="Pengajuan ditolak"
            icon="✕"
          />
        </section>

        {/* DAFTAR PENGAJUAN */}
        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* HEADER DAFTAR */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Daftar Pengajuan
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Periksa pengajuan peminjaman yang masuk.
                </p>
              </div>

              {/* SEARCH */}
              <div className="relative w-full lg:w-80">

                {/* SVG KACA PEMBESAR */}
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                    />
                  </svg>
                </span>

                <input
                  type="text"
                  placeholder="Cari pengajuan..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 pl-10 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                />
              </div>
            </div>

            {/* FILTER */}
            <div className="mt-6 flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() =>
                    setActiveFilter(filter.value)
                  }
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                    activeFilter === filter.value
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* ISI */}
          <div className="p-6">
            {loading ? (
              <LoadingState />
            ) : filteredPengajuan.length === 0 ? (
              <EmptyState
                hasSearch={
                  search.trim() !== "" ||
                  activeFilter !== "semua"
                }
              />
            ) : (
              <div className="space-y-4">
                {filteredPengajuan.map((item) => (
                  <ApprovalCard
                    key={item.id}
                    pengajuan={item}
                    onDetail={() =>
                      setSelectedBooking(item)
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* DETAIL MODAL */}
      {selectedBooking && (
        <DetailModal
          pengajuan={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </main>
  );
}

/* =====================================================
   SUMMARY CARD
===================================================== */

function SummaryCard({
  title,
  value,
  description,
  icon,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {value}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            {description}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-lg">
          {icon}
        </div>

      </div>
    </div>
  );
}

/* =====================================================
   LOADING
===================================================== */

function LoadingState() {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center">

      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-700" />

      <p className="mt-4 text-sm text-gray-500">
        Memuat data pengajuan...
      </p>

    </div>
  );
}

/* =====================================================
   EMPTY STATE
===================================================== */

function EmptyState({ hasSearch }) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 px-6 text-center">

      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-8 w-8 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>

      </div>

      <h3 className="text-lg font-semibold text-gray-700">
        {hasSearch
          ? "Pengajuan tidak ditemukan"
          : "Belum ada pengajuan"}
      </h3>

      <p className="mt-2 max-w-md text-sm text-gray-500">
        {hasSearch
          ? "Tidak ada pengajuan yang sesuai dengan pencarian atau filter."
          : "Pengajuan peminjaman yang masuk akan muncul di halaman ini."}
      </p>

    </div>
  );
}

/* =====================================================
   APPROVAL CARD
===================================================== */

function ApprovalCard({
  pengajuan,
  onDetail,
}) {
  return (
    <div className="rounded-xl border border-gray-200 p-5 transition hover:shadow-sm">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        {/* INFORMASI */}
        <div className="min-w-0">

          <div className="flex flex-wrap items-center gap-3">

            <h3 className="text-lg font-semibold text-gray-900">
              {pengajuan.gedung}
            </h3>

            <StatusBadge
              status={pengajuan.status}
            />

          </div>

          <p className="mt-2 text-sm font-medium text-gray-700">
            {pengajuan.keperluan}
          </p>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">

            <span>
              👤 {pengajuan.namaPeminjam}
            </span>

            <span>
              📅 {pengajuan.tanggal}
            </span>

            <span>
              🕐 {pengajuan.jam}
            </span>

          </div>

          <p className="mt-3 text-xs text-gray-400">
            Peserta: {pengajuan.jumlahPeserta}
          </p>

        </div>

        {/* TOMBOL */}
        <div className="flex shrink-0 flex-wrap gap-2">

          <button
            onClick={onDetail}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Detail
          </button>

          {pengajuan.status === "pending" && (
            <>
              <button
                className="rounded-lg border border-green-600 bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
              >
                Setujui
              </button>

              <button
                className="rounded-lg border border-red-600 bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Tolak
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

/* =====================================================
   STATUS BADGE
===================================================== */

function StatusBadge({ status }) {
  const styles = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  const labels = {
    pending: "Menunggu",
    approved: "Disetujui",
    rejected: "Ditolak",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {labels[status] || status}
    </span>
  );
}

/* =====================================================
   DETAIL MODAL
===================================================== */

function DetailModal({
  pengajuan,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b px-6 py-5">

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Detail Pengajuan
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Informasi lengkap pengajuan peminjaman
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-gray-500 hover:bg-gray-100"
          >
            ×
          </button>

        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">

          <DetailItem
            label="Peminjam"
            value={pengajuan.namaPeminjam}
          />

          <DetailItem
            label="Gedung"
            value={pengajuan.gedung}
          />

          <DetailItem
            label="Lokasi Gedung"
            value={pengajuan.lokasiGedung}
          />

          <DetailItem
            label="Kegiatan"
            value={pengajuan.keperluan}
          />

          <DetailItem
            label="Tanggal"
            value={pengajuan.tanggal}
          />

          <DetailItem
            label="Waktu"
            value={pengajuan.jam}
          />

          <DetailItem
            label="Jumlah Peserta"
            value={String(pengajuan.jumlahPeserta)}
          />

          <DetailItem
            label="Status"
            value={
              <StatusBadge
                status={pengajuan.status}
              />
            }
          />

          <div className="sm:col-span-2">

            <p className="mb-2 text-sm font-medium text-gray-500">
              Keperluan / Deskripsi
            </p>

            <div className="rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-700">
              {pengajuan.deskripsi}
            </div>

          </div>

          {pengajuan.catatanAdmin && (
            <div className="sm:col-span-2">

              <p className="mb-2 text-sm font-medium text-gray-500">
                Catatan Admin
              </p>

              <div className="rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-700">
                {pengajuan.catatanAdmin}
              </div>

            </div>
          )}

        </div>

        {/* FOOTER */}
        <div className="flex justify-end border-t px-6 py-4">

          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Tutup
          </button>

        </div>

      </div>
    </div>
  );
}

/* =====================================================
   DETAIL ITEM
===================================================== */

function DetailItem({
  label,
  value,
}) {
  return (
    <div>

      <p className="mb-1 text-sm font-medium text-gray-500">
        {label}
      </p>

      <div className="text-sm font-medium text-gray-800">
        {value}
      </div>

    </div>
  );
}