import Link from 'next/link';
import Image from 'next/image';

export default function ArenaBudayaPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 font-sans">
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-9">
        <Link href="/" className="hover:text-[#133D86] transition">Beranda</Link>
        <span>/</span>
        <span className="text-[#133D86] font-semibold">arena-budaya</span>
      </div>

      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        <div className="relative w-full h-80 rounded-xl overflow-hidden mb-6 bg-gray-100">
          <Image 
            src="/arena-budaya.jpeg" 
            alt="Arena Budaya UNRAM" 
            fill 
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Arena Budaya</h1>
            <p className="text-gray-500 mt-1">Pusat Kegiatan Seni & Seni Budaya UNRAM</p>
          </div>
          <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1.5 rounded-full w-fit">
            Kapasitas: 500+ Orang
          </span>
        </div>

        <hr className="my-4 border-gray-200" />

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Keterangan Gedung</h2>
            <p className="text-gray-600 leading-relaxed">
              Arena Budaya Universitas Mataram merupakan tempat pusat kegiatan kebudayaan dan ekspresi seni mahasiswa. Fasilitas ini sering dimanfaatkan untuk acara pementasan seni, kegiatan Open Recruitment (OR) UKM, orientasi organisasi, hingga kegiatan kumpul kebudayaan mahasiswa.
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
        </div>
      </div>
    </main>
  );
}