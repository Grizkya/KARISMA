import About from "@/components/About";
import Gedung from "@/components/Gedung";
import Calendar from "@/components/Calendar";
import Guide from "@/components/Guide";

function Header() {
  return (
    <section className="relative text-center py-20 px-6 bg-[url('/unrambg.png')] bg-cover bg-center bg-no-repeat">
      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#F4B042] drop-shadow-md">
          RaVenue
        </h1>
        <p className="mt-3 text-base sm:text-lg md:text-xl text-white font-medium max-w-2xl mx-auto leading-relaxed drop-shadow">
          Tempat peminjaman gedung kampus di Universitas Mataram
        </p>
      </div>
    </section>
  );
}
export default function Home() {
  return (
    <div>
      <Header />
      <About />
      <Gedung />
      <Calendar />
      <Guide />
    </div>
  );
}