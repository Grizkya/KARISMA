export default function AdminDashboard() {
  return (
    <div>

      {/* HEADER DASHBOARD */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Ringkasan aktivitas KARISMA
        </p>
      </div>


      {/* STATISTICS */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

        {/* USER */}
        <div className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Total User
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-800">
                0
              </h2>

              <p className="mt-2 text-xs text-gray-400">
                Data pengguna
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
              👥
            </div>

          </div>

        </div>


        {/* BOOKING */}
        <div className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Booking
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-800">
                0
              </h2>

              <p className="mt-2 text-xs text-gray-400">
                Seluruh pengajuan
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-2xl">
              📋
            </div>

          </div>

        </div>


        {/* GEDUNG */}
        <div className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Gedung
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-800">
                0
              </h2>

              <p className="mt-2 text-xs text-gray-400">
                Gedung tersedia
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl">
              🏢
            </div>

          </div>

        </div>

      </div>


      {/* STATUS BOOKING */}
      <div className="mt-8">

        <h2 className="mb-4 text-xl font-bold text-gray-800">
          Status Booking
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          {/* MENUNGGU */}
          <div className="rounded-xl bg-white p-6 shadow-sm">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-xl">
                ⏳
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Menunggu
                </p>

                <h3 className="text-2xl font-bold text-gray-800">
                  0
                </h3>
              </div>

            </div>

          </div>


          {/* DISETUJUI */}
          <div className="rounded-xl bg-white p-6 shadow-sm">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-xl">
                ✓
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Disetujui
                </p>

                <h3 className="text-2xl font-bold text-gray-800">
                  0
                </h3>
              </div>

            </div>

          </div>


          {/* DITOLAK */}
          <div className="rounded-xl bg-white p-6 shadow-sm">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl">
                ✕
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Ditolak
                </p>

                <h3 className="text-2xl font-bold text-gray-800">
                  0
                </h3>
              </div>

            </div>

          </div>

        </div>

      </div>


      {/* BOTTOM CONTENT */}
      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">


        {/* PENGAJUAN TERBARU */}
        <div className="rounded-xl bg-white shadow-sm">

          <div className="border-b px-6 py-5">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="font-bold text-gray-800">
                  Pengajuan Terbaru
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Pengajuan peminjaman terbaru
                </p>
              </div>

              <a
                href="/admin/bookings"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Lihat semua
              </a>

            </div>

          </div>


          {/* EMPTY STATE */}
          <div className="flex min-h-48 items-center justify-center px-6">

            <div className="text-center">

              <div className="mb-3 text-4xl">
                📋
              </div>

              <p className="font-medium text-gray-600">
                Belum ada pengajuan
              </p>

              <p className="mt-1 text-sm text-gray-400">
                Data akan muncul setelah terhubung ke database
              </p>

            </div>

          </div>

        </div>


        {/* GEDUNG */}
        <div className="rounded-xl bg-white shadow-sm">

          <div className="border-b px-6 py-5">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="font-bold text-gray-800">
                  Gedung
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Daftar gedung yang dapat dipinjam:
                </p>
              </div>

              <a
                href="/admin/buildings"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Kelola
              </a>

            </div>

          </div>


          <div className="space-y-3 p-6">

            {/* AUDITORIUM */}
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  🏢
                </div>

                <div>
                  <p className="font-medium text-gray-800">
                    Auditorium
                  </p>

                  <p className="text-xs text-gray-500">
                    UNIVERSTAS MATARAM
                  </p>
                </div>

              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                Tersedia
              </span>

            </div>


            {/* DOME */}
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                  🏢
                </div>

                <div>
                  <p className="font-medium text-gray-800">
                    Dome
                  </p>

                  <p className="text-xs text-gray-500">
                     UNIVERSTAS MATARAM
                  </p>
                </div>

              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                Tersedia
              </span>

            </div>


            {/* ARENA BUDAYA */}
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                  🏢
                </div>

                <div>
                  <p className="font-medium text-gray-800">
                    Arena Budaya
                  </p>

                  <p className="text-xs text-gray-500">
                    UNIVERSTAS MATARAM
                  </p>
                </div>

              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                Tersedia
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}