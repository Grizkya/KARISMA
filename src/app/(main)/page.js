import Image from "next/image";
import Calendar from "@/components/CalendarWidget";
export default function Home() {
  return (
    <div>
      <div className="text-center p-10">
        <h1 className="text-7xl font-bold text-[#F49D0A]">RaVenue</h1>
        <p className="text-gray-600 p-5">Tempat peminjaman gedung kampus di Universitas Mataram</p>
      </div>
      <Calendar />
    </div>
  );
}
