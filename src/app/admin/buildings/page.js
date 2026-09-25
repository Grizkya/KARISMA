"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getBuildings,
  addBuilding,
  updateBuilding,
  deleteBuilding,
} from "./actions";

function formatBuildings(result) {
  if (!Array.isArray(result)) {
    return [];
  }

  return result.map((item) => ({
    ...item,
    nama: item.name || "",
    lokasi: item.location || "",
    kapasitas: item.capacity || "",
    deskripsi: item.description || "",
    foto: item.image_url || "",
  }));
}

export default function BuildingsPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [editingBuilding, setEditingBuilding] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const [search, setSearch] = useState("");
  const [buildings, setBuildings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [savingEdit, setSavingEdit] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [formData, setFormData] = useState({
    nama: "",
    lokasi: "",
    kapasitas: "",
    deskripsi: "",
    foto: "",
  });

  // =========================
  // LOAD DATA GEDUNG
  // =========================
  async function loadBuildings() {
    try {
      setLoading(true);
      setError("");

      const result = await getBuildings();

      const formattedData = formatBuildings(result);

      setBuildings(formattedData);
    } catch (err) {
      console.error("Gagal mengambil data gedung:", err);

      setError(
        err?.message ||
          "Gagal mengambil data gedung dari server."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let isMounted = true;

    const fetchBuildings = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getBuildings();
        const formattedData = formatBuildings(result);

        if (isMounted) {
          setBuildings(formattedData);
        }
      } catch (err) {
        console.error("Gagal mengambil data gedung:", err);

        if (isMounted) {
          setError(
            err?.message ||
              "Gagal mengambil data gedung dari server."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void fetchBuildings();

    return () => {
      isMounted = false;
    };
  }, []);

  // =========================
  // SEARCH
  // =========================
  const filteredBuildings = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return buildings;
    }

    return buildings.filter((building) => {
      const nama = building.nama?.toLowerCase() || "";
      const lokasi = building.lokasi?.toLowerCase() || "";

      return (
        nama.includes(keyword) ||
        lokasi.includes(keyword)
      );
    });
  }, [buildings, search]);

  // =========================
  // FORM HANDLER
  // =========================
  function handleFormChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // =========================
  // TAMBAH GEDUNG
  // =========================
  async function handleAddBuilding() {
    try {
      setLoading(true);
      setError("");

      await addBuilding({
        name: formData.nama,
        location: formData.lokasi,
        capacity: Number(formData.kapasitas),
        description: formData.deskripsi,
      });

      alert("Gedung berhasil ditambahkan ke API.");

      setShowAddModal(false);

      setFormData({
        nama: "",
        lokasi: "",
        kapasitas: "",
        deskripsi: "",
        foto: "",
      });

      await loadBuildings();
    } catch (err) {
      console.error(
        "Gagal menambahkan gedung:",
        err
      );

      setError(
        err?.message ||
          "Gagal menambahkan data gedung."
      );

      alert(
        err?.message ||
          "Gagal menambahkan data gedung."
      );
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // BUKA EDIT
  // =========================
  function handleEdit(building) {
    setEditingBuilding(building);

    setFormData({
      nama: building.nama || "",
      lokasi: building.lokasi || "",
      kapasitas: building.kapasitas || building.capacity || "",
      deskripsi: building.deskripsi || "",
      foto: building.foto || "",
    });

    setShowEditModal(true);
  }

  // =========================
  // UPDATE GEDUNG
  // =========================
  async function handleUpdateBuilding(e) {
    e.preventDefault();

    if (!editingBuilding) {
      return;
    }

    try {
      setSavingEdit(true);
      setError("");

      await updateBuilding(editingBuilding.id, {
        name: formData.nama,
        location: formData.lokasi,
        capacity: Number(formData.kapasitas),
        description: formData.deskripsi,
      });

      setShowEditModal(false);
      setEditingBuilding(null);

      setFormData({
        nama: "",
        lokasi: "",
        kapasitas: "",
        deskripsi: "",
        foto: "",
      });

      await loadBuildings();
    } catch (err) {
      console.error(
        "Gagal mengubah gedung:",
        err
      );

      setError(
        err?.message ||
          "Gagal mengubah data gedung."
      );
    } finally {
      setSavingEdit(false);
    }
  }

  // =========================
  // DETAIL GEDUNG
  // =========================
  function handleDetail(building) {
    setSelectedBuilding(building);
    setShowDetailModal(true);
  }

  // =========================
  // HAPUS GEDUNG
  // =========================
  async function handleDelete(building) {
    const confirmed = window.confirm(
      `Apakah kamu yakin ingin menghapus gedung "${building.nama}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(building.id);
      setError("");

      await deleteBuilding(building.id);

      await loadBuildings();
    } catch (err) {
      console.error(
        "Gagal menghapus gedung:",
        err
      );

      setError(
        err?.message ||
          "Gagal menghapus data gedung."
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">

      {/* =========================
          HEADER
      ========================= */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[#133D86] sm:text-4xl">
            Data Gedung
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Kelola data gedung yang tersedia di RaVenue.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#133D86] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0f316d]"
        >
          <span className="text-lg leading-none">
            +
          </span>

          Tambah Gedung
        </button>
      </div>

      {/* =========================
          ERROR
      ========================= */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* =========================
          SEARCH
      ========================= */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <div className="relative max-w-md">

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Cari nama atau lokasi gedung..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm outline-none transition focus:border-[#133D86] focus:ring-1 focus:ring-[#133D86]"
          />

          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
              />

              <path d="m20 20-4-4" />
            </svg>
          </span>

        </div>
      </div>

      {/* =========================
          TABLE
      ========================= */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px] text-left text-sm">

            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>

                <th className="px-6 py-4 font-semibold text-gray-700">
                  No
                </th>

                <th className="px-6 py-4 font-semibold text-gray-700">
                  Nama Gedung
                </th>

                <th className="px-6 py-4 font-semibold text-gray-700">
                  Lokasi
                </th>

                <th className="px-6 py-4 font-semibold text-gray-700">
                  Kapasitas
                </th>

                <th className="px-6 py-4 font-semibold text-gray-700">
                  Status
                </th>

                <th className="px-6 py-4 text-center font-semibold text-gray-700">
                  Aksi
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    Memuat data gedung...
                  </td>
                </tr>
              ) : filteredBuildings.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    {search
                      ? "Gedung yang dicari tidak ditemukan."
                      : "Belum ada data gedung."}
                  </td>
                </tr>
              ) : (
                filteredBuildings.map(
                  (building, index) => (
                    <tr
                      key={building.id}
                      className="transition hover:bg-gray-50"
                    >

                      <td className="px-6 py-4 text-gray-600">
                        {index + 1}
                      </td>

                      <td className="px-6 py-4 font-medium text-gray-800">
                        {building.nama || "-"}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {building.lokasi || "-"}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {building.capacity
                          ? `${building.capacity} orang`
                          : "-"}
                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            building.status ===
                            "available"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {building.status ===
                          "available"
                            ? "Tersedia"
                            : building.status ||
                              "-"}
                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <div className="flex items-center justify-center gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              handleDetail(
                                building
                              )
                            }
                            className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-100"
                          >
                            Detail
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(
                                building
                              )
                            }
                            className="rounded-md border border-blue-200 px-3 py-1.5 text-xs font-medium text-[#133D86] transition hover:bg-blue-50"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                building
                              )
                            }
                            disabled={
                              deletingId ===
                              building.id
                            }
                            className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {deletingId ===
                            building.id
                              ? "Menghapus..."
                              : "Hapus"}
                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )
              )}

            </tbody>

          </table>

        </div>
      </div>

      {/* =========================
          MODAL TAMBAH GEDUNG
      ========================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">

            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">

              <h2 className="text-lg font-bold text-[#133D86]">
                Tambah Gedung
              </h2>

              <button
                type="button"
                onClick={() =>
                  setShowAddModal(false)
                }
                className="text-2xl leading-none text-gray-400 hover:text-gray-700"
              >
                ×
              </button>

            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddBuilding();
              }}
              className="space-y-4 p-6"
            >

              {/* NAMA */}
              <div>

                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Nama Gedung
                </label>

                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleFormChange}
                  placeholder="Masukkan nama gedung"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#133D86]"
                />

              </div>

              {/* LOKASI */}
              <div>

                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Lokasi
                </label>

                <input
                  type="text"
                  name="lokasi"
                  value={formData.lokasi}
                  onChange={handleFormChange}
                  placeholder="Masukkan lokasi gedung"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#133D86]"
                />

              </div>

              {/* KAPASITAS */}
              <div>

                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Kapasitas
                </label>

                <input
                  type="number"
                  name="kapasitas"
                  value={formData.kapasitas}
                  onChange={handleFormChange}
                  placeholder="Masukkan kapasitas gedung"
                  min="1"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#133D86]"
                />

                <p className="mt-1 text-xs text-gray-400">
                  Masukkan jumlah maksimal orang.
                </p>

              </div>

              {/* DESKRIPSI */}
              <div>

                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Deskripsi
                </label>

                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleFormChange}
                  rows="4"
                  placeholder="Masukkan deskripsi gedung"
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#133D86]"
                />

              </div>

              {/* FOTO */}
              <div>

                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Foto Gedung
                </label>

                <input
                  type="file"
                  accept="image/*"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />

                <p className="mt-1 text-xs text-gray-400">
                  Upload foto belum dihubungkan ke API.
                </p>

              </div>

              {/* BUTTON */}
              <div className="flex justify-end gap-3 pt-2">

                <button
                  type="button"
                  onClick={() =>
                    setShowAddModal(false)
                  }
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-[#133D86] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0f316d] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Menyimpan..."
                    : "Simpan"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* =========================
          MODAL EDIT GEDUNG
      ========================= */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">

            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">

              <h2 className="text-lg font-bold text-[#133D86]">
                Edit Gedung
              </h2>

              <button
                type="button"
                onClick={() =>
                  setShowEditModal(false)
                }
                className="text-2xl leading-none text-gray-400 hover:text-gray-700"
              >
                ×
              </button>

            </div>

            <form
              onSubmit={handleUpdateBuilding}
              className="space-y-4 p-6"
            >

              {/* NAMA */}
              <div>

                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Nama Gedung
                </label>

                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleFormChange}
                  placeholder="Masukkan nama gedung"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#133D86]"
                />

              </div>

              {/* LOKASI */}
              <div>

                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Lokasi
                </label>

                <input
                  type="text"
                  name="lokasi"
                  value={formData.lokasi}
                  onChange={handleFormChange}
                  placeholder="Masukkan lokasi gedung"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#133D86]"
                />

              </div>

              {/* KAPASITAS */}
              <div>

                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Kapasitas
                </label>

                <input
                  type="number"
                  name="kapasitas"
                  value={formData.kapasitas}
                  onChange={handleFormChange}
                  placeholder="Masukkan kapasitas gedung"
                  min="1"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#133D86]"
                />

                <p className="mt-1 text-xs text-gray-400">
                  Masukkan jumlah maksimal orang.
                </p>

              </div>

              {/* DESKRIPSI */}
              <div>

                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Deskripsi
                </label>

                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleFormChange}
                  rows="4"
                  placeholder="Masukkan deskripsi gedung"
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#133D86]"
                />

              </div>

              {/* FOTO */}
              <div>

                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Foto Gedung
                </label>

                <input
                  type="file"
                  accept="image/*"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />

                <p className="mt-1 text-xs text-gray-400">
                  Penggantian foto belum dihubungkan ke API.
                </p>

              </div>

              {/* BUTTON */}
              <div className="flex justify-end gap-3 pt-2">

                <button
                  type="button"
                  onClick={() =>
                    setShowEditModal(false)
                  }
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={savingEdit}
                  className="rounded-lg bg-[#133D86] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0f316d] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {savingEdit
                    ? "Menyimpan..."
                    : "Simpan Perubahan"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* =========================
          MODAL DETAIL GEDUNG
      ========================= */}
      {showDetailModal &&
        selectedBuilding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-xl">

              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">

                <h2 className="text-lg font-bold text-[#133D86]">
                  Detail Gedung
                </h2>

                <button
                  type="button"
                  onClick={() =>
                    setShowDetailModal(false)
                  }
                  className="text-2xl leading-none text-gray-400 hover:text-gray-700"
                >
                  ×
                </button>

              </div>

              <div className="p-6">

                {selectedBuilding.foto ? (
                  <div className="mb-6 overflow-hidden rounded-lg">

                    <img
                      src={selectedBuilding.foto}
                      alt={selectedBuilding.nama}
                      className="h-64 w-full object-cover"
                    />

                  </div>
                ) : (
                  <div className="mb-6 flex h-48 items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
                    Tidak ada foto gedung
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">

                  {/* NAMA */}
                  <div>

                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Nama Gedung
                    </p>

                    <p className="mt-1 font-semibold text-gray-800">
                      {selectedBuilding.nama ||
                        "-"}
                    </p>

                  </div>

                  {/* LOKASI */}
                  <div>

                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Lokasi
                    </p>

                    <p className="mt-1 font-semibold text-gray-800">
                      {selectedBuilding.lokasi ||
                        "-"}
                    </p>

                  </div>

                  {/* KAPASITAS */}
                  <div>

                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Kapasitas
                    </p>

                    <p className="mt-1 font-semibold text-gray-800">
                      {selectedBuilding.capacity
                        ? `${selectedBuilding.capacity} orang`
                        : "-"}
                    </p>

                  </div>

                  {/* STATUS */}
                  <div>

                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Status
                    </p>

                    <p className="mt-1 font-semibold text-gray-800">
                      {selectedBuilding.status ===
                      "available"
                        ? "Tersedia"
                        : selectedBuilding.status ||
                          "-"}
                    </p>

                  </div>

                  {/* DESKRIPSI */}
                  <div className="sm:col-span-2">

                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Deskripsi
                    </p>

                    <p className="mt-1 leading-relaxed text-gray-700">
                      {selectedBuilding.deskripsi ||
                        "Tidak ada deskripsi."}
                    </p>

                  </div>

                </div>

              </div>

              <div className="flex justify-end border-t border-gray-200 px-6 py-4">

                <button
                  type="button"
                  onClick={() =>
                    setShowDetailModal(false)
                  }
                  className="rounded-lg bg-[#133D86] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0f316d]"
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