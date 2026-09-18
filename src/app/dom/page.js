import Link from 'next/link';
import Image from 'next/image';

export default function DomPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 font-sans">
      {/* Tombol Kembali */}
    <Link href="/" className="text-blue-600 font-medium hover:underline inline-block mb-4">
    &larr; Kembali ke Daftar Gedung
    </Link>

      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        {/* Banner Gambar */}
        <div className="relative w-full h-80 rounded-xl overflow-hidden mb-6 bg-gray-100">
          <Image 
            src="/images/dom.jpg" 
            alt="Gedung Dome H. Sunarpi" 
            fill 
            className="object-cover"
            priority
          />
        </div>

        {/* Header Nama & Kapasitas */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gedung Dome H. Sunarpi</h1>
            <p className="text-gray-500 mt-1">Gedung Serbaguna / Olahraga & Expo UNRAM</p>
          </div>
          <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1.5 rounded-full w-fit">
            Kapasitas: 800+ Orang
          </span>
        </div>

        <hr className="my-4 border-gray-200" />

        {/* Detail Penjelasan */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Penjelasan Gedung</h2>
            <p className="text-gray-600 leading-relaxed">
              Gedung Dome H. Sunarpi merupakan fasilitas serbaguna indoor di Universitas Mataram yang biasa digunakan untuk berbagai kegiatan kemahasiswaan skala besar. Gedung ini ideal untuk pelaksanaan kompetisi olahraga indoor, expo kampus, festival seni, pameran, hingga kegiatan penerimaan mahasiswa baru.
            </p>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
            <h3 className="font-semibold text-blue-900 text-sm mb-1">Informasi Operasional & Peminjaman</h3>
            <p className="text-sm text-blue-800 leading-relaxed">
              Jadwal penggunaan ruang dan perizinan diproses secara terintegrasi melalui Bagian Rumah Tangga Universitas Mataram (SIMARTA).
            </p>
          </div>
        </div>

        {/* Tombol Integrasi ke Tim (Peminjaman) */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
        </div>
      </div>
    </main>
  );
}