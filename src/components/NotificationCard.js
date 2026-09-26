// Fallback helper jika getStatus tidak dipassing dari parent
const defaultGetStatus = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "Menunggu Verifikasi";
    case "processing":
      return "Proses Review";
    case "approved":
      return "Disetujui (Approved)";
    case "rejected":
      return "Ditolak (Rejected) / Revisi";
    default:
      return status || "-";
  }
};

// Fallback helper styling status badge sesuai tema KARISMA
const defaultGetStatusStyle = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "bg-amber-100 text-amber-800";
    case "processing":
      return "bg-blue-100 text-blue-700";
    case "approved":
      return "bg-green-100 text-green-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function NotificationCard({
  venue_name,
  event_name,
  status,
  purpose,
  date,
  start_time,
  end_time,
  participant_count,
  admin_note,
  getStatus,
  getStatusStyle,
}) {
  // Format waktu yang rapi (mencegah "- - -" jika jam belum tersedia)
  const timeDisplay =
    start_time && end_time
      ? `${start_time} - ${end_time}`
      : start_time || end_time || "-";

  // Format jumlah peserta sesuai tema
  const participantDisplay =
    participant_count !== null &&
    participant_count !== undefined &&
    participant_count !== ""
      ? String(participant_count).toLowerCase().includes("orang")
        ? participant_count
        : `${participant_count} Orang`
      : "-";

  // Data detail informasi booking terstruktur
  const bookingDetails = [
    { label: "Tujuan", value: purpose || "-" },
    { label: "Tanggal", value: date || "-" },
    { label: "Waktu", value: timeDisplay },
    { label: "Jumlah Peserta", value: participantDisplay },
  ];

  // Resolve status text dan style dengan fallback yang aman
  const currentStatusText = getStatus ? getStatus(status) : defaultGetStatus(status);
  const currentStatusStyle = getStatusStyle ? getStatusStyle(status) : defaultGetStatusStyle(status);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
      {/* HEADER */}
      <div className="flex flex-col gap-4 border-b border-gray-200 pb-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="mb-1 text-xl font-bold text-[#133D86]">
            {venue_name || "Nama Gedung"}
          </h2>
          <p className="text-sm text-gray-600">
            {event_name || "Nama Acara"}
          </p>
        </div>

        {/* STATUS */}
        <span className={`w-fit whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold ${currentStatusStyle}`}>
          {currentStatusText}
        </span>
      </div>

      {/* INFORMASI BOOKING */}
      <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">
        {bookingDetails.map((item, index) => (
          <div key={index} className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-gray-500">{item.label}</span>
            <span className="text-sm text-gray-700">{item.value}</span>
          </div>
        ))}

        {/* CATATAN ADMIN */}
        {admin_note && (
          <div className="col-span-1 flex flex-col gap-1 rounded-lg border border-slate-200/80 bg-slate-50 p-3 md:col-span-2">
            <span className="text-xs font-semibold text-gray-500">
              Catatan Admin
            </span>
            <span className="text-sm text-gray-700 whitespace-pre-line">
              {admin_note}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}