"use client";

import { useState } from "react";

const filters = [
  { label: "Semua", value: "semua" },
  { label: "Menunggu", value: "menunggu" },
  { label: "Disetujui", value: "disetujui" },
  { label: "Ditolak", value: "ditolak" },
];

export default function Management() {
  const [activeFilter, setActiveFilter] = useState("semua");
  const [search, setSearch] = useState("");

  // Nanti data ini berasal dari database
  const pengajuan = [];

  const filteredPengajuan = pengajuan.filter((item) => {
    const cocokStatus =
      activeFilter === "semua" || item.status === activeFilter;

    const cocokSearch =
      item.gedung?.toLowerCase().includes(search.toLowerCase()) ||
      item.namaPeminjam?.toLowerCase().includes(search.toLowerCase()) ||
      item.keperluan?.toLowerCase().includes(search.toLowerCase());

    return cocokStatus && cocokSearch;
  });

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="mx-auto max-w-7xl">

        {/*  HEADER */}
        <header className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Approval Management
              </h1>

              <p className="mt-2 text-gray-500">
                Tinjau dan kelola pengajuan peminjaman gedung.
                Memrikan persetujuan atau penolakan terhadap pengajuan yang masuk.
              </p>
            </div>

            {/* Admin Badge */}
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                A
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Administrator
                </p>

                <p className="text-xs text-gray-500">
                  Admin KARISMA
                </p>
              </div>
            </div>

          </div>
        </header>


        
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <SummaryCard
            title="Total Pengajuan"
            value={pengajuan.length}
            description="Seluruh pengajuan"
            icon="📋"
          />

          <SummaryCard
            title="Menunggu"
            value={
              pengajuan.filter((item) => item.status === "menunggu").length
            }
            description="Perlu ditinjau"
            icon="⏳"
          />

          <SummaryCard
            title="Disetujui"
            value={
              pengajuan.filter((item) => item.status === "disetujui").length
            }
            description="Pengajuan diterima"
            icon="✓"
          />

          <SummaryCard
            title="Ditolak"
            value={
              pengajuan.filter((item) => item.status === "ditolak").length
            }
            description="Pengajuan ditolak"
            icon="✕"
          />

        </section>


        {/*  DAFTAR PENGAJUAN  */}
        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* Header daftar */}
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

              {/* Search */}
              <div className="relative w-full lg:w-80">
                <input
                  type="text"
                  placeholder="Cari pengajuan..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 pl-10 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                />

                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  🔍
                </span>
              </div>

            </div>


            {/* Filter */}
            <div className="mt-6 flex flex-wrap gap-2">

              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
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


          {/* Isi daftar */}
          <div className="p-6">

            {filteredPengajuan.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-4">

                {filteredPengajuan.map((item) => (
                  <ApprovalCard
                    key={item.id}
                    pengajuan={item}
                  />
                ))}

              </div>
            )}

          </div>

        </section>

      </div>
    </main>
  );
}

function SummaryCard({ title, value, description, icon }) {
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


function EmptyState() {
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
        Belum ada pengajuan
      </h3>

      <p className="mt-2 max-w-md text-sm text-gray-500">
        Pengajuan peminjaman yang masuk akan muncul di halaman ini.
      </p>

    </div>
  );
}

/*   APPROVAL CARD*/

function ApprovalCard({ pengajuan }) {
  return (
    <div className="rounded-xl border border-gray-200 p-5 transition hover:shadow-sm">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        {/* Informasi */}
        <div className="min-w-0">

          <div className="flex flex-wrap items-center gap-3">

            <h3 className="text-lg font-semibold text-gray-900">
              {pengajuan.gedung}
            </h3>

            <StatusBadge status={pengajuan.status} />

          </div>

          <p className="mt-2 text-sm text-gray-600">
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

        </div>


        {/* Tombol */}
        <div className="flex shrink-0 flex-wrap gap-2">

          <button
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Detail
          </button>

          {pengajuan.status === "menunggu" && (
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
    menunggu: "bg-yellow-100 text-yellow-700",
    disetujui: "bg-green-100 text-green-700",
    ditolak: "bg-red-100 text-red-700",
  };

  const labels = {
    menunggu: "Menunggu",
    disetujui: "Disetujui",
    ditolak: "Ditolak",
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