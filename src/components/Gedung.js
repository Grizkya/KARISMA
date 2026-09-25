import Link from 'next/link';
import { getVenues } from '@/lib/api';

async function ListGedung() {
  const listGedung = await getVenues();

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header Seksi Gedung */}
        <div className="text-center mb-12 space-y-2">
          <span className="inline-block px-3 py-1 bg-[#fcefdb8a] text-[#F4B042] text-xs font-semibold rounded-full uppercase tracking-wider">
            Fasilitas Kampus
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#133D86] tracking-tight">
            Pilihan Gedung & Venue
          </h2>

          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Pilih gedung di bawah ini untuk melihat profil, kapasitas, dan fasilitas detail.
          </p>
        </div>

        {/* Grid Kartu Gedung */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listGedung.map((gedung) => (
            <div
              key={gedung.id}
              className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between"
            >
              <div>

                {/* Gambar Gedung */}
                <div className="relative h-48 w-full bg-gray-100">
                  {gedung.image_url ? (
                    <img
                      src={gedung.image_url}
                      alt={gedung.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      Tidak ada gambar
                    </div>
                  )}
                </div>

                {/* Konten Teks */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3 gap-2">
                    <h3 className="font-bold text-lg text-[#133D86] leading-snug">
                      {gedung.name}
                    </h3>

                    <span className="text-xs bg-blue-50 text-[#133D86] border border-blue-100 px-2.5 py-1 rounded-full font-semibold whitespace-nowrap">
                      {gedung.capacity}+ Orang
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {gedung.description || 'Informasi gedung belum tersedia.'}
                  </p>
                </div>

              </div>

              {/* Tombol Detail Gedung */}
              <div className="p-6 pt-0">
                <Link
                  href={
                    gedung.name === 'Auditorium'
                      ? '/auditorium'
                      : gedung.name === 'Dome'
                        ? '/dom'
                        : gedung.name === 'Arena Budaya'
                          ? '/arena-budaya'
                          : `/gedung/${gedung.id}`
                  }
                  className="block w-full"
                >
                  <button className="w-full bg-[#133D86] hover:bg-[#0d2a5e] text-white font-semibold py-2.5 rounded-xl transition shadow-sm text-sm">
                    Lihat Detail Gedung
                  </button>
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <ListGedung />
    </main>
  );
}