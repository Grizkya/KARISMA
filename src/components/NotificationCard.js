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
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* HEADER */}
      <div className="flex flex-col gap-4 border-b border-gray-200 pb-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="mb-1.5 text-xl font-bold text-[#1e3a5f]">
            {venue_name || "Nama Gedung"}
          </h2>

          <p className="text-sm text-gray-600">
            {event_name || "Nama Acara"}
          </p>
        </div>

        {/* STATUS */}
        <span
          className={`w-fit whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold ${getStatusStyle(
            status
          )}`}
        >
          {getStatus(status)}
        </span>
      </div>

      {/* INFORMASI BOOKING */}
      <div className="grid grid-cols-1 gap-4 pt-[18px] md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-gray-500">
            Tujuan
          </span>

          <span className="text-sm text-gray-700">
            {purpose || "-"}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-gray-500">
            Tanggal
          </span>

          <span className="text-sm text-gray-700">
            {date || "-"}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-gray-500">
            Waktu
          </span>

          <span className="text-sm text-gray-700">
            {start_time || "-"} - {end_time || "-"}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-gray-500">
            Jumlah Peserta
          </span>

          <span className="text-sm text-gray-700">
            {participant_count ?? "-"}
          </span>
        </div>

        {/* CATATAN ADMIN */}
        {admin_note && (
          <div className="col-span-1 flex flex-col gap-1 rounded-lg bg-slate-50 p-3 md:col-span-2">
            <span className="text-xs font-semibold text-gray-500">
              Catatan Admin
            </span>

            <span className="text-sm text-gray-700">
              {admin_note}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}