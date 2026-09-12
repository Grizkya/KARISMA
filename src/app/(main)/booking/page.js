"use client";
import { useState, useRef, useEffect } from "react";

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    pic_name: "",
    pic_identity: "",
    whatsapp: "",
    user_id: "1",
    venue_id: "1",
    event_name: "",
    purpose: "",
    date: "2026-09-12",
    start_time: "08:00",
    end_time: "12:00",
    participant_count: "",
    proposal_file: null,
    recommendation_file: null,
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const [showStartTimeDropdown, setShowStartTimeDropdown] = useState(false);
  const [showEndTimeDropdown, setShowEndTimeDropdown] = useState(false);
  
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

  const handleStepClick = (step) => {
    setCurrentStep(step);
    const element = document.getElementById(`step-section-${step}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (
      !formData.pic_name || 
      !formData.pic_identity || 
      !formData.whatsapp || 
      !formData.event_name || 
      !formData.date || 
      !formData.start_time || 
      !formData.end_time || 
      !formData.participant_count || 
      !formData.proposal_file || 
      !formData.recommendation_file
    ) {
      setMessage({
        text: "⚠️ Mohon lengkapi seluruh kolom wajib bertanda bintang (*).",
        type: "error",
      });
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

        {/* Stepper Indikator (Lebih Ringkas) */}
        <div className="mb-6">
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 1, title: "Identitas" },
              { id: 2, title: "Jadwal & Venue" },
              { id: 3, title: "Dokumen" },
            ].map((step) => (
              <div
                key={step.id}
                onClick={() => handleStepClick(step.id)}
                className={`p-2.5 rounded-lg border transition flex items-center gap-3 cursor-pointer ${
                  currentStep === step.id
                    ? "bg-blue-50/80 border-blue-200"
                    : "bg-gray-50 border-gray-100 opacity-70 hover:opacity-100"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                  currentStep === step.id ? "bg-[#0b192c] text-white" : "bg-gray-200 text-gray-600"
                }`}>
                  {step.id}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Langkah {step.id}</p>
                  <h4 className="text-xs font-bold text-gray-800">{step.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {message.text && (
          <div className={`p-3 mb-4 rounded-lg text-xs font-medium ${
            message.type === "error" ? "bg-red-50 text-red-700 border border-red-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Bagian 1 */}
          <div id="step-section-1" className="space-y-3">
            <h3 className="text-sm font-bold text-gray-900 pb-1 border-b border-gray-100">1. Identitas Penanggung Jawab</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">Nama <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="pic_name"
                  value={formData.pic_name}
                  onChange={handleChange}
                  placeholder="Nama Lengkap"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 focus:ring-1 focus:ring-blue-600 outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">NIM / NIP <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="pic_identity"
                  value={formData.pic_identity}
                  onChange={handleChange}
                  placeholder="NIM/NIP"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 focus:ring-1 focus:ring-blue-600 outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">WhatsApp <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="0819xxxx"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 focus:ring-1 focus:ring-blue-600 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Bagian 2 */}
          <div id="step-section-2" className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-gray-900 pb-1 border-b border-gray-100">2. Detail Kegiatan & Jadwal</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">Nama Kegiatan <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="event_name"
                  value={formData.event_name}
                  onChange={handleChange}
                  placeholder="Contoh: Seminar Nasional"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 focus:ring-1 focus:ring-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">Pilih Venue <span className="text-red-500">*</span></label>
                <select
                  name="venue_id"
                  value={formData.venue_id}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 focus:ring-1 focus:ring-blue-600 outline-none"
                >
                  <option value="1">Auditorium Utama</option>
                  <option value="2">Gedung Dome</option>
                  <option value="3">Arena Budaya</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">Tanggal <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 focus:ring-1 focus:ring-blue-600 outline-none"
                />
              </div>

              <div className="relative" ref={startRef}>
                <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">Jam Mulai <span className="text-red-500">*</span></label>
                <div onClick={() => setShowStartTimeDropdown(!showStartTimeDropdown)} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 flex justify-between items-center cursor-pointer">
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
                <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">Jam Selesai <span className="text-red-500">*</span></label>
                <div onClick={() => setShowEndTimeDropdown(!showEndTimeDropdown)} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 flex justify-between items-center cursor-pointer">
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

              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">Jml Peserta <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="participant_count"
                  value={formData.participant_count}
                  onChange={handleChange}
                  placeholder="Contoh: 100"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 focus:ring-1 focus:ring-blue-600 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">Tujuan / Deskripsi Acara</label>
              <textarea
                name="purpose"
                rows="2"
                value={formData.purpose}
                onChange={handleChange}
                placeholder="Tuliskan deskripsi ringkas kegiatan..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 focus:ring-1 focus:ring-blue-600 outline-none"
              ></textarea>
            </div>
          </div>

          {/* Bagian 3 */}
          <div id="step-section-3" className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-gray-900 pb-1 border-b border-gray-100">3. Unggah Berkas (PDF, Max 10MB)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Proposal */}
              <div className="relative border border-dashed border-blue-200 bg-blue-50/20 hover:bg-blue-50/40 rounded-xl p-3 text-center cursor-pointer">
                <input
                  type="file"
                  name="proposal_file"
                  accept=".pdf"
                  onChange={handleChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                />
                <p className="text-xs font-semibold text-gray-800 truncate">
                  📄 {formData.proposal_file ? formData.proposal_file.name : "Proposal Kegiatan *"}
                </p>
                <span className={`mt-1 inline-block px-2 py-0.5 text-[10px] font-semibold rounded ${formData.proposal_file ? "bg-emerald-600 text-white" : "bg-[#1b365d] text-white"}`}>
                  {formData.proposal_file ? "Terunggah ✓" : "Pilih File"}
                </span>
              </div>

              {/* Surat Rekomendasi */}
              <div className="relative border border-dashed border-blue-200 bg-blue-50/20 hover:bg-blue-50/40 rounded-xl p-3 text-center cursor-pointer">
                <input
                  type="file"
                  name="recommendation_file"
                  accept=".pdf"
                  onChange={handleChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                />
                <p className="text-xs font-semibold text-gray-800 truncate">
                  📋 {formData.recommendation_file ? formData.recommendation_file.name : "Surat Rekomendasi *"}
                </p>
                <span className={`mt-1 inline-block px-2 py-0.5 text-[10px] font-semibold rounded ${formData.recommendation_file ? "bg-emerald-600 text-white" : "bg-[#1b365d] text-white"}`}>
                  {formData.recommendation_file ? "Terunggah ✓" : "Pilih File"}
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