"use client";
import { useState } from "react";
import Image from "next/image";

function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("Bulan");

  const monthsName = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const daysNameLong = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const dayNum = currentDate.getDate();

  const getStartOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(new Date()));

  const handlePrev = () => {
    if (activeTab === "Bulan") {
      setCurrentDate(new Date(year, month - 1, 1));
    } else if (activeTab === "Minggu") {
      const newWeek = new Date(currentWeekStart);
      newWeek.setDate(newWeek.getDate() - 7);
      setCurrentWeekStart(newWeek);
    } else if (activeTab === "Hari") {
      const newDay = new Date(currentDate);
      newDay.setDate(newDay.getDate() - 1);
      setCurrentDate(newDay);
      setCurrentWeekStart(getStartOfWeek(newDay));
    } else if (activeTab === "Agenda") {
      setCurrentDate(new Date(year, month - 1, 1));
    }
  };

  const handleNext = () => {
    if (activeTab === "Bulan") {
      setCurrentDate(new Date(year, month + 1, 1));
    } else if (activeTab === "Minggu") {
      const newWeek = new Date(currentWeekStart);
      newWeek.setDate(newWeek.getDate() + 7);
      setCurrentWeekStart(newWeek);
    } else if (activeTab === "Hari") {
      const newDay = new Date(currentDate);
      newDay.setDate(newDay.getDate() + 1);
      setCurrentDate(newDay);
      setCurrentWeekStart(getStartOfWeek(newDay));
    } else if (activeTab === "Agenda") {
      setCurrentDate(new Date(year, month + 1, 1));
    }
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setCurrentWeekStart(getStartOfWeek(today));
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

  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(currentWeekStart);
    d.setDate(d.getDate() + i);
    weekDays.push(d);
  }

  const formatWeekRange = () => {
    const start = weekDays[0];
    const end = weekDays[6];
    const startStr = `${start.getDate()} ${monthsName[start.getMonth()].slice(0, 3)}`;
    const endStr = `${end.getDate()} ${monthsName[end.getMonth()].slice(0, 3)} ${end.getFullYear()}`;
    return `${startStr} – ${endStr}`;
  };

  const formatDayHeader = () => {
    return `${dayNum} ${monthsName[month]} ${year}`;
  };

  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg overflow-hidden border border-blue-600 bg-blue-600 shadow-sm">
            <button onClick={handlePrev} className="px-3 py-1.5 text-white hover:bg-blue-700 transition font-bold">❮</button>
            <button onClick={handleNext} className="px-3 py-1.5 text-white hover:bg-blue-700 transition font-bold border-l border-blue-500">❯</button>
          </div>
          <button onClick={handleToday} className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm rounded-lg shadow-sm transition">
            hari ini
          </button>
        </div>

        <h2 className="text-2xl font-extrabold text-gray-900 tracking-wide">
          {activeTab === "Minggu" 
            ? formatWeekRange() 
            : activeTab === "Hari" 
            ? formatDayHeader() 
            : `${monthsName[month]} ${year}`}
        </h2>

        <div className="flex bg-blue-600 rounded-lg p-1 shadow-sm">
          {["Bulan", "Agenda"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                activeTab === tab ? "bg-white text-blue-700 shadow-sm" : "text-white hover:bg-blue-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "Bulan" && (
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200 text-center text-xs font-bold text-gray-700 uppercase tracking-wider py-3">
            <div>Sen</div><div>Sel</div><div>Rab</div><div>Kam</div><div>Jum</div><div>Sab</div><div>Min</div>
          </div>
          <div className="grid grid-cols-7 auto-rows-fr">
            {calendarDays.map((item, index) => {
              const isToday = item.dateStr === todayStr;
              return (
                <div key={index} className={`min-h-25 border-b border-r border-gray-200 p-1.5 flex flex-col justify-between transition ${item.isCurrentMonth ? "bg-white" : "bg-gray-50/60"}`}>
                  <div className="flex justify-end">
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${isToday ? "bg-purple-700 text-white shadow-sm" : item.isCurrentMonth ? "text-gray-800" : "text-gray-400"}`}>
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
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="p-12 text-center text-gray-400 bg-gray-50/50 flex flex-col items-center justify-center space-y-2">
            <span className="text-sm font-medium">Belum ada agenda pada bulan {monthsName[month]} {year}.</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="text-center p-10">
      </div>
      
      <div className="px-4">
        <CalendarWidget />
      </div>
    </div>
  );
}