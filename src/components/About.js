"use client";
import Link from "next/link";

function About() {
  return (
    <section className="py-4 px-6 bg-slate-50 border-t border-b border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* SISI KIRI: Deskripsi Utama */}
          <div className="flex-1 text-left space-y-4">
            <div className="inline-block px-3 py-1 bg-blue-50 text-[#133D86] text-xs font-semibold rounded-full uppercase tracking-wider">
              Profil Platform
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#133D86] tracking-tight">
              Tentang RaVenue
            </h2>
            
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              <strong className="text-[#133D86]">RaVenue</strong> merupakan platform digital yang dirancang untuk memudahkan proses peminjaman gedung dan fasilitas di <strong className="text-[#133D86]">Universitas Mataram</strong>. Melalui RaVenue, pengguna dapat melihat informasi fasilitas yang tersedia, mengajukan peminjaman, memantau status pengajuan, serta mengetahui jadwal penggunaan gedung secara lebih terorganisir.
            </p>

            <div className="pt-2">
              <Link 
                href="/about"
                className="inline-flex items-center gap-2 text-[#F4B042] font-semibold text-base hover:text-[#b88431] transition-colors duration-300 group"
              >
                <span>Selengkapnya</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* SISI KANAN: Highlight Fitur / Stats Ringkas */}
          <div className="w-full md:w-80 grid grid-cols-2 gap-4 shrink-0">
            <div className="bg-slate-50 p-5 rounded-xl border border-gray-100 text-center">
              <div className="text-2xl font-bold text-[#133D86]">100%</div>
              <div className="text-xs text-gray-500 mt-1">Online & Praktis</div>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-gray-100 text-center">
              <div className="text-2xl font-bold text-[#F4B042]">Real-Time</div>
              <div className="text-xs text-gray-500 mt-1">Cek Ketersediaan</div>
            </div>

            <div className="col-span-2 bg-[#133D86] text-white p-5 rounded-xl text-center shadow-md">
              <div className="text-sm font-semibold">Universitas Mataram</div>
              <div className="text-xs text-blue-200 mt-0.5">Layanan Sarana & Prasarana</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
        <About />
    </div>
  );
}