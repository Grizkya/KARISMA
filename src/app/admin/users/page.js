"use client";

import { useState } from "react";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // DATA AKAN DIAMBIL DARI DATABASE/BACKEND NANTI
  const users = [];

  // Search user
  const filteredUsers = users.filter((user) => {
    const keyword = search.toLowerCase();

    return (
      user.nama?.toLowerCase().includes(keyword) ||
      user.email?.toLowerCase().includes(keyword) ||
      user.no_hp?.toLowerCase().includes(keyword)
    );
  });

  // Hapus user
  const handleDelete = (user) => {
    console.log("Hapus user:", user);
    // Nanti dihubungkan ke API DELETE
  };

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Data User
        </h1>

        <p className="mt-2 text-gray-500">
          Melihat dan mengelola data akun pengguna
        </p>
      </div>

      {/* SEARCH */}
      <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-semibold text-gray-800">
              Daftar Pengguna
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Data pengguna berasal dari akun yang telah terdaftar
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>

            <input
              type="text"
              placeholder="Cari nama, email, atau no. HP..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50 text-left">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  No
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Nama
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Email
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  No. HP
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Password
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className="border-b last:border-0 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800">
                        {user.nama}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.email}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.no_hp}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      ••••••••
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        {/* DETAIL */}
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
                        >
                          Detail
                        </button>

                        {/* DELETE */}
                        <button
                          onClick={() => handleDelete(user)}
                          className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-16 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-3xl">
                        👥
                      </div>

                      <h3 className="font-semibold text-gray-700">
                        Belum ada data user
                      </h3>

                      <p className="mt-2 max-w-md text-sm text-gray-400">
                        Data user akan muncul otomatis setelah
                        sistem terhubung dengan database akun.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DETAIL */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Detail User
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Informasi akun pengguna
                </p>
              </div>

              <button
                onClick={() => setSelectedUser(null)}
                className="text-xl text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* DETAIL */}
            <div className="space-y-4 p-6">
              <div>
                <p className="text-xs font-medium uppercase text-gray-400">
                  Nama
                </p>

                <p className="mt-1 font-medium text-gray-800">
                  {selectedUser.nama}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-gray-400">
                  Email
                </p>

                <p className="mt-1 text-gray-700">
                  {selectedUser.email}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-gray-400">
                  No. HP
                </p>

                <p className="mt-1 text-gray-700">
                  {selectedUser.no_hp}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-gray-400">
                  Password
                </p>

                <p className="mt-1 tracking-widest text-gray-500">
                  ••••••••
                </p>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="border-t px-6 py-4">
              <button
                onClick={() => setSelectedUser(null)}
                className="w-full rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}