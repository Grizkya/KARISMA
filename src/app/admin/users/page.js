"use client";

import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "./actions";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // FORMAT DATA USER
  // =========================
  const getUserData = (result) => {
    if (Array.isArray(result)) {
      return result;
    }

    if (Array.isArray(result?.data)) {
      return result.data;
    }

    if (Array.isArray(result?.users)) {
      return result.users;
    }

    return [];
  };

  // =========================
  // AMBIL DATA USER
  // =========================
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getUsers();
      const dataUsers = getUserData(result);

      setUsers(dataUsers);
    } catch (err) {
      console.error("Gagal mengambil data user:", err);

      setError(
        err?.message || "Gagal mengambil data user."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOAD SAAT HALAMAN DIBUKA
  // =========================
  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getUsers();

        if (!isMounted) {
          return;
        }

        setUsers(getUserData(result));
      } catch (err) {
        console.error("Gagal mengambil data user:", err);

        if (!isMounted) {
          return;
        }

        setError(
          err?.message || "Gagal mengambil data user."
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void fetchUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  // =========================
  // SEARCH USER
  // =========================
  const filteredUsers = users.filter((user) => {
    const keyword = search.toLowerCase();

    return (
      user.name?.toLowerCase().includes(keyword) ||
      user.email?.toLowerCase().includes(keyword) ||
      user.phone?.toLowerCase().includes(keyword) ||
      user.role?.toLowerCase().includes(keyword)
    );
  });

  // =========================
  // HAPUS USER
  // =========================
  const handleDelete = async (user) => {
    const yakin = window.confirm(
      `Yakin ingin menghapus user "${user.name}"?`
    );

    if (!yakin) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      await deleteUser(user.id);

      alert("User berhasil dihapus.");

      // Ambil ulang data user
      const result = await getUsers();
      const dataUsers = getUserData(result);

      setUsers(dataUsers);

      // Tutup detail jika user yang dihapus sedang dibuka
      if (selectedUser?.id === user.id) {
        setSelectedUser(null);
      }
    } catch (err) {
      console.error("Gagal menghapus user:", err);

      setError(
        err?.message || "Gagal menghapus user."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      {/* =========================
          HEADER
      ========================= */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#133D86] tracking-tight mt-1">
          Data User
        </h1>

        <p className="mt-2 text-gray-500">
          Melihat dan mengelola data akun pengguna
        </p>
      </div>

      {/* =========================
          SEARCH
      ========================= */}
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
            {/* SVG SEARCH */}
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>
            </span>

            <input
              type="text"
              placeholder="Cari nama, email, no. HP..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>
      </div>

      {/* =========================
          ERROR
      ========================= */}
      {error && (
        <div className="mb-6 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          <span>{error}</span>

          <button
            type="button"
            onClick={() => setError("")}
            className="ml-4 font-bold text-red-500 hover:text-red-700"
          >
            ✕
          </button>
        </div>
      )}

      {/* =========================
          TABLE
      ========================= */}
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
                  Role
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {/* =========================
                  LOADING
              ========================= */}
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-16 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>

                      <p className="text-sm text-gray-500">
                        Memuat data user...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length > 0 ? (
                /* =========================
                   DATA USER
                ========================= */
                filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className="border-b last:border-0 hover:bg-gray-50"
                  >
                    {/* NO */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {index + 1}
                    </td>

                    {/* NAMA */}
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800">
                        {user.name || "-"}
                      </p>
                    </td>

                    {/* EMAIL */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.email || "-"}
                    </td>

                    {/* PHONE */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.phone || "-"}
                    </td>

                    {/* ROLE */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {user.role || "-"}
                      </span>
                    </td>

                    {/* AKSI */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        {/* DETAIL */}
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedUser(user)
                          }
                          className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
                        >
                          Detail
                        </button>

                        {/* HAPUS */}
                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(user)
                          }
                          disabled={deleting}
                          className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deleting
                            ? "Menghapus..."
                            : "Hapus"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                /* =========================
                   TIDAK ADA DATA
                ========================= */
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
                        {search
                          ? "User tidak ditemukan"
                          : "Belum ada data user"}
                      </h3>

                      <p className="mt-2 max-w-md text-sm text-gray-400">
                        {search
                          ? "Coba gunakan kata kunci pencarian yang berbeda."
                          : "Data user akan muncul otomatis setelah sistem terhubung dengan database akun."}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================
          MODAL DETAIL USER
      ========================= */}
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
                type="button"
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
                  {selectedUser.name || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-gray-400">
                  Email
                </p>

                <p className="mt-1 text-gray-700">
                  {selectedUser.email || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-gray-400">
                  No. HP
                </p>

                <p className="mt-1 text-gray-700">
                  {selectedUser.phone || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-gray-400">
                  Role
                </p>

                <p className="mt-1 capitalize text-gray-700">
                  {selectedUser.role || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-gray-400">
                  Tanggal Terdaftar
                </p>

                <p className="mt-1 text-gray-700">
                  {selectedUser.created_at || "-"}
                </p>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="border-t px-6 py-4">
              <button
                type="button"
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