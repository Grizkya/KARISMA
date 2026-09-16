"use client";
import { useState, useRef, useEffect } from "react";

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);

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

  const [message, setMessage] = useState({ text: "", type: "" });
  const [showStartTimeDropdown, setShowStartTimeDropdown] = useState(false);
  const [showEndTimeDropdown, setShowEndTimeDropdown] = useState(false);
  
  // Refs untuk navigasi otomatis ke elemen yang belum diisi
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
    "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi satu per satu agar bisa diarahkan ke elemen yang kosong
    if (!formData.pic_name) {
      setMessage({ text: "⚠️ Mohon isi Nama Penanggung Jawab terlebih dahulu.", type: "error" });
      picNameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      picNameRef.current?.focus();
      return;
    }
    if (!formData.pic_identity) {
      setMessage({ text: "⚠️ Mohon isi NIM / NIP terlebih dahulu.", type: "error" });
      picIdentityRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      picIdentityRef.current?.focus();
      return;
    }
    if (!formData.whatsapp) {
      setMessage({ text: "⚠️ Mohon isi Nomor WhatsApp Aktif terlebih dahulu.", type: "error" });
      whatsappRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      whatsappRef.current?.focus();
      return;
    }
    if (!formData.event_name) {
      setMessage({ text: "⚠️ Mohon isi Nama Kegiatan terlebih dahulu.", type: "error" });
      eventNameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      eventNameRef.current?.focus();
      return;
    }
    if (!formData.date) {
      setMessage({ text: "⚠️ Mohon pilih Tanggal kegiatan terlebih dahulu.", type: "error" });
      dateRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      dateRef.current?.focus();
      return;
    }
    if (!formData.participant_count) {
      setMessage({ text: "⚠️ Mohon isi Jumlah Peserta terlebih dahulu.", type: "error" });
      participantCountRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      participantCountRef.current?.focus();
      return;
    }
    if (!formData.purpose) {
      setMessage({ text: "⚠️ Mohon isi Tujuan / Deskripsi Kegiatan terlebih dahulu.", type: "error" });
      purposeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      purposeRef.current?.focus();
      return;
    }
    if (!formData.signature_file) {
      setMessage({ text: "⚠️ Mohon unggah File Tanda Tangan terlebih dahulu.", type: "error" });
      signatureRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setCurrentStep(3);
    console.log("Data siap disimpan ke database:", formData);

    setMessage({
      text: "✅ Pengajuan reservasi berhasil dibuat!",
      type: "success",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 flex flex-col justify-center">
      <div className="max-w-3xl mx-auto w-full bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center justify-center gap-2">
            <span>Pengajuan Reservasi Gedung</span>
            <span className="text-[#fca311]">UNRAM</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1 max-w-xl mx-auto">
            Lengkapi instrumen peminjaman fasilitas sarana dan prasarana umum secara valid.
          </p>
        </div>

        {message.text && (
          <div className={`mb-4 text-xs font-medium ${
            message.type === "error" ? "text-red-600" : "text-emerald-700"
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Bagian 1 */}
          <div id="step-section-1" className="space-y-3">
            <div className="flex justify-between items-center pb-1 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">
                1. Identitas Penanggung Jawab
              </h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-700 mb-1">
                  NAMA PENANGGUNG JAWAB <span className="text-red-500">*</span>
                </label>
                <input
                  ref={picNameRef}
                  type="text"
                  name="pic_name"
                  value={formData.pic_name}
                  onChange={handleChange}
                  placeholder="Contoh: M. Iqbal Pratama"
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-gray-800 focus:ring-1 focus:ring-blue-600 outline-none shadow-sm"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-700 mb-1">
                  NIM / NIP <span className="text-red-500">*</span>
                </label>
                <input
                  ref={picIdentityRef}
                  type="text"
                  name="pic_identity"
                  value={formData.pic_identity}
                  onChange={handleChange}
                  placeholder="Contoh: E1D021088"
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-gray-800 focus:ring-1 focus:ring-blue-600 outline-none shadow-sm"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-700 mb-1">
                  NOMOR WHATSAPP AKTIF <span className="text-red-500">*</span>
                </label>
                <input
                  ref={whatsappRef}
                  type="text"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="Contoh: 0819-0789-3321"
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-gray-800 focus:ring-1 focus:ring-blue-600 outline-none shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Bagian 2 */}
          <div id="step-section-2" className="space-y-3 pt-4">
            <div className="flex justify-between items-center pb-1 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">2. Detail Kegiatan & Jadwal Venue</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-700 mb-1">
                  NAMA KEGIATAN <span className="text-orange-500 font-normal">(EVENT_NAME)</span> <span className="text-red-500">*</span>
                </label>
                <input
                  ref={eventNameRef}
                  type="text"
                  name="event_name"
                  value={formData.event_name}
                  onChange={handleChange}
                  placeholder="Contoh: Seminar Nasional Teknologi"
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-gray-800 focus:ring-1 focus:ring-blue-600 outline-none shadow-sm"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-700 mb-1">
                  PILIH VENUE <span className="text-orange-500 font-normal">(VENUE_ID)</span> <span className="text-red-500">*</span>
                </label>
                <select
                  name="venue_id"
                  value={formData.venue_id}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-gray-800 focus:ring-1 focus:ring-blue-600 outline-none shadow-sm"
                >
                  <option value="Auditorium Utama">Auditorium Utama</option>
                  <option value="Gedung Dome">Gedung Dome</option>
                  <option value="Arena Budaya">Arena Budaya</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-700 mb-1">
                  TANGGAL <span className="text-orange-500 font-normal">(DATE)</span> <span className="text-red-500">*</span>
                </label>
                <input
                  ref={dateRef}
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-gray-800 focus:ring-1 focus:ring-blue-600 outline-none shadow-sm"
                />
              </div>

              <div className="relative" ref={startRef}>
                <label className="block text-[11px] font-bold uppercase text-gray-700 mb-1">
                  JAM MULAI <span className="text-orange-500 font-normal">(START_TIME)</span> <span className="text-red-500">*</span>
                </label>
                <div onClick={() => setShowStartTimeDropdown(!showStartTimeDropdown)} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-gray-800 flex justify-between items-center cursor-pointer shadow-sm">
                  <span>{formData.start_time}</span>
                  <span className="text-gray-400 text-[10px]">▼</span>
                </div>
                {showStartTimeDropdown && (
                  <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-40 overflow-y-auto">
                    {timeOptions.map((time) => (
                      <div key={time} onClick={() => { setFormData({ ...formData, start_time: time }); setShowStartTimeDropdown(false); }} className="px-3 py-1.5 text-xs hover:bg-blue-50 cursor-pointer text-gray-700">
                        {time}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative" ref={endRef}>
                <label className="block text-[11px] font-bold uppercase text-gray-700 mb-1">
                  JAM SELESAI <span className="text-orange-500 font-normal">(END_TIME)</span> <span className="text-red-500">*</span>
                </label>
                <div onClick={() => setShowEndTimeDropdown(!showEndTimeDropdown)} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-gray-800 flex justify-between items-center cursor-pointer shadow-sm">
                  <span>{formData.end_time}</span>
                  <span className="text-gray-400 text-[10px]">▼</span>
                </div>
                {showEndTimeDropdown && (
                  <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-40 overflow-y-auto">
                    {timeOptions.map((time) => (
                      <div key={time} onClick={() => { setFormData({ ...formData, end_time: time }); setShowEndTimeDropdown(false); }} className="px-3 py-1.5 text-xs hover:bg-blue-50 cursor-pointer text-gray-700">
                        {time}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-gray-700 mb-1">
                JUMLAH PESERTA <span className="text-orange-500 font-normal">(PARTICIPANT_COUNT)</span> <span className="text-red-500">*</span>
              </label>
              <input
                ref={participantCountRef}
                type="number"
                name="participant_count"
                value={formData.participant_count}
                onChange={handleChange}
                placeholder="Contoh: 200"
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-gray-800 focus:ring-1 focus:ring-blue-600 outline-none shadow-sm"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-gray-700 mb-1">
                TUJUAN / DESKRIPSI KEGIATAN <span className="text-red-500">*</span>
              </label>
              <textarea
                ref={purposeRef}
                name="purpose"
                rows="3"
                value={formData.purpose}
                onChange={handleChange}
                placeholder="Tuliskan deskripsi lengkap kegiatan..."
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-xs text-gray-800 focus:ring-1 focus:ring-blue-600 outline-none shadow-sm"
              ></textarea>
            </div>
          </div>

          {/* Bagian 3 */}
          <div id="step-section-3" className="space-y-3 pt-4" ref={signatureRef}>
            <div className="flex justify-between items-center pb-1 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">3. Unggah Tanda Tangan</h3>
            </div>
            
            <div>
              <label className="block text-[11px] font-bold uppercase text-gray-700 mb-1">
                FILE TANDA TANGAN (PNG / JPG / PDF, Max 5MB) <span className="text-red-500">*</span>
              </label>
              <div className="relative border border-dashed border-blue-200 bg-white hover:bg-gray-50 rounded-xl p-4 text-center cursor-pointer">
                <input
                  type="file"
                  name="signature_file"
                  accept=".png, .jpg, .jpeg, .pdf"
                  onChange={handleChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                />
                <p className="text-xs font-semibold text-gray-800 truncate">
                  {formData.signature_file ? formData.signature_file.name : "Klik atau seret file tanda tangan ke sini"}
                </p>
                <span className={`mt-2 inline-block px-3 py-1 text-[10px] font-semibold rounded ${formData.signature_file ? "bg-emerald-600 text-white" : "bg-[#e9ecef] text-grey"}`}>
                  {formData.signature_file ? "Diunggah" : "Pilih File Tanda Tangan"}
                </span>
              </div>
            </div>
          </div>

          {/* Tombol Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#1b365d] hover:bg-blue-900 text-white font-bold py-2.5 px-6 rounded-xl shadow-md transition text-xs uppercase tracking-wider"
            >
              Kirim Pengajuan Reservasi
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}