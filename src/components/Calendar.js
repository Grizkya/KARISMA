"use client";
import { useState } from "react";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("Bulan");

  const monthsName = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handlePrev = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNext = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const getTodayStr = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  };

  const todayStr = getTodayStr();

  const firstDayIndex = new Date(year, month, 1).getDay();
  const startDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
  const totalDays = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const calendarDays = [];
  for (let i = startDay - 1; i >= 0; i--) {
    const dNum = prevMonthDays - i;
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(dNum).padStart(2, '0')}`;
    calendarDays.push({ dayNum: dNum, isCurrentMonth: false, dateStr });
  }

  for (let i = 1; i <= totalDays; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    calendarDays.push({ dayNum: i, isCurrentMonth: true, dateStr });
  }

  const remainingCells = 7 - (calendarDays.length % 7);
  if (remainingCells < 7) {
    for (let i = 1; i <= remainingCells; i++) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      const dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      calendarDays.push({ dayNum: i, isCurrentMonth: false, dateStr });
    }
  }

  return (
    <section className="py-10 px-6 bg-slate-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-gray-100 flex flex-col md:flex-row items-start justify-between gap-10">

          {/* SISI KIRI: Header, Kontrol, & Widget Grid Kalender */}
          <div className="flex-1 w-full text-left space-y-6">

            {/* Header & Title mirip About */}
            <div className="space-y-2">
              <div className="inline-block px-3 py-1 bg-blue-50 text-[#133D86] text-xs font-semibold rounded-full uppercase tracking-wider">
                Jadwal & Ketersediaan
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#133D86] tracking-tight">
                Kalender Gedung
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Pantau jadwal peminjaman gedung dan agenda kegiatan Universitas Mataram secara interaktif.
              </p>
            </div>

            {/* Navigasi & Kontrol Kalender */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="flex rounded-lg overflow-hidden border border-[#133D86] bg-[#133D86] shadow-sm">
                  <button onClick={handlePrev} className="px-3 py-1.5 text-white hover:bg-[#0d2a5e] transition font-bold text-xs sm:text-sm">❮</button>
                  <button onClick={handleNext} className="px-3 py-1.5 text-white hover:bg-[#0d2a5e] transition font-bold text-xs sm:text-sm border-l border-blue-900">❯</button>
                </div>
                <button onClick={handleToday} className="px-3.5 py-1.5 bg-[#133D86] hover:bg-[#0d2a5e] text-white font-medium text-xs sm:text-sm rounded-lg shadow-sm transition">
                  Hari Ini
                </button>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#133D86]">
                {monthsName[month]} {year}
              </h3>

              <div className="flex bg-[#133D86] rounded-lg p-1 shadow-sm">
                {["Bulan", "Agenda"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition ${activeTab === tab ? "bg-white text-[#133D86] shadow-sm" : "text-white hover:bg-[#0d2a5e]"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid Kalender / Tampilan Agenda */}
            {activeTab === "Bulan" && (
              <div className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm">
                <div className="grid grid-cols-7 bg-slate-50 border-b border-gray-200 text-center text-xs font-bold text-[#133D86] uppercase tracking-wider py-2.5">
                  <div>Sen</div><div>Sel</div><div>Rab</div><div>Kam</div><div>Jum</div><div>Sab</div><div>Min</div>
                </div>
                <div className="grid grid-cols-7 auto-rows-fr">
                  {calendarDays.map((item, index) => {
                    const isToday = item.dateStr === todayStr;
                    return (
                      <div key={index} className={`min-h-13.75 sm:min-h-16.25 border-b border-r border-gray-100 p-1.5 flex flex-col justify-between transition ${item.isCurrentMonth ? "bg-white" : "bg-slate-50/50"}`}>
                        <div className="flex justify-end">
                          <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-md ${isToday ? "bg-[#F4B042] text-white shadow-sm" : item.isCurrentMonth ? "text-gray-800" : "text-gray-300"}`}>
                            {item.dayNum}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "Agenda" && (
              <div className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm p-8 text-center text-gray-400">
                <span className="text-sm font-medium">Belum ada agenda pada bulan {monthsName[month]} {year}.</span>
              </div>
            )}
          </div>

          {/* SISI KANAN: Highlight Ringkasan Status & Informasi */}
          <div className="w-full md:w-80 grid grid-cols-2 gap-4 shrink-0 md:mt-2">
            <div className="bg-slate-50 p-5 rounded-xl border border-gray-100 text-center">
              <div className="text-2xl font-bold text-[#133D86]">3 Gedung</div>
              <div className="text-xs text-gray-500 mt-1">Siap Dipinjam</div>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-gray-100 text-center">
              <div className="text-2xl font-bold text-[#F4B042]">Terintegrasi</div>
              <div className="text-xs text-gray-500 mt-1">Jadwal Kampus</div>
            </div>

            <div className="col-span-2 bg-[#133D86] text-white p-5 rounded-xl text-center shadow-md space-y-1">
              <div className="text-sm font-semibold">Gedung Bebas Bentrok</div>
              <div className="text-xs text-blue-200 leading-relaxed">
                Pilih tanggal kosong pada kalender untuk memastikan pengajuan Anda disetujui tanpa kendala.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <Calendar />
    </div>
  );
}