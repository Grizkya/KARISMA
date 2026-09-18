import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0b1d3a] text-gray-300 text-sm py-10 px-6 w-full mt-auto border-t border-slate-800">
      <div className="max-w-6xl mx-auto">
        
        {/* KONTEN UTAMA FOOTER (3 KOLOM) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* KOLOM 1: BRANDING & LOGO */}
          <div className="flex flex-col gap-3">
            <div className="mt-2">
              <Image 
                src="/ravenue_unram_logo.png" 
                alt="Ravenue Unram Logo" 
                width={130} 
                height={40} 
                style={{ width: "auto", height: "auto" }}
              />
            </div>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              Sistem Informasi Peminjaman Gedung dan Sarana Prasarana Universitas Mataram.
            </p>
          </div>

          {/* KOLOM 2: TAUTAN */}
          <div>
            <h3 className="text-white font-bold text-base tracking-wider uppercase mb-4">
              TAUTAN
            </h3>
            <ul className="space-y-2 text-xs text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-gray-500">•</span>
                <Link href="/" className="hover:text-[#F4B042] transition-colors">
                  Beranda
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-500">•</span>
                <Link href="/booking" className="hover:text-[#F4B042] transition-colors">
                  Pesan Ruangan
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-500">•</span>
                <Link href="/#panduan" className="hover:text-[#F4B042] transition-colors">
                  Panduan
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-500">•</span>
                <a 
                  href="https://unram.ac.id" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#F4B042] transition-colors"
                >
                  Website Resmi UNRAM
                </a>
              </li>
            </ul>
          </div>

          {/* KOLOM 3: KONTAK & SOSIAL MEDIA */}
          <div>
            <h3 className="text-white font-bold text-base tracking-wider uppercase mb-4">
              KONTAK
            </h3>
            <div className="space-y-3 text-xs text-gray-300">
              {/* Email */}
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span>info@unram.ac.id</span>
              </div>

              {/* Telepon */}
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.826-1.015-5.099-3.288-6.114-6.114l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span>(0370) 633007</span>
              </div>

              {/* Alamat */}
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>Jl. Majapahit No. 62, Mataram, NTB</span>
              </div>
            </div>

            {/* Ikon Sosial Media */}
            <div className="flex items-center gap-4 mt-5 text-gray-400">
              <a href="#" className="hover:text-[#F4B042] transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="#" className="hover:text-[#F4B042] transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="hover:text-[#F4B042] transition-colors" aria-label="YouTube">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

        </div>

        {/* GARIS PEMBATAS */}
        <div className="border-t border-slate-800 pt-6 text-center text-xs text-gray-500">
          <p>© 2026 Universitas Mataram. Hak Cipta Dilindungi.</p>
          <p className="mt-1 text-gray-400">RaVenue - Sistem Informasi Peminjaman Gedung Kampus</p>
        </div>

      </div>
    </footer>
  );
}