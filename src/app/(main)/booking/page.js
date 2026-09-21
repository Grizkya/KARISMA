"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function BookingPage() {
  const [formData, setFormData] = useState({
    pic_name: "",
    pic_identity: "",
    whatsapp: "",
    user_id: "1",
    venue_id: "Auditorium Utama",
    event_name: "",
    purpose: "",
    date: "2026-09-12",
    start_time: "08:00",
    end_time: "12:00",
    participant_count: "",
    signature_file: null,
  });

  const [errors, setErrors] = useState({});
  const [showStartTimeDropdown, setShowStartTimeDropdown] = useState(false);
  const [showEndTimeDropdown, setShowEndTimeDropdown] = useState(false);

  const picNameRef = useRef(null);
  const picIdentityRef = useRef(null);
  const whatsappRef = useRef(null);
  const eventNameRef = useRef(null);
  const dateRef = useRef(null);
  const participantCountRef = useRef(null);
  const purposeRef = useRef(null);
  const signatureRef = useRef(null);

  const startRef = useRef(null);
  const endRef = useRef(null);

  const timeOptions = [
    "06:00", "07:00", "08:00", "09:00", "10:00",
    "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00",
  ];

  useEffect(() => {
    function handleClickOutside(event) {
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
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.pic_name) {
      newErrors.pic_name = "⚠️ Mohon isi Nama Penanggung Jawab terlebih dahulu.";
      picNameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      picNameRef.current?.focus();
    } else if (!formData.pic_identity) {
      newErrors.pic_identity = "⚠️ Mohon isi NIM / NIP terlebih dahulu.";
      picIdentityRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      picIdentityRef.current?.focus();
    } else if (!formData.whatsapp) {
      newErrors.whatsapp = "⚠️ Mohon isi Nomor WhatsApp Aktif terlebih dahulu.";
      whatsappRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      whatsappRef.current?.focus();
    } else if (!formData.event_name) {
      newErrors.event_name = "⚠️ Mohon isi Nama Kegiatan terlebih dahulu.";
      eventNameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      eventNameRef.current?.focus();
    } else if (!formData.date) {
      newErrors.date = "⚠️ Mohon pilih Tanggal kegiatan terlebih dahulu.";
      dateRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      dateRef.current?.focus();
    } else if (!formData.participant_count) {
      newErrors.participant_count = "⚠️ Mohon isi Jumlah Peserta terlebih dahulu.";
      participantCountRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      participantCountRef.current?.focus();
    } else if (!formData.purpose) {
      newErrors.purpose = "⚠️ Mohon isi Tujuan / Deskripsi Kegiatan terlebih dahulu.";
      purposeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      purposeRef.current?.focus();
    } else if (!formData.signature_file) {
      newErrors.signature_file = "⚠️ Mohon unggah File Tanda Tangan terlebih dahulu.";
      signatureRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    console.log("Data siap disimpan ke database:", formData);
    alert("✅ Pengajuan reservasi berhasil dibuat!");
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-6 relative">
      
    
      <div className="max-w-3xl mx-auto mb-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-[#133D86] hover:text-[#F4B042] text-sm font-semibold transition-colors duration-200"
          title="Kembali ke Beranda"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="hidden xs:inline sm:inline">Beranda</span>
        </Link>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
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

        {/* Form Container */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-gray-100">

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Bagian 1 */}
            <div id="step-section-1" className="space-y-4">
              <div className="pb-2 border-b border-gray-100">
                <h3 className="text-base font-bold text-[#133D86]">
                  1. Identitas Penanggung Jawab
                </h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                      Nama Penanggung Jawab <span className="text-red-500">*</span>
                    </label>
                    {errors.pic_name && (
                      <span className="text-xs font-medium text-red-500/80 opacity-90">{errors.pic_name}</span>
                    )}
                  </div>
                  <input
                    ref={picNameRef}
                    type="text"
                    name="pic_name"
                    value={formData.pic_name}
                    onChange={handleChange}
                    placeholder="Contoh: M. Iqbal Pratama"
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#133D86] transition"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                      NIM / NIP <span className="text-red-500">*</span>
                    </label>
                    {errors.pic_identity && (
                      <span className="text-xs font-medium text-red-500/80 opacity-90">{errors.pic_identity}</span>
                    )}
                  </div>
                  <input
                    ref={picIdentityRef}
                    type="text"
                    name="pic_identity"
                    value={formData.pic_identity}
                    onChange={handleChange}
                    placeholder="Contoh: E1D021088"
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#133D86] transition"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                      Nomor WhatsApp Aktif <span className="text-red-500">*</span>
                    </label>
                    {errors.whatsapp && (
                      <span className="text-xs font-medium text-red-500/80 opacity-90">{errors.whatsapp}</span>
                    )}
                  </div>
                  <input
                    ref={whatsappRef}
                    type="text"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="Contoh: 0819-0789-3321"
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#133D86] transition"
                  />
                </div>
              </div>
            </div>

            {/* Bagian 2 */}
            <div id="step-section-2" className="space-y-4">
              <div className="pb-2 border-b border-gray-100">
                <h3 className="text-base font-bold text-[#133D86]">
                  2. Detail Kegiatan & Jadwal Venue
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                      Nama Kegiatan <span className="text-red-500">*</span>
                    </label>
                    {errors.event_name && (
                      <span className="text-xs font-medium text-red-500/80 opacity-90">{errors.event_name}</span>
                    )}
                  </div>
                  <input
                    ref={eventNameRef}
                    type="text"
                    name="event_name"
                    value={formData.event_name}
                    onChange={handleChange}
                    placeholder="Contoh: Seminar Nasional Teknologi"
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#133D86] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Pilih Venue <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="venue_id"
                    value={formData.venue_id}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#133D86] transition"
                  >
                    <option value="Auditorium Utama">Auditorium Utama</option>
                    <option value="Gedung Dome">Gedung Dome</option>
                    <option value="Arena Budaya">Arena Budaya</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                      Tanggal <span className="text-red-500">*</span>
                    </label>
                    {errors.date && (
                      <span className="text-xs font-medium text-red-500/80 opacity-90">{errors.date}</span>
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
                    Jam Mulai <span className="text-red-500">*</span>
                  </label>
                  <div 
                    onClick={() => setShowStartTimeDropdown(!showStartTimeDropdown)} 
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 flex justify-between items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#133D86]"
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
                          className="px-4 py-2 text-xs hover:bg-blue-50 cursor-pointer text-gray-700 transition"
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative" ref={endRef}>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Jam Selesai <span className="text-red-500">*</span>
                  </label>
                  <div 
                    onClick={() => setShowEndTimeDropdown(!showEndTimeDropdown)} 
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 flex justify-between items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#133D86]"
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
                          className="px-4 py-2 text-xs hover:bg-blue-50 cursor-pointer text-gray-700 transition"
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                    Jumlah Peserta <span className="text-red-500">*</span>
                  </label>
                  {errors.participant_count && (
                    <span className="text-xs font-medium text-red-500/80 opacity-90">{errors.participant_count}</span>
                  )}
                </div>
                <input
                  ref={participantCountRef}
                  type="number"
                  name="participant_count"
                  value={formData.participant_count}
                  onChange={handleChange}
                  placeholder="Contoh: 200"
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#133D86] transition"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                    Tujuan / Deskripsi Kegiatan <span className="text-red-500">*</span>
                  </label>
                  {errors.purpose && (
                    <span className="text-xs font-medium text-red-500/80 opacity-90">{errors.purpose}</span>
                  )}
                </div>
                <textarea
                  ref={purposeRef}
                  name="purpose"
                  rows="3"
                  value={formData.purpose}
                  onChange={handleChange}
                  placeholder="Tuliskan deskripsi lengkap kegiatan..."
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#133D86] transition"
                ></textarea>
              </div>
            </div>

            {/* Bagian 3 */}
            <div id="step-section-3" className="space-y-4" ref={signatureRef}>
              <div className="pb-2 border-b border-gray-100">
                <h3 className="text-base font-bold text-[#133D86]">
                  3. Unggah Tanda Tangan
                </h3>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                    File Tanda Tangan (PNG / JPG / PDF, Max 5MB) <span className="text-red-500">*</span>
                  </label>
                  {errors.signature_file && (
                    <span className="text-xs font-medium text-red-500/80 opacity-90">{errors.signature_file}</span>
                  )}
                </div>
                <div className="relative border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-blue-50/50 transition rounded-xl p-6 text-center cursor-pointer">
                  <input
                    type="file"
                    name="signature_file"
                    accept=".png, .jpg, .jpeg, .pdf"
                    onChange={handleChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {formData.signature_file ? formData.signature_file.name : "Klik atau seret file tanda tangan ke sini"}
                  </p>
                  <span className={`mt-3 inline-block px-4 py-1.5 text-xs font-semibold rounded-full transition ${
                    formData.signature_file 
                      ? "bg-emerald-600 text-white" 
                      : "bg-[#edeff4] text-grey"
                  }`}>
                    {formData.signature_file ? "File Terunggah" : "Pilih File"}
                  </span>
                </div>
              </div>
            </div>

            {/* Tombol Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#133D86] hover:bg-[#0d2a5e] text-white font-bold py-3 px-6 rounded-xl shadow-md transition duration-200 text-sm uppercase tracking-wider"
              >
                Kirim Pengajuan Reservasi
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}