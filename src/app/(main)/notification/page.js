"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NotificationCard from "@/components/NotificationCard";
import { apiFetch } from "@/lib/api";

export default function NotificationPage() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        // ==============================
        // 1. CEK AUTH & AMBIL TOKEN
        // ==============================
        let token = localStorage.getItem("token");
        if (!token) {
          const match = document.cookie.match(/(?:^|; )session_token=([^;]*)/);
          if (match && match[1] && match[1] !== "undefined" && match[1] !== "null") {
            token = decodeURIComponent(match[1]);
            localStorage.setItem("token", token);
          }
        }

        if (!token || token === "undefined" || token === "null" || token.trim() === "") {
          router.replace("/login?redirect=/notification");
          return;
        }

        // ==============================
        // 2. IDENTIFIKASI USER LOGIN
        // ==============================
        let currentUserId = null;
        let currentUserEmail = null;
        let currentUserName = null;

        // A. Cek dari localStorage "user"
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            const u = JSON.parse(storedUser);
            currentUserId = u.id ?? u.user_id ?? null;
            currentUserEmail = u.email ? String(u.email).toLowerCase().trim() : null;
            currentUserName = u.name ? String(u.name).toLowerCase().trim() : null;
          } catch (e) {}
        }

        // B. Cek dari cookie "user_profile"
        if (!currentUserId || !currentUserEmail) {
          const matchProfile = document.cookie.match(/(?:^|; )user_profile=([^;]*)/);
          if (matchProfile && matchProfile[1]) {
            try {
              const u = JSON.parse(decodeURIComponent(matchProfile[1]));
              currentUserId = currentUserId ?? u.id ?? u.user_id ?? null;
              currentUserEmail = currentUserEmail || (u.email ? String(u.email).toLowerCase().trim() : null);
              currentUserName = currentUserName || (u.name ? String(u.name).toLowerCase().trim() : null);
            } catch (e) {}
          }
        }

        // C. Cek dari payload JWT Token
        if (token && (!currentUserId || !currentUserEmail)) {
          try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            currentUserId = currentUserId ?? payload.user_id ?? payload.id ?? payload.sub ?? null;
            currentUserEmail = currentUserEmail || (payload.email ? String(payload.email).toLowerCase().trim() : null);
            currentUserName = currentUserName || (payload.name ? String(payload.name).toLowerCase().trim() : null);
          } catch (e) {}
        }

        // ==============================
        // 2.1 TANDAI NOTIFIKASI SUDAH DIBACA (disimpan permanen di localStorage & cookie)
        // ==============================
        let notifUserKey = "default_user";
        if (currentUserId) {
          notifUserKey = `id_${currentUserId}`;
        } else if (currentUserEmail) {
          notifUserKey = `email_${String(currentUserEmail).toLowerCase().trim().replace(/[^a-z0-9]/g, "_")}`;
        } else if (currentUserName) {
          notifUserKey = `name_${String(currentUserName).toLowerCase().trim().replace(/[^a-z0-9]/g, "_")}`;
        }

        try {
          localStorage.setItem(`notif_read_${notifUserKey}`, "true");
          document.cookie = `notif_read_${notifUserKey}=true; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
          window.dispatchEvent(new Event("notifications_read"));
        } catch (e) {
          console.error("Error setting notification as read", e);
        }

        // ==============================
        // 3. FETCH DATA BOOKING DARI API
        // ==============================
        const result = await apiFetch("/bookings");

        console.log("Response API bookings:", result);
        console.log("Current User:", { currentUserId, currentUserEmail, currentUserName });

        // Mengantisipasi response array langsung atau { data: [...] }
        const bookings = Array.isArray(result)
          ? result
          : (result?.data || result?.bookings || []);

        // ==============================
        // 4. FILTER BOOKING MILIK USER LOGIN
        // ==============================
        const myBookings = bookings.filter((item) => {
          // 1. Cocokkan ID Pengguna (user_id / owner_id)
          const itemUserId = item.user_id ?? item.owner_id ?? item.user?.id ?? item.owner?.id;
          if (currentUserId !== null && itemUserId !== null && itemUserId !== undefined) {
            if (String(itemUserId) === String(currentUserId)) {
              return true;
            }
          }

          // 2. Cocokkan Email Pengguna
          const itemEmail = item.email ?? item.user_email ?? item.user?.email;
          if (currentUserEmail && itemEmail) {
            if (String(itemEmail).toLowerCase().trim() === currentUserEmail) {
              return true;
            }
          }

          // 3. Cocokkan Nama Pengguna
          const itemName = item.user_name ?? item.nama ?? item.user?.name;
          if (currentUserName && itemName) {
            if (String(itemName).toLowerCase().trim() === currentUserName) {
              return true;
            }
          }

          return false;
        });

        // Urutkan notifikasi: pengajuan terbaru berada paling atas
        myBookings.sort((a, b) => {
          const timeA = new Date(b.created_at || b.date || 0).getTime();
          const timeB = new Date(a.created_at || a.date || 0).getTime();
          return timeA - timeB;
        });

        console.log("Hasil booking milik user login:", myBookings);
        setData(myBookings);
      } catch (err) {
        console.error("ERROR API BOOKINGS:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [router]);

  // ==============================
  // STATUS BOOKING
  // ==============================
  function getStatus(status) {
    const s = String(status || "").toLowerCase().trim();
    switch (s) {
      case "pending":
        return "Menunggu Verifikasi";
      case "processing":
        return "Proses Review";
      case "approved":
        return "Disetujui (Approved)";
      case "rejected":
        return "Ditolak (Rejected) / Revisi";
      default:
        return status || "Menunggu Verifikasi";
    }
  }

  // ==============================
  // STYLE STATUS TAILWIND
  // ==============================
  function getStatusStyle(status) {
    const s = String(status || "").toLowerCase().trim();
    switch (s) {
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "processing":
        return "bg-blue-100 text-blue-700";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-amber-100 text-amber-800";
    }
  }

  // ==============================
  // LOADING STATE
  // ==============================
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-12 md:px-12 flex flex-col items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-[#133D86] mb-4"></div>
        <p className="text-sm font-medium text-gray-500">Memuat status peminjaman...</p>
      </div>
    );
  }

  // ==============================
  // ERROR STATE
  // ==============================
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-10 md:px-12">
        <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800 shadow-sm">
          <h3 className="mb-2 text-base font-bold">Gagal Memuat Notifikasi</h3>
          <p className="text-sm text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-700"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  // ==============================
  // HALAMAN NOTIFICATION
  // ==============================
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8 md:px-12">
      {/* BREADCRUMB */}
      <div className="mb-9 my-5 flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="transition hover:text-[#133D86]">
          Beranda
        </Link>
        <span>/</span>
        <span className="font-semibold text-[#133D86]">Notifikasi</span>
      </div>

      {/* HEADER */}
      <div className="mx-auto mb-10 max-w-3xl space-y-3 text-center">
        <span className="inline-block rounded-full bg-[#fcefdb8a] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#F4B042]">
          Notifikasi
        </span>

        <h1 className="text-3xl font-extrabold leading-tight text-[#133D86] sm:text-4xl md:text-5xl">
          Notifikasi Status Peminjaman
        </h1>

        <p className="text-sm text-gray-500 max-w-xl mx-auto">
          Pantau status terkini pengajuan reservasi gedung dan fasilitas kampus kamu.
        </p>
      </div>

      {/* DAFTAR NOTIFIKASI ATAU EMPTY STATE */}
      {data.length === 0 ? (
        <div className="mx-auto max-w-xl rounded-2xl border border-gray-100 bg-white p-8 sm:p-12 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-[#133D86]">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#133D86] mb-2">
            Belum Ada Pengajuan
          </h3>
          <p className="text-gray-500 text-sm sm:text-base mb-6 leading-relaxed">
            Belum ada booking yang kamu ajukan.
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 rounded-xl bg-[#133D86] hover:bg-[#0d2a5e] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200"
          >
            <span>Ajukan Booking Sekarang</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      ) : (
        <div className="mx-auto flex max-w-3xl flex-col gap-4.5">
          {data.map((item) => (
            <NotificationCard
              key={item.id || `${item.event_name}-${item.date}`}
              venue_name={
                item.venue_name ||
                item.venue?.name ||
                item.gedung ||
                (typeof item.venue === "string" ? item.venue : "Nama Gedung")
              }
              event_name={item.event_name || item.kegiatan || item.event || "Nama Acara"}
              status={item.status}
              purpose={item.purpose || item.deskripsi}
              date={item.date || item.tanggal}
              start_time={item.start_time || item.jam_mulai}
              end_time={item.end_time || item.jam_selesai}
              participant_count={item.participant_count ?? item.jumlah_peserta}
              admin_note={item.admin_note || item.catatan_admin}
              getStatus={getStatus}
              getStatusStyle={getStatusStyle}
            />
          ))}
        </div>
      )}
    </div>
  );
}