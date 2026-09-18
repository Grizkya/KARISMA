import Link from "next/link";

export default function About() {
  const features = [
    {
      title: "Katalog Gedung Lengkap",
      description: "Akses informasi detail mengenai kapasitas, fasilitas pendukung, serta lokasi gedung di Universitas Mataram secara akurat.",
      icon: (
        <svg className="w-6 h-6 text-[#133D86]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V10m0 0h4m-4 0H7m4 11V10" />
        </svg>
      )
    },
    {
      title: "Pengajuan Online Praktis",
      description: "Isi formulir pemesanan kapan saja dan di mana saja tanpa perlu mengisi berkas fisik secara manual.",
      icon: (
        <svg className="w-6 h-6 text-[#133D86]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "Pelacakan Status Real-Time",
      description: "Pantau alur verifikasi dan persetujuan peminjaman oleh pihak pengelola kampus secara transparan dari akun Anda.",
      icon: (
        <svg className="w-6 h-6 text-[#133D86]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      )
    },
    {
      title: "Jadwal Terorganisir",
      description: "Cek ketersediaan tanggal secara riil untuk menghindari bentrokan jadwal penggunaan fasilitas antar organisasi atau unit kerja.",
      icon: (
        <svg className="w-6 h-6 text-[#133D86]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-6 relative">
      
      {/* TOMBOL PANAH KEMBALI */}
      <div className="max-w-5xl mx-auto mb-6">
        <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-[#133D86] hover:text-[#F4B042] text-sm font-semibold transition-colors duration-200"
            title="Kembali ke Beranda"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="hidden xs:inline sm:inline">Beranda</span>
        </Link>
      </div>

      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3 py-1 bg-[#fcefdb8a] text-[#F4B042] text-xs font-semibold rounded-full uppercase tracking-wider">
            Tentang RaVenue
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#133D86] leading-tight">
            Solusi Digital Peminjaman Fasilitas Kampus
          </h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Platform terpadu Universitas Mataram yang menghadirkan kepraktisan, keterbukaan, dan efisiensi dalam setiap tahapan peminjaman gedung.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-gray-100">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Transformasi Layanan Sarana & Prasarana
            </h2>
            <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
              <strong className="text-[#F4B042]">RaVenue</strong> merupakan platform digital yang dirancang khusus untuk memudahkan proses peminjaman gedung dan fasilitas di lingkungan <strong className="text-[#133D86]">Universitas Mataram</strong>.
            </p>
            <p className="text-gray-600 leading-relaxed text-base">
              Melalui sistem terintegrasi ini, civitas akademika maupun pihak luar dapat melihat informasi fasilitas yang tersedia secara detail, mengajukan peminjaman secara online, memantau status pengajuan secara langsung, serta mengetahui jadwal penggunaan gedung agar pemanfaatan sarana kampus berjalan lebih efisien dan terorganisir.
            </p>
          </div>
        </div>

        <div>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#133D86]">
              Layanan & Keunggulan RaVenue
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              Fitur utama yang kami sediakan untuk efisiensi pengelolaan fasilitas
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col space-y-3"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-base">{item.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#091F44] rounded-2xl p-8 text-white grid grid-cols-1 sm:grid-cols-3 gap-8 text-center shadow-lg">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#F4B042]">100%</div>
            <p className="text-xs sm:text-sm text-gray-200 mt-1">Pengajuan Digital</p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#F4B042]">Real-Time</div>
            <p className="text-xs sm:text-sm text-gray-200 mt-1">Pengecekan Jadwal</p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#F4B042]">Transparan</div>
            <p className="text-xs sm:text-sm text-gray-200 mt-1">Alur Persetujuan</p>
          </div>
        </div>

      </div>
    </div>
  );
}