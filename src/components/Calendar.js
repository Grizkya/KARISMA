"use client";
import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState([]); 
  const [venues, setVenues] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);

  const monthsName = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    async function fetchData() {
      try {
        const [bookingsRes, venuesRes] = await Promise.all([
          apiFetch("/bookings").catch(() => []),
          apiFetch("/venues").catch(() => [])
        ]);

        if (Array.isArray(bookingsRes)) {
          setBookings(bookingsRes);
        } else if (bookingsRes && Array.isArray(bookingsRes.data)) {
          setBookings(bookingsRes.data);
        }

        if (Array.isArray(venuesRes)) {
          setVenues(venuesRes);
        } else if (venuesRes && Array.isArray(venuesRes.data)) {
          setVenues(venuesRes.data);
        }
      } catch (error) {
        console.error("Gagal memuat data dari API:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

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

  const colorPalette = [
    "bg-red-500", 
    "bg-green-500", 
    "bg-blue-600", 
    "bg-purple-500", 
    "bg-amber-500", 
    "bg-teal-500", 
    "bg-rose-500"
  ];

  const getVenueColor = (venueName) => {
    const index = venues.findIndex(v => (v.name || v.venue_name) === venueName);
    if (index !== -1) {
      return colorPalette[index % colorPalette.length];
    }
    if (venueName?.toLowerCase().includes("auditorium")) return "bg-red-500";
    if (venueName?.toLowerCase().includes("dome")) return "bg-green-500";
    if (venueName?.toLowerCase().includes("budaya")) return "bg-blue-600";
    return "bg-gray-400";
  };

  return (
    <section className="py-10 px-6 bg-slate-50 border-b border-gray-100 font-sans antialiased">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-gray-100 flex flex-col md:flex-row items-start justify-between gap-10">
          
          <div className="flex-1 w-full text-left space-y-6">
            
            <div className="space-y-2">
              <div className="inline-block px-3 py-1 bg-blue-50 text-[#133D86] text-xs font-semibold rounded-full uppercase tracking-wider">
                Jadwal & Ketersediaan
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#133D86] tracking-tight">
                Kalender Gedung
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Pantau jadwal peminjaman gedung dan agenda kegiatan Universitas Mataram secara interaktif.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="flex rounded-lg overflow-hidden border border-[#133D86] bg-[#133D86] shadow-sm">
                  <button onClick={handlePrev} className="px-3.5 py-2 text-white hover:bg-[#0d2a5e] transition font-bold text-sm sm:text-base">❮</button>
                  <button onClick={handleNext} className="px-3.5 py-2 text-white hover:bg-[#0d2a5e] transition font-bold text-sm sm:text-base border-l border-blue-900">❯</button>
                </div>
                <button onClick={handleToday} className="px-4 py-2 bg-[#133D86] hover:bg-[#0d2a5e] text-white font-semibold text-sm sm:text-base rounded-lg shadow-sm transition">
                  Hari Ini
                </button>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#133D86]">
                {monthsName[month]} {year}
              </h3>
            </div>

            <div className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm">
              <div className="grid grid-cols-7 bg-slate-50 border-b border-gray-200 text-center text-sm font-bold text-[#133D86] uppercase tracking-wider py-3">
                <div>Sen</div><div>Sel</div><div>Rab</div><div>Kam</div><div>Jum</div><div>Sab</div><div>Min</div>
              </div>
              <div className="grid grid-cols-7 auto-rows-fr">
                {calendarDays.map((item, index) => {
                  const isToday = item.dateStr === todayStr;
                  
                  const dayBookings = bookings.filter(
                    (b) => (b.date === item.dateStr || b.start_date === item.dateStr) && 
                           (b.status === "approved" || b.status === "Disetujui" || b.status === 1)
                  );

                  return (
                    <div key={index} className={`min-h-60px sm:min-h-75px border-b border-r border-gray-100 p-2 flex flex-col justify-between transition ${item.isCurrentMonth ? "bg-white" : "bg-slate-50/50"}`}>
                      <div className="flex justify-between items-start">
                        <div className="flex gap-1 items-center mt-0.5 flex-wrap max-w-[70%]">
                          {dayBookings.map((booking, bIdx) => {
                            const vName = booking.venue_name || booking.venue?.name || booking.venue;
                            return (
                              <span 
                                key={bIdx} 
                                className={`w-2.5 h-2.5 rounded-full ${getVenueColor(vName)} inline-block`}
                                title={`${vName}: ${booking.event_name || booking.title}`}
                              ></span>
                            );
                          })}
                        </div>
                        <span className={`text-xs sm:text-sm font-bold px-2 py-0.5 rounded-md ${isToday ? "bg-[#F4B042] text-white shadow-sm" : item.isCurrentMonth ? "text-gray-800" : "text-gray-300"}`}>
                          {item.dayNum}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          <div className="w-full md:w-80 grid grid-cols-2 gap-4 shrink-0 md:mt-2">
            <div className="bg-slate-50 p-5 rounded-xl border border-gray-100 text-center flex flex-col justify-center">
              <div className="text-2xl font-bold text-[#133D86]">
                {venues.length > 0 ? `${venues.length} Gedung` : "Memuat..."}
              </div>
              <div className="text-xs text-gray-500 mt-1 font-normal">Siap Dipinjam</div>
            </div>
            <div className="bg-slate-50 py-5 px-2 rounded-xl border border-gray-100 text-center flex flex-col items-center justify-center overflow-hidden">
              <div className="text-2xl font-bold text-[#133D86] whitespace-nowrap">
                Terintegrasi
              </div>
              <div className="text-xs text-gray-500 mt-1 font-normal">
                Jadwal Kampus
              </div>
            </div>

            <div className="col-span-2 bg-[#133D86] text-white p-6 rounded-xl text-center shadow-md space-y-1.5">
              <div className="text-base font-bold">Gedung Bebas Bentrok</div>
              <div className="text-sm text-blue-200 leading-relaxed font-normal">
                Pilih tanggal kosong pada kalender untuk memastikan pengajuan Anda disetujui tanpa kendala.
              </div>
            </div>

            <div className="col-span-2 bg-slate-50 p-6 rounded-xl border border-gray-100 space-y-3">
              <div className="text-sm font-bold text-[#133D86] text-center mb-2">
                Keterangan Gedung
              </div>
              
              {venues.length === 0 ? (
                <div className="text-xs text-center text-gray-400 py-2">Memuat daftar gedung...</div>
              ) : (
                venues.map((venue, idx) => {
                  const vName = venue.name || venue.venue_name;
                  const colorClass = colorPalette[idx % colorPalette.length];
                  return (
                    <div key={venue.id || idx} className="flex items-center gap-2.5 text-sm text-gray-700">
                      <span className={`w-3.5 h-3.5 rounded-full ${colorClass} shrink-0`}></span>
                      <span className="font-semibold">{vName}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
} 

export default Calendar;