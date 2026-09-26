import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getVenues } from '@/lib/api';

// Mencocokkan slug URL dengan nama gedung di API
const venueNames = {
  'arena-budaya': 'Arena Budaya',
  auditorium: 'Auditorium',
  dom: 'Dome',
};

export default async function VenueDetailPage({ params }) {
  const { venue } = await params;

  // Ambil nama gedung berdasarkan URL
  const targetName = venueNames[venue];

  if (!targetName) {
    notFound();
  }

  // Mengambil data gedung terbaru dari API
  let listGedung = [];

  try {
    const res = await getVenues();

    // Menyesuaikan response API:
    // bisa langsung berupa array atau { data: [...] }
    listGedung = Array.isArray(res) ? res : res?.data || [];
  } catch (error) {
    console.error('Gagal mengambil data gedung:', error);
    notFound();
  }

  // Cari gedung berdasarkan nama
  const gedung = listGedung.find(
    (item) =>
      item.name?.toLowerCase() === targetName.toLowerCase()
  );

  // Kalau gedung tidak ditemukan
  if (!gedung) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto p-6 font-sans">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-9">
        <Link
          href="/"
          className="hover:text-[#133D86] transition"
        >
          Beranda
        </Link>

        <span>/</span>

        <span className="text-[#133D86] font-semibold">
          {gedung.name}
        </span>
      </div>

      {/* Card Detail Gedung */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm">

        {/* Gambar dari API */}
        <div className="relative w-full h-80 rounded-xl overflow-hidden mb-6 bg-gray-100">
          {gedung.image_url ? (
            <img
              src={gedung.image_url}
              alt={gedung.name || 'Gambar Gedung'}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Tidak ada gambar gedung
            </div>
          )}
        </div>

        {/* Nama + Kapasitas */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-3">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {gedung.name}
            </h1>

            {/* Lokasi dari API */}
            <p className="text-gray-500 mt-2">
              {gedung.location || 'Lokasi belum tersedia'}
            </p>
          </div>

          {/* Kapasitas dari API */}
          <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1.5 rounded-full w-fit">
            Kapasitas: {gedung.capacity || 0}+ Orang
          </span>

        </div>

        <hr className="my-5 border-gray-200" />

        {/* Status */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Status Gedung
          </h2>

          <span
            className={`inline-block px-3 py-1.5 rounded-full text-sm font-semibold ${
              gedung.status === 'available'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {gedung.status === 'available'
              ? 'Tersedia'
              : gedung.status || 'Status tidak tersedia'}
          </span>
        </div>

        {/* Deskripsi */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Penjelasan Gedung
          </h2>

          <p className="text-gray-600 leading-relaxed">
            {gedung.description || 'Deskripsi gedung belum tersedia.'}
          </p>
        </div>

        {/* Fasilitas */}
        <div className="mb-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Fasilitas
          </h2>

          <p className="text-gray-600 leading-relaxed">
            {gedung.facilities || 'Informasi fasilitas belum tersedia.'}
          </p>
        </div>

      </div>
    </main>
  );
}