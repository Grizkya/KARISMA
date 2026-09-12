import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <section className="text-center p-15 bg-[url('/unrambg.png')] bg-cover bg-position-[center_top_60%] bg-no-repeat">
      <h1 className="text-7xl font-bold text-[#F4B042]">RaVenue</h1>
      <p className="mt-2 text-base sm:text-lg text-white max-w-2xl mx-auto">Tempat peminjaman gedung kampus di Universitas Mataram</p>
    </section>
  );
}

function About() {
  return (
    <section className="max-w-6xl mx-auto text-center">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#133D86] tracking-tight">
          About
        </h1>
        <p className="mt-2 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          RaVenue merupakan platform digital yang dirancang untuk memudahkan proses peminjaman gedung dan fasilitas di Universitas Mataram. Melalui RaVenue, pengguna dapat melihat informasi fasilitas yang tersedia, mengajukan peminjaman, memantau status pengajuan, serta mengetahui jadwal penggunaan gedung secara lebih terorganisir.
        </p>
        <Link 
          href="/about"
          className="mt-2 text-base sm:text-lg text-[#F4B042] ml-1 transition-colors duration-300 ease-in-out hover:text-[#b88431]">
          Selengkapnya
        </Link>
      </div>
      <div>
        
      </div>
    </section>
  );
}

function Guide() {
  const steps = [
    {
      no: 1,
      title: "Cari Gedung",
      description:
        "Temukan gedung yang sesuai dengan kebutuhan Anda.",
    },
    {
      no: 2,
      title: "Isi Form Booking",
      description:
        "Lengkapi form pemesanan dengan detail kebutuhan Anda dan jadwal yang diinginkan.",
    },
    {
      no: 3,
      title: "Dapatkan Konfirmasi",
      description:
        "Tunggu konfirmasi dari admin dan dapatkan notifikasi melalui sistem.",
    },
  ];
  return (
    <section className="py-6 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#133D86] tracking-tight">
          Panduan
        </h1>
        <p className="mt-2 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Tiga langkah mudah untuk mendapatkan gedung yang Anda butuhkan
        </p>
        <div className="mt-8 flex flex-col md:flex-row items-stretch justify-center gap-3">
          {steps.map((step) => (
            <div key={step.no} className="mb-6 ml-5 mr-5 bg-center bg-white bg-cover p-6 rounded-lg shadow-md flex-1">
              <div className="w-12 h-12 rounded-md bg-[#133D86] text-white flex items-center justify-center text-2xl font-bold mb-3">
                {step.no}
              </div>
              <h2 className="text-left text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h2>
              <p className="text-gray-600 text-left text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
}

function Line() {
  return (
    <div className="w-3/4 h-1.5 bg-gray-300 mx-auto my-6 [clip-path:polygon(0%_50%,50%_0%,100%_50%,50%_100%)]"></div>
  );
}

export default function Home() {
  return (
    <div>
      <Header />
      <About />
      <Line />
      <Guide />
    </div>
  );
}
