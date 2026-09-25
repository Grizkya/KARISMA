"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NotificationCard from "@/components/NotificationCard";
import { fetchApi } from "@/lib/api";

export default function NotificationPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const result = await fetchApi("/ravenue/bookings");

        console.log("Response API bookings:", result);

        // ==============================
        // AMBIL ID USER YANG LOGIN
        // ==============================
        const token = localStorage.getItem("token");

        let currentUserId = null;

        if (token) {
          try {
            const payload = JSON.parse(atob(token.split(".")[1]));

            currentUserId =
              payload.user_id ??
              payload.id ??
              payload.sub ??
              null;

            console.log("ID user yang sedang login:", currentUserId);
          } catch (err) {
            console.error("Token bukan JWT atau tidak bisa dibaca:", err);
          }
        }

        // ==============================
        // FILTER BOOKING MILIK USER
        // ==============================
        const bookings = Array.isArray(result) ? result : [];

        const myBookings = bookings.filter((item) => {
          const ownerId =
            item.user_id ??
            item.owner_id ??
            item.user?.id ??
            item.owner?.id ??
            null;

          console.log("Booking:", item);
          console.log("Owner ID:", ownerId);
          console.log("Current User ID:", currentUserId);

          return (
            ownerId !== null &&
            currentUserId !== null &&
            String(ownerId) === String(currentUserId)
          );
        });

        console.log("Booking milik user login:", myBookings);

        setData(myBookings);
      } catch (err) {
        console.error("ERROR API BOOKINGS:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // ==============================
  // STATUS BOOKING
  // ==============================
  function getStatus(status) {
    switch (status) {
      case "pending":
        return "Menunggu Verifikasi";

      case "processing":
        return "Proses Review";

      case "approved":
        return "Disetujui (Approved)";

      case "rejected":
        return "Ditolak (Rejected) / Revisi";

      default:
        return status || "-";
    }
  }

  // ==============================
  // STYLE STATUS TAILWIND
  // ==============================
  function getStatusStyle(status) {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";

      case "processing":
        return "bg-blue-100 text-blue-700";

      case "approved":
        return "bg-green-100 text-green-800";

      case "rejected":
        return "bg-red-100 text-red-800";

      default:
        return "bg-yellow-100 text-yellow-800";
    }
  }

  // ==============================
  // LOADING
  // ==============================
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-8 md:px-12">
        <p className="text-gray-600">Memuat data booking...</p>
      </div>
    );
  }

  // ==============================
  // ERROR
  // ==============================
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-8 md:px-12">
        <div className="max-w-2xl rounded-xl bg-red-100 p-5 text-red-800">
          <h3 className="mb-2 text-lg font-bold">
            Gagal Memuat Data
          </h3>

          <p>{error}</p>
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
      <div className="mb-9 flex items-center gap-2 text-xs text-gray-400">
        <Link
          href="/"
          className="transition hover:text-[#133D86]"
        >
          Beranda
        </Link>

        <span>/</span>

        <span className="font-semibold text-[#133D86]">
          Notifikasi
        </span>
      </div>

      {/* HEADER */}
      <div className="mx-auto mb-10 max-w-3xl space-y-4 text-center">
        <span className="inline-block rounded-full bg-[#fcefdb8a] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#F4B042]">
          Notifikasi
        </span>

        <h1 className="text-3xl font-extrabold leading-tight text-[#133D86] sm:text-5xl">
          Notifikasi Status Peminjaman
        </h1>
      </div>

      {data.length === 0 ? (
        <div className="rounded-xl bg-white p-8 text-center text-gray-600 shadow-sm">
          <p>Belum ada booking yang kamu ajukan.</p>
        </div>
      ) : (
        <div className="flex max-w-4xl flex-col gap-[18px]">
          {data.map((item) => (
            <NotificationCard
              key={item.id}
              {...item}
              getStatus={getStatus}
              getStatusStyle={getStatusStyle}
            />
          ))}
        </div>
      )}
    </div>
  );
}