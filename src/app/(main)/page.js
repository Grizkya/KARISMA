"use client";
import Link from "next/link";
import About from "@/components/About";
import Calendar from "@/components/Calendar";
import Guide from "@/components/Guide";

function Header() {
  return (
    <section className="text-center p-15 bg-[url('/unrambg.png')] bg-cover bg-position-[center_top_60%] bg-no-repeat">
      <h1 className="text-7xl font-bold text-[#F4B042]">RaVenue</h1>
      <p className="mt-2 text-base sm:text-lg text-white max-w-2xl mx-auto">Tempat peminjaman gedung kampus di Universitas Mataram</p>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <Header />
      <About />
      <Calendar />
      <Guide />
    </div>
  );
}
