"use client";

import { useMemo, useState } from "react";

export default function StatusBookingPage() {
  const [filter, setFilter] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");


  const bookings = [];

  /*
  ============================================================
  STATUS DATABASE -> STATUS TAMPILAN
  ============================================================
  */

  const statusConfig = {
    pending: {
      label: "Menunggu Verifikasi",
      color: "amber",
      description:
        "Berkas berhasil diunggah dan sedang menunggu verifikasi.",
    },

    processing: {
      label: "Proses Review",
      color: "blue",
      description:
        "Berkas sedang ditinjau oleh pihak pengelola gedung.",
    },

    approved: {
      label: "Disetujui",
      color: "emerald",
      description:
        "Pengajuan disetujui dan jadwal peminjaman resmi terkunci.",
    },

    rejected: {
      label: "Ditolak / Revisi",
      color: "rose",
      description:
        "Pengajuan ditolak atau membutuhkan perbaikan berkas.",
    },
  };

  /*
  ============================================================
  FILTER STATUS
  ============================================================
  */

  const filters = [
    {
      value: "Semua",
      label: "Semua",
    },
    {
      value: "pending",
      label: "Menunggu Verifikasi",
    },
    {
      value: "processing",
      label: "Proses Review",
    },
    {
      value: "approved",
      label: "Disetujui",
    },
    {
      value: "rejected",
      label: "Ditolak / Revisi",
    },
  ];

  /*
  ============================================================
  DATA HASIL FILTER
  ============================================================
  */

  const filteredBookings = useMemo(() => {
    const search = searchQuery.toLowerCase().trim();

    return bookings.filter((item) => {
      const matchesFilter =
        filter === "Semua" || item.status === filter;

      const matchesSearch =
        String(item.id || "")
          .toLowerCase()
          .includes(search) ||
        String(item.event_name || "")
          .toLowerCase()
          .includes(search) ||
        String(item.venue_name || "")
          .toLowerCase()
          .includes(search);

      return matchesFilter && matchesSearch;
    });
  }, [bookings, filter, searchQuery]);

  /*
  ============================================================
  HITUNG JUMLAH BERDASARKAN STATUS
  ============================================================
  */

  const getCount = (status) => {
    if (status === "Semua") {
      return bookings.length;
    }

    return bookings.filter(
      (item) => item.status === status
    ).length;
  };

  /*
  ============================================================
  FORMAT TANGGAL
  ============================================================
  */

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  /*
  ============================================================
  FORMAT STATUS
  ============================================================
  */

  const getStatusLabel = (status) => {
    return (
      statusConfig[status]?.label ||
      "Status Tidak Diketahui"
    );
  };

  /*
  ============================================================
  WARNA STATUS
  ============================================================
  */

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "border-amber-200 bg-amber-50 text-amber-700";

      case "processing":
        return "border-blue-200 bg-blue-50 text-blue-700";

      case "approved":
        return "border-emerald-200 bg-emerald-50 text-emerald-700";

      case "rejected":
        return "border-rose-200 bg-rose-50 text-rose-700";

      default:
        return "border-slate-200 bg-slate-50 text-slate-600";
    }
  };

  /*
  ============================================================
  TIMELINE STATUS
  ============================================================
  */

  const getTimelineStep = (status) => {
    switch (status) {
      case "pending":
        return 1;

      case "processing":
        return 2;

      case "approved":
        return 4;

      case "rejected":
        return 3;

      default:
        return 0;
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="text-sm font-semibold text-blue-600">
                RaVenue Universitas Mataram
              </p>

              <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                Status Peminjaman Saya
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Pantau status pengajuan peminjaman gedung
                yang telah kamu ajukan.
              </p>
            </div>

            <a
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
              + Ajukan Peminjaman Baru
            </a>

          </div>

          {/* SEARCH */}

          <div className="mt-6 border-t border-slate-100 pt-5">

            <input
              type="text"
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              placeholder="Cari gedung, nama kegiatan, atau ID pengajuan..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />

          </div>

          {/* FILTER */}

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">

            {filters.map((item) => {
              const active = filter === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() =>
                    setFilter(item.value)
                  }
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition ${
                    active
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {item.label}

                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                      active
                        ? "bg-white/15 text-white"
                        : "bg-white text-slate-500"
                    }`}
                  >
                    {getCount(item.value)}
                  </span>
                </button>
              );
            })}

          </div>

        </section>

        {/* =====================================================
            STATUS INFO
        ====================================================== */}

        <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

          {Object.entries(statusConfig).map(
            ([status, config]) => {

              const colorClasses = {
                amber:
                  "border-amber-100 bg-amber-50 text-amber-700",
                blue:
                  "border-blue-100 bg-blue-50 text-blue-700",
                emerald:
                  "border-emerald-100 bg-emerald-50 text-emerald-700",
                rose:
                  "border-rose-100 bg-rose-50 text-rose-700",
              };

              const dotClasses = {
                amber: "bg-amber-500",
                blue: "bg-blue-500",
                emerald: "bg-emerald-500",
                rose: "bg-rose-500",
              };

              return (
                <div
                  key={status}
                  className={`rounded-2xl border p-4 ${colorClasses[config.color]}`}
                >

                  <div className="flex items-center gap-2">

                    <span
                      className={`h-2.5 w-2.5 rounded-full ${dotClasses[config.color]}`}
                    />

                    <p className="text-sm font-semibold">
                      {config.label}
                    </p>

                  </div>

                  <p className="mt-2 text-xs leading-5">
                    {config.description}
                  </p>

                </div>
              );
            }
          )}

        </section>

        {/* =====================================================
            DAFTAR PENGAJUAN
        ====================================================== */}

        <section className="mt-8">

          <div className="mb-4">

            <h2 className="text-lg font-bold text-slate-900">
              Daftar Pengajuan
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Pengajuan peminjaman yang terkait dengan akun
              pengguna yang sedang login.
            </p>

          </div>

          {filteredBookings.length === 0 ? (

            /* =================================================
               EMPTY STATE
            ================================================== */

            <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">

                <span className="text-2xl">
                  📋
                </span>

              </div>

              <h3 className="mt-4 text-base font-bold text-slate-800">
                Belum ada pengajuan
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Pengajuan peminjaman gedung yang kamu lakukan
                akan muncul di halaman ini.
              </p>

              <a
                href="/"
                className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
                Ajukan Peminjaman
              </a>

            </div>

          ) : (

            /* =================================================
               BOOKING LIST
            ================================================== */

            <div className="space-y-5">

              {filteredBookings.map((item) => {

                const currentStep =
                  getTimelineStep(item.status);

                return (
                  <article
                    key={item.id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                  >

                    {/* CARD HEADER */}

                    <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-start sm:justify-between">

                      <div>

                        <div className="flex flex-wrap items-center gap-2">

                          <span className="font-mono text-xs font-bold text-slate-400">
                            #{item.id}
                          </span>

                          <span className="text-slate-300">
                            •
                          </span>

                          <span className="text-xs text-slate-500">
                            Pengajuan Peminjaman
                          </span>

                        </div>

                        <h3 className="mt-2 text-xl font-bold text-slate-900">
                          {item.venue_name || "Nama Gedung"}
                        </h3>

                      </div>

                      <span
                        className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusClass(
                          item.status
                        )}`}
                      >

                        <span className="h-1.5 w-1.5 rounded-full bg-current" />

                        {getStatusLabel(item.status)}

                      </span>

                    </div>

                    {/* DETAIL */}

                    <div className="grid gap-5 p-5 sm:grid-cols-2 lg:grid-cols-4">

                      <div>
                        <p className="text-xs font-medium text-slate-400">
                          Nama Kegiatan
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {item.event_name || "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-slate-400">
                          Tanggal
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {formatDate(item.date)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-slate-400">
                          Waktu Mulai
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {item.start_time || "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-slate-400">
                          Waktu Selesai
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {item.end_time || "-"}
                        </p>
                      </div>

                    </div>

                    {/* TIMELINE */}

                    <div className="border-t border-slate-100 px-5 py-6">

                      <p className="mb-5 text-xs font-bold uppercase tracking-wider text-slate-400">
                        Alur Pengajuan
                      </p>

                      <div className="grid grid-cols-4 gap-2">

                        {[
                          "Pengajuan",
                          "Verifikasi",
                          "Review",
                          "Keputusan",
                        ].map((step, index) => {

                          const stepNumber = index + 1;

                          const completed =
                            currentStep >= stepNumber;

                          return (
                            <div
                              key={step}
                              className="relative text-center"
                            >

                              <div
                                className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                                  completed
                                    ? "bg-blue-600 text-white"
                                    : "bg-slate-100 text-slate-400"
                                }`}
                              >
                                {completed
                                  ? "✓"
                                  : stepNumber}
                              </div>

                              <p
                                className={`mt-2 text-[10px] font-semibold sm:text-xs ${
                                  completed
                                    ? "text-slate-700"
                                    : "text-slate-400"
                                }`}
                              >
                                {step}
                              </p>

                            </div>
                          );
                        })}

                      </div>

                    </div>

                    {/* DESCRIPTION */}

                    {item.description && (
                      <div className="mx-5 mb-5 rounded-xl border border-slate-100 bg-slate-50 p-4">

                        <p className="text-xs font-semibold text-slate-700">
                          Deskripsi Kegiatan
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-600">
                          {item.description}
                        </p>

                      </div>
                    )}

                    {/* ADMIN NOTE */}

                    {item.admin_note && (
                      <div className="mx-5 mb-5 rounded-xl border border-blue-100 bg-blue-50 p-4">

                        <p className="text-xs font-semibold text-blue-800">
                          Catatan Pengelola
                        </p>

                        <p className="mt-1 text-xs leading-5 text-blue-700">
                          {item.admin_note}
                        </p>

                      </div>
                    )}

                  </article>
                );
              })}

            </div>
          )}

        </section>

        {/* =====================================================
            INFORMATION
        ====================================================== */}

        <section className="mt-8 grid gap-4 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-5">

            <p className="text-sm font-bold text-slate-800">
              💡 Informasi Status
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Status pengajuan akan diperbarui oleh pihak
              pengelola setelah proses verifikasi dan review.
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">

            <p className="text-sm font-bold text-slate-800">
              📄 Kelengkapan Berkas
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Pastikan dokumen yang diperlukan telah diunggah
              saat melakukan pengajuan.
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">

            <p className="text-sm font-bold text-slate-800">
              🏢 Pengelola Gedung
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Hubungi pihak pengelola jika membutuhkan informasi
              mengenai proses peminjaman.
            </p>

          </div>

        </section>

      </div>
    </main>
  );
}