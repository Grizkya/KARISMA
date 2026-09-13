"use client";

import { useState } from "react";

export default function BuildingsPage() {
  const [search, setSearch] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingBuilding, setEditingBuilding] = useState(null);

  // DATA GEDUNG AKAN DIAMBIL DARI DATABASE NANTI
  const buildings = [];

  const filteredBuildings = buildings.filter((building) => {
    const keyword = search.toLowerCase();

    return (
      building.nama?.toLowerCase().includes(keyword) ||
      building.lokasi?.toLowerCase().includes(keyword) ||
      building.deskripsi?.toLowerCase().includes(keyword)
    );
  });

  // TAMBAH
  const handleAdd = () => {
    setEditingBuilding(null);
    setShowForm(true);
  };

  // EDIT
  const handleEdit = (building) => {
    setEditingBuilding(building);
    setShowForm(true);
  };

  // DELETE
  const handleDelete = (building) => {
    console.log("Hapus gedung:", building);
    // Nanti dihubungkan ke API DELETE
  };

  // SUBMIT FORM
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(
      editingBuilding
        ? "Edit gedung"
        : "Tambah gedung"
    );

    // Nanti dihubungkan ke API POST / PUT

    setShowForm(false);
  };

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Gedung
        </h1>

        <p className="mt-2 text-gray-500">
          Kelola data gedung yang tersedia di KARISMA
        </p>
      </div>

      {/* SEARCH + TAMBAH */}
      <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-semibold text-gray-800">
              Daftar Gedung
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Tambah, lihat, ubah, atau hapus data gedung
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {/* SEARCH */}
            <div className="relative w-full sm:w-72">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>

              <input
                type="text"
                placeholder="Cari gedung..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* TAMBAH */}
            <button
              onClick={handleAdd}
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              + Tambah Gedung
            </button>
          </div>
        </div>
      </div>

      {/* DAFTAR GEDUNG */}
      {filteredBuildings.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredBuildings.map((building) => (
            <div
              key={building.id}
              className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md"
            >
              {/* GAMBAR */}
              <div className="flex h-44 items-center justify-center bg-gray-100 text-5xl">
                🏢
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-gray-800">
                      {building.nama}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      📍 {building.lokasi}
                    </p>
                  </div>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    Tersedia
                  </span>
                </div>

                <p className="mt-4 line-clamp-2 text-sm text-gray-500">
                  {building.deskripsi}
                </p>

                {/* ACTION */}
                <div className="mt-5 flex gap-2">
                  <button
                    onClick={() =>
                      setSelectedBuilding(building)
                    }
                    className="flex-1 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
                  >
                    Detail
                  </button>

                  <button
                    onClick={() =>
                      handleEdit(building)
                    }
                    className="flex-1 rounded-lg bg-yellow-50 px-3 py-2 text-sm font-medium text-yellow-600 hover:bg-yellow-100"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(building)
                    }
                    className="flex-1 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* EMPTY STATE */
        <div className="rounded-xl bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-3xl">
            🏢
          </div>

          <h3 className="font-semibold text-gray-700">
            Belum ada data gedung
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm text-gray-400">
            Data gedung akan muncul setelah sistem
            terhubung dengan database.
          </p>
        </div>
      )}

      {/* MODAL DETAIL */}
      {selectedBuilding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Detail Gedung
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Informasi lengkap gedung
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedBuilding(null)
                }
                className="text-xl text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div className="flex h-40 items-center justify-center rounded-lg bg-gray-100 text-5xl">
                🏢
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-gray-400">
                  Nama Gedung
                </p>

                <p className="mt-1 text-lg font-bold text-gray-800">
                  {selectedBuilding.nama}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-gray-400">
                  Lokasi
                </p>

                <p className="mt-1 text-gray-700">
                  {selectedBuilding.lokasi}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-gray-400">
                  Deskripsi
                </p>

                <p className="mt-1 text-gray-700">
                  {selectedBuilding.deskripsi}
                </p>
              </div>
            </div>

            <div className="border-t px-6 py-4">
              <button
                onClick={() =>
                  setSelectedBuilding(null)
                }
                className="w-full rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL TAMBAH / EDIT */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
            {/* HEADER */}
            <div className="flex items-center justify-between border-b px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  {editingBuilding
                    ? "Edit Gedung"
                    : "Tambah Gedung"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Isi informasi gedung
                </p>
              </div>

              <button
                onClick={() => setShowForm(false)}
                className="text-xl text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >
              {/* NAMA */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Nama Gedung
                </label>

                <input
                  type="text"
                  defaultValue={
                    editingBuilding?.nama || ""
                  }
                  placeholder="Contoh: Auditorium"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>

              {/* LOKASI */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Lokasi
                </label>

                <input
                  type="text"
                  defaultValue={
                    editingBuilding?.lokasi || ""
                  }
                  placeholder="Contoh: Universitas Mataram"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>

              {/* DESKRIPSI */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Deskripsi
                </label>

                <textarea
                  defaultValue={
                    editingBuilding?.deskripsi || ""
                  }
                  placeholder="Deskripsi gedung..."
                  rows="4"
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>

              {/* BUTTON */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                  {editingBuilding
                    ? "Simpan Perubahan"
                    : "Tambah Gedung"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}