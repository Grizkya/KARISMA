import Link from 'next/link';
import Image from 'next/image';

export default function MainPage() {
  // Data 3 Gedung UNRAM
  const listGedung = [
    {
      id: 'auditorium',
      nama: 'Auditorium Yusuf Abu Bakar',
      kapasitas: '1.000+ Orang',
      deskripsi: 'Gedung utama kampus untuk kegiatan wisuda, yudisium, seminar nasional, dan acara resmi Universitas Mataram.',
      gambar: '/images/auditorium.jpg',
      link: '/auditorium',
    },
    {
      id: 'dom',
      nama: 'Gedung Dome H. Sunarpi',
      kapasitas: '800+ Orang',
      deskripsi: 'Gedung serbaguna untuk kegiatan olahraga indoor, expo kampus, kompetisi mahasiswa, dan pameran.',
      gambar: '/images/dom.jpg',
      link: '/dom',
    },
    {
      id: 'arena-budaya',
      nama: 'Arena Budaya',
      kapasitas: '500+ Orang',
      deskripsi: 'Pusat kegiatan seni, kebudayaan, pementasan, dan tempat berkumpul kelompok mahasiswa.',
      gambar: '/images/arena-budaya.jpg',
      link: '/arena-budaya',
    },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 font-sans">
      {/* Header Halaman (Sesuai Rekomendasi Fokus Informasi) */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Informasi & Spesifikasi Gedung Kampus
        </h1>
        <p className="text-gray-600">
          Pilih gedung di bawah ini untuk melihat profil, kapasitas, dan penjelasan detail.
        </p>
      </div>

      {/* Grid Kartu Gedung */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listGedung.map((gedung) => (
          <div
            key={gedung.id}
            className="border rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              {/* Gambar Gedung */}
              <div className="relative h-48 w-full bg-gray-200">
                <Image
                  src={gedung.gambar}
                  alt={gedung.nama}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Konten Teks */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h2 className="font-bold text-lg text-gray-900 leading-snug">
                    {gedung.nama}
                  </h2>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-semibold whitespace-nowrap">
                    {gedung.kapasitas}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {gedung.deskripsi}
                </p>
              </div>
            </div>

            {/* Tombol ke Penjelasan Gedung (Poin 1: Lihat Detail Gedung) */}
            <div className="p-5 pt-0">
              <Link href={gedung.link} className="block w-full">
                <button className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium py-2.5 rounded-xl transition shadow-sm">
                  Lihat Detail Gedung
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}