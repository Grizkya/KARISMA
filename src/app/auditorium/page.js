import Link from 'next/link';
import Image from 'next/image';

export default function AuditoriumPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 font-sans">
    <Link href="/" className="text-blue-600 font-medium hover:underline inline-block mb-4">
    &larr; Kembali ke Daftar Gedung
    </Link>

      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        <div className="relative w-full h-80 rounded-xl overflow-hidden mb-6 bg-gray-100">
          <Image 
            src="/images/auditorium.jpg" 
            alt="Auditorium Yusuf Abu Bakar" 
            fill 
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Auditorium Yusuf Abu Bakar</h1>
            <p className="text-gray-500 mt-1">Gedung Utama Universitas Mataram</p>
          </div>
          <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1.5 rounded-full w-fit">
            Kapasitas: 1.000+ Orang
          </span>
        </div>

        <hr className="my-4 border-gray-200" />

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Penjelasan Gedung</h2>
            <p className="text-gray-600 leading-relaxed">
              Auditorium Yusuf Abu Bakar adalah gedung pertemuan utama di Universitas Mataram yang diperuntukkan bagi acara-acara formal universitas. Gedung ini menjadi lokasi utama untuk prosesi Wisuda, Yudisium fakultas, Pengukuhan Guru Besar, Seminar Nasional/Internasional, serta Kuliah Umum.
            </p>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
            <h3 className="font-semibold text-blue-900 text-sm mb-1">Informasi Operasional & Peminjaman</h3>
            <p className="text-sm text-blue-800 leading-relaxed">
              Jadwal penggunaan ruang dan perizinan diproses secara terintegrasi melalui Bagian Rumah Tangga Universitas Mataram (SIMARTA).
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
          <Link 
            href="/booking" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition shadow-sm inline-flex items-center gap-2"
          >
            Ajukan Peminjaman Gedung Ini &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}