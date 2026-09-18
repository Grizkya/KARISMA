"use client";

import { useState } from "react";
import Link from "next/link";

/* ==========================================
   1. DATA DUMMY PEMINJAMAN AKUN AKTIF
========================================== */
const currentUser = {
  id: "USR-001",
  nama: "Ahmad Mujahid",
  email: "ahmad@unram.ac.id",
};

const initialNotifications = [
  {
    id: 1,
    userId: "USR-001",
    kodeBooking: "REV-2026-001",
    gedung: "Auditorium Yusuf Abu Bakar",
    kegiatan: "Seminar Nasional SRE & DevOps",
    penanggungJawab: "Ahmad Mujahid",
    instansi: "Himpunan Mahasiswa Informatika",
    tanggalPengajuan: "20 September 2026",
    tanggalPelaksanaan: "24 September 2026",
    jamPelaksanaan: "08:00 - 17:00 WITA",
    status: "Disetujui", // Disetujui | Menunggu | Ditolak
    waktu: "10 menit yang lalu",
    isRead: false,
    catatanAdmin: "Surat izin penggunaan telah diterbitkan oleh bagian Sarpras. Silakan ambil fisik surat di Gedung Rektorat Lt. 2.",
  },
  {
    id: 2,
    userId: "USR-001",
    kodeBooking: "REV-2026-004",
    gedung: "Gedung Dome H. Sunarpi",
    kegiatan: "Workshop Cloud Native & Kubernetes",
    penanggungJawab: "Ahmad Mujahid",
    instansi: "Informatics Study Group",
    tanggalPengajuan: "15 September 2026",
    tanggalPelaksanaan: "28 September 2026",
    jamPelaksanaan: "09:00 - 15:00 WITA",
    status: "Menunggu",
    waktu: "2 jam yang lalu",
    isRead: false,
    catatanAdmin: "Berkas permohonan sedang diverifikasi oleh Kasubbag Sarpras. Mohon menunggu konfirmasi maksimal 2x24 jam.",
  },
  {
    id: 3,
    userId: "USR-001",
    kodeBooking: "REV-2026-008",
    gedung: "Arena Budaya",
    kegiatan: "Latihan Rutin Seni Tari",
    penanggungJawab: "Ahmad Mujahid",
    instansi: "UKM Seni & Budaya",
    tanggalPengajuan: "05 September 2026",
    tanggalPelaksanaan: "12 September 2026",
    jamPelaksanaan: "16:00 - 18:00 WITA",
    status: "Ditolak",
    waktu: "1 minggu yang lalu",
    isRead: true,
    catatanAdmin: "Jadwal yang diajukan berbenturan dengan acara universitas yang sudah disetujui sebelumnya.",
  },
];

/* ==========================================
   2. KOMPONEN MODAL DETAIL NOTIFIKASI
========================================== */
function NotificationDetailModal({ item, onClose }) {
  if (!item) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case "Disetujui":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "Menunggu":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "Ditolak":
        return "bg-rose-100 text-rose-800 border-rose-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Box Utama Modal */}
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 overflow-hidden relative space-y-5 my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Tombol Tutup (X) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-slate-100 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header Modal */}
        <div className="space-y-1 pr-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              {item.kodeBooking}
            </span>
            <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${getStatusBadge(item.status)}`}>
              {item.status}
            </span>
          </div>
          <h3 className="text-xl font-extrabold text-[#133D86]">
            {item.gedung}
          </h3>
          <p className="text-xs text-gray-500">Diajukan pada {item.tanggalPengajuan}</p>
        </div>

        {/* Rincian Peminjaman */}
        <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-gray-400 block">Nama Kegiatan:</span>
              <strong className="text-gray-800">{item.kegiatan}</strong>
            </div>
            <div>
              <span className="text-gray-400 block">Organisasi/Instansi:</span>
              <strong className="text-gray-800">{item.instansi}</strong>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200/60">
            <div>
              <span className="text-gray-400 block">Tanggal Pelaksanaan:</span>
              <strong className="text-[#133D86] font-bold">{item.tanggalPelaksanaan}</strong>
            </div>
            <div>
              <span className="text-gray-400 block">Waktu / Jam:</span>
              <strong className="text-gray-800">{item.jamPelaksanaan}</strong>
            </div>
          </div>
        </div>

        {/* Catatan / Pesan Admin */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700 block">
            Catatan Petugas Sarpras:
          </label>
          <p className="text-xs text-gray-600 bg-blue-50/60 p-3.5 rounded-xl border border-blue-100 leading-relaxed">
            {item.catatanAdmin}
          </p>
        </div>

        {/* Tombol Action (Tutup) */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-[#133D86] hover:bg-[#0d2a5e] text-white text-xs font-semibold px-6 py-2.5 rounded-xl transition"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}

/* ==========================================
   3. HALAMAN NOTIFIKASI UTAMA
========================================== */
export default function NotificationPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState("Semua");

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, isRead: true } : n))
    );
  };

  const filteredData = notifications.filter((item) => {
    if (filter === "Semua") return true;
    return item.status === filter;
  });

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Disetujui":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "Menunggu":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "Ditolak":
        return "bg-rose-100 text-rose-800 border-rose-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header Seksi */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <Link href="/" className="hover:text-[#133D86] transition">Beranda</Link>
              <span>/</span>
              <span className="text-[#133D86] font-semibold">Notifikasi Saya</span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#133D86]">
              Notifikasi Peminjaman
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Akun: <strong className="text-gray-700">{currentUser.nama}</strong>
            </p>
          </div>

          <button
            onClick={markAllAsRead}
            className="text-xs font-semibold text-[#133D86] bg-slate-50 border border-gray-200 px-4 py-2 rounded-xl hover:bg-slate-100 transition"
          >
            Tandai Semua Dibaca
          </button>
        </div>

        {/* Tab Filter Status */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {["Semua", "Disetujui", "Menunggu", "Ditolak"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition ${
                filter === tab
                  ? "bg-[#133D86] text-white shadow-sm"
                  : "bg-white text-gray-600 hover:bg-slate-100 border border-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* List Kartu Notifikasi */}
        <div className="space-y-3">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md cursor-pointer transition flex items-start justify-between gap-4 ${
                  !item.isRead ? "border-l-4 border-l-[#F4B042] border-gray-100" : "border-gray-100"
                }`}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      {item.kodeBooking}
                    </span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#133D86] leading-snug">
                    {item.gedung}
                  </h3>

                  <p className="text-xs text-gray-600 line-clamp-1">
                    Kegiatan: {item.kegiatan}
                  </p>

                  <div className="text-[11px] text-gray-400 pt-1">
                    {item.waktu}
                  </div>
                </div>

                <div className="self-center text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl p-10 text-center text-gray-400 border border-gray-100">
              Tidak ada notifikasi peminjaman.
            </div>
          )}
        </div>

        {/* Render Modal Detail */}
        <NotificationDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />

      </div>
    </main>
  );
}