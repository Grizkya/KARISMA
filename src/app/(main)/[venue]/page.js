import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// Data terpusat untuk ketiga gedung
const venuesData = {
  'arena-budaya': {
    name: 'Arena Budaya',
    subtitle: 'Pusat Kegiatan Seni & Seni Budaya UNRAM',
    capacity: 'Kapasitas: 500+ Orang',
    image: '/images/arena-budaya.jpg',
    description:
      'Arena Budaya Universitas Mataram merupakan tempat pusat kegiatan kebudayaan dan ekspresi seni mahasiswa. Fasilitas ini sering dimanfaatkan untuk acara pementasan seni, kegiatan Open Recruitment (OR) UKM, orientasi organisasi, hingga kegiatan kumpul kebudayaan mahasiswa.',
  },
  auditorium: {
    name: 'Auditorium Yusuf Abu Bakar',
    subtitle: 'Gedung Utama Universitas Mataram',
    capacity: 'Kapasitas: 1.000+ Orang',
    image: '/images/auditorium.jpg',
    description:
      'Auditorium Yusuf Abu Bakar adalah gedung pertemuan utama di Universitas Mataram yang diperuntukkan bagi acara-acara formal universitas. Gedung ini menjadi lokasi utama untuk prosesi Wisuda, Yudisium fakultas, Pengukuhan Guru Besar, Seminar Nasional/Internasional, serta Kuliah Umum.',
  },
  dom: {
    name: 'Gedung Dome H. Sunarpi',
    subtitle: 'Gedung Serbaguna / Olahraga & Expo UNRAM',
    capacity: 'Kapasitas: 800+ Orang',
    image: '/images/dom.jpg',
    description:
      'Gedung Dome H. Sunarpi merupakan fasilitas serbaguna indoor di Universitas Mataram yang biasa digunakan untuk berbagai kegiatan kemahasiswaan skala besar. Gedung ini ideal untuk pelaksanaan kompetisi olahraga indoor, expo kampus, festival seni, pameran, hingga kegiatan penerimaan mahasiswa baru.',
  },
};

export default async function VenueDetailPage({ params }) {
  const { venue } = await params;
  const data = venuesData[venue];

  // Jika slug di URL tidak ada di objek data, tampilkan halaman 404
  if (!data) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto p-6 font-sans">
      <Link
        href="/"
        className="text-blue-600 font-medium hover:underline inline-block mb-4"
      >
        &larr; Kembali ke Daftar Gedung
      </Link>

      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        <div className="relative w-full h-80 rounded-xl overflow-hidden mb-6 bg-gray-100">
          <Image
            src={data.image}
            alt={`${data.name} UNRAM`}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
            <p className="text-gray-500 mt-1">{data.subtitle}</p>
          </div>
          <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1.5 rounded-full w-fit">
            {data.capacity}
          </span>
        </div>

        <hr className="my-4 border-gray-200" />

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Penjelasan Gedung
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}