"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Guide() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const steps = [
    {
      no: 1,
      title: "Cari Gedung",
      description: "Temukan gedung atau fasilitas yang sesuai dengan kapasitas dan kebutuhan kegiatan Anda.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      no: 2,
      title: "Isi Form Booking",
      description: "Lengkapi form pemesanan dengan detail kebutuhan Anda dan jadwal yang diinginkan secara langsung.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      no: 3,
      title: "Dapatkan Konfirmasi",
      description: "Tunggu konfirmasi dari admin dan dapatkan notifikasi status peminjaman melalui sistem secara transparan.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  return (
    <section className="py-10 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto text-center">
        <span className="inline-block px-3 py-1 bg-[#fcefdb8a] text-[#F4B042] text-xs font-semibold rounded-full uppercase tracking-wider">
          Langkah Mudah
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#133D86] tracking-tight mt-1">
          Panduan Peminjaman
        </h2>
        <p className="mt-2 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Tiga langkah mudah untuk memesan gedung dan fasilitas yang Anda butuhkan di Universitas Mataram
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.no}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start text-left"
            >
              <div className="w-full flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#133D86] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  0{step.no}
                </div>
                <div className="text-gray-400">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-8 flex items-center justify-center w-full text-center">
          <Link
            href={isLoggedIn ? "/booking" : "/login"}
            className="inline-flex items-center justify-center gap-2 bg-[#D18408] hover:bg-[#A56806] text-white hover:text-[#091F44] font-bold text-lg px-8 py-3.5 mb-10 rounded-xl shadow-lg transition-all duration-300"
          >
            <span>Booking Sekarang</span>
          </Link>
        </div>
      </div>
    </section>
  );
}