"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

export default function BookingPage() {
  const [formData, setFormData] = useState({
    user_id: 1,
    venue_id: "",
    event_name: "",
    purpose: "",
    date: "2026-10-10",
    start_time: "09:00:00",
    end_time: "12:00:00",
    participant_count: "",
    admin_note: "",
    signature_url: null,
  });

  const [venueOptions, setVenueOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showVenueDropdown, setShowVenueDropdown] = useState(false);
  const [showStartTimeDropdown, setShowStartTimeDropdown] = useState(false);
  const [showEndTimeDropdown, setShowEndTimeDropdown] = useState(false);

  const venueRef = useRef(null);
  const eventNameRef = useRef(null);
  const dateRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);

  const timeOptions = [
    "06:00:00", "07:00:00", "08:00:00", "09:00:00", "10:00:00",
    "11:00:00", "12:00:00", "13:00:00", "14:00:00", "15:00:00", 
    "16:00:00", "17:00:00", "18:00:00", "19:00:00", "20:00:00", "21:00:00",
  ];

  useEffect(() => {
    async function fetchVenues() {
      try {
        const response = await apiFetch("/venues");
        const venuesData = Array.isArray(response) ? response : response.data || [];
        setVenueOptions(venuesData);
      } catch (error) {
        console.error("Gagal memuat data gedung:", error);
      }
    }

    fetchVenues();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (venueRef.current && !venueRef.current.contains(event.target)) {
        setShowVenueDropdown(false);
      }
      if (startRef.current && !startRef.current.contains(event.target)) {
        setShowStartTimeDropdown(false);
      }
      if (endRef.current && !endRef.current.contains(event.target)) {
        setShowEndTimeDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.event_name) {
      newErrors.event_name = "Mohon isi Nama Kegiatan terlebih dahulu.";
      eventNameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      eventNameRef.current?.focus();
    } else if (!formData.venue_id) {
      newErrors.venue_id = "Mohon pilih Gedung terlebih dahulu.";
      venueRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (!formData.date) {
      newErrors.date = "Mohon pilih Tanggal terlebih dahulu.";
      dateRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      dateRef.current?.focus();
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        user_id: Number(formData.user_id),
        venue_id: Number(formData.venue_id),
        event_name: formData.event_name,
        purpose: formData.purpose || null,
        date: formData.date,
        start_time: formData.start_time,
        end_time: formData.end_time,
        participant_count: formData.participant_count ? Number(formData.participant_count) : null,
        admin_note: formData.admin_note || "",
        signature_url: formData.signature_url || null,
      };

      const result = await apiFetch("/bookings", {
        method: "POST",
        body: payload,
      });

      console.log("Response sukses:", result);
      alert("Pengajuan reservasi berhasil!");
    } catch (error) {
      console.error("Error API:", error);
      alert(`Terjadi kesalahan: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedVenueName = venueOptions.find((v) => v.id === formData.venue_id)?.name || "Pilih Gedung";

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-6 relative">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-9">
          <Link href="/" className="hover:text-[#133D86] transition">Beranda</Link>
          <span>/</span>
          <span className="text-[#133D86] font-semibold">Booking</span>
        </div>
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-block px-3 py-1 bg-[#fcefdb8a] text-[#F4B042] text-xs font-semibold rounded-full uppercase tracking-wider">
            Form Reservasi RaVenue
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#133D86] leading-tight">
            Pengajuan Reservasi Gedung
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Lengkapi instrumen peminjaman fasilitas Universitas Mataram secara valid dan akurat.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Nama Kegiatan <span className="text-red-400/60">*</span>
                </label>
                {errors.event_name && (
                  <span className="text-xs font-normal text-rose-400/80 [text-shadow:0_0_1px_rgba(251,113,133,0.3)]">{errors.event_name}</span>
                )}
              </div>
              <input
                ref={eventNameRef}
                type="text"
                name="event_name"
                value={formData.event_name}
                onChange={handleChange}
                placeholder="Contoh: Rapat Koordinasi"
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#133D86] transition"
              />
            </div>

            <div className="relative" ref={venueRef}>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Gedung <span className="text-red-400/60">*</span>
                </label>
                {errors.venue_id && (
                  <span className="text-xs font-normal text-rose-400/80 [text-shadow:0_0_1px_rgba(251,113,133,0.3)]">{errors.venue_id}</span>
                )}
              </div>
              <div 
                onClick={() => setShowVenueDropdown(!showVenueDropdown)}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 flex justify-between items-center cursor-pointer"
              >
                <span className={formData.venue_id ? "text-gray-800 font-medium" : "text-gray-400"}>
                  {selectedVenueName}
                </span>
                <span className="text-gray-400 text-xs">▼</span>
              </div>
              {showVenueDropdown && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {venueOptions.length > 0 ? (
                    venueOptions.map((venue) => (
                      <div 
                        key={venue.id} 
                        onClick={() => { 
                          setFormData({ ...formData, venue_id: venue.id }); 
                          setShowVenueDropdown(false); 
                          if (errors.venue_id) setErrors({ ...errors, venue_id: "" });
                        }} 
                        className="px-4 py-2.5 text-xs hover:bg-blue-50 cursor-pointer text-gray-700 border-b border-gray-50 last:border-none font-medium"
                      >
                        {venue.name}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2.5 text-xs text-gray-400 text-center">Memuat data gedung...</div>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Tujuan / Deskripsi <span className="text-gray-400 font-normal">(Opsional)</span>
              </label>
              <textarea
                name="purpose"
                rows="3"
                value={formData.purpose}
                onChange={handleChange}
                placeholder="Tuliskan tujuan atau deskripsi kegiatan..."
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#133D86] transition"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                    Tanggal <span className="text-red-400/60">*</span>
                  </label>
                  {errors.date && (
                    <span className="text-xs font-normal text-rose-400/80 [text-shadow:0_0_1px_rgba(251,113,133,0.3)]">{errors.date}</span>
                  )}
                </div>
                <input
                  ref={dateRef}
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#133D86] transition"
                />
              </div>

              <div className="relative" ref={startRef}>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Jam Mulai <span className="text-red-400/60">*</span>
                </label>
                <div 
                  onClick={() => setShowStartTimeDropdown(!showStartTimeDropdown)} 
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 flex justify-between items-center cursor-pointer"
                >
                  <span>{formData.start_time}</span>
                  <span className="text-gray-400 text-xs">▼</span>
                </div>
                {showStartTimeDropdown && (
                  <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                    {timeOptions.map((time) => (
                      <div 
                        key={time} 
                        onClick={() => { setFormData({ ...formData, start_time: time }); setShowStartTimeDropdown(false); }} 
                        className="px-4 py-2 text-xs hover:bg-blue-50 cursor-pointer text-gray-700"
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative" ref={endRef}>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Jam Selesai <span className="text-red-400/60">*</span>
                </label>
                <div 
                  onClick={() => setShowEndTimeDropdown(!showEndTimeDropdown)} 
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 flex justify-between items-center cursor-pointer"
                >
                  <span>{formData.end_time}</span>
                  <span className="text-gray-400 text-xs">▼</span>
                </div>
                {showEndTimeDropdown && (
                  <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                    {timeOptions.map((time) => (
                      <div 
                        key={time} 
                        onClick={() => { setFormData({ ...formData, end_time: time }); setShowEndTimeDropdown(false); }} 
                        className="px-4 py-2 text-xs hover:bg-blue-50 cursor-pointer text-gray-700"
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Jumlah Peserta <span className="text-gray-400 font-normal">(Opsional)</span>
              </label>
              <input
                type="number"
                name="participant_count"
                min="0"
                value={formData.participant_count}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || Number(value) >= 0) {
                    handleChange(e);
                  }
                }}
                placeholder="Contoh: 50"
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#133D86] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                URL Tanda Tangan <span className="text-gray-400 font-normal">(Opsional)</span>
              </label>
              <input
                type="text"
                name="signature_url"
                value={formData.signature_url || ""}
                onChange={handleChange}
                placeholder="Contoh: https://example.com/signature.png"
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#133D86] transition"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#133D86] hover:bg-[#0d2a5e] text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition duration-200 text-sm uppercase tracking-wider disabled:opacity-50"
              >
                {isLoading ? "Sedang Mengirim..." : "Kirim Pengajuan Reservasi"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}