"use client";

import { useEffect, useState } from "react";
import { getBuildings } from "./actions";

export default function BuildingsPage() {
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  // Data dari API
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    nama: "",
    lokasi: "",
    deskripsi: "",
    foto: null,
  });

  // =========================================================
  // AMBIL DATA GEDUNG DARI API
  // GET /ravenue/gedung
  // =========================================================
  useEffect(() => {
    const loadBuildings = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getBuildings();

        console.log("Response API Gedung:", result);

        /*
         * Untuk sementara kita tidak mengarang struktur response API.
         * Kita cek beberapa kemungkinan bentuk response yang umum.
         */
        let dataGedung = [];

        if (Array.isArray(result)) {
          dataGedung = result;
        } else if (Array.isArray(result?.data)) {
          dataGedung = result.data;
        } else if (Array.isArray(result?.gedung)) {
          dataGedung = result.gedung;
        }

        setBuildings(dataGedung);
      } catch (err) {
        console.error("Error mengambil data gedung:", err);

        setError(
          err?.message ||
            "Terjadi kesalahan saat mengambil data gedung."
        );
      } finally {
        setLoading(false);
      }
    };

    loadBuildings();
  }, []);

  // =========================================================
  // SEARCH
  // =========================================================
  const filteredBuildings = buildings.filter((building) => {
    const keyword = search.toLowerCase();

    const nama = String(building?.nama || "").toLowerCase();
    const lokasi = String(building?.lokasi || "").toLowerCase();

    return (
      nama.includes(keyword) ||
      lokasi.includes(keyword)
    );
  });

  // =========================================================
  // INPUT FORM
  // =========================================================
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      foto: file,
    }));
  };

  // =========================================================
  // TAMBAH GEDUNG
  // TAHAP 1: BELUM TERHUBUNG KE API
  // =========================================================
  const handleAddBuilding = (e) => {
    e.preventDefault();

    console.log("Data gedung:", formData);

    setShowAddModal(false);

    setFormData({
      nama: "",
      lokasi: "",
      deskripsi: "",
      foto: null,
    });
  };

  // =========================================================
  // DETAIL GEDUNG
  // =========================================================
  const handleDetail = (building) => {
    setSelectedBuilding(building);
    setShowDetailModal(true);
  };

  
  return (
    <div className="space-y-8">

      {/*HEADER DATA*/}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Gedung
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Daftar gedung yang terdaftar pada sistem.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="rounded-lg bg-[#133D86] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#0f316d]"
        >
          + Tambah Gedung
        </button>
      </div>

      {/*SEARCH*/}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <div className="relative max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau lokasi gedung..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 text-sm outline-none focus:border-[#133D86]"
          />

          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>
      </div>

      {/* =====================================================
          TABLE
      ===================================================== */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[800px]">

            {/* TABLE HEADER */}
            <thead>
              <tr className="border-y border-gray-300 bg-gray-50">

                <th className="border-r border-gray-200 px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Foto
                </th>

                <th className="border-r border-gray-200 px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Nama Gedung
                </th>

                <th className="border-r border-gray-200 px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Lokasi
                </th>

                <th className="border-r border-gray-200 px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Deskripsi
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Aksi
                </th>

              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>

              {/* =================================================
                  LOADING
              ================================================= */}
              {loading ? (

                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-16 text-center"
                  >
                    <p className="text-sm font-medium text-gray-500">
                      Memuat data gedung...
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Sedang mengambil data dari server.
                    </p>
                  </td>
                </tr>

              ) : error ? (

                /* =================================================
                   ERROR
                ================================================= */
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-16 text-center"
                  >

                    <p className="text-sm font-medium text-red-500">
                      Gagal mengambil data gedung
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      {error}
                    </p>

                  </td>
                </tr>

              ) : filteredBuildings.length > 0 ? (

                /* =================================================
                   DATA GEDUNG
                ================================================= */
                filteredBuildings.map((building, index) => (

                  <tr
                    key={
                      building?.uuid ||
                      building?.id ||
                      index
                    }
                    className="border-b border-gray-200 last:border-b-0"
                  >

                    {/* FOTO */}
                    <td className="px-6 py-4">

                      {building?.foto ? (

                        <img
                          src={building.foto}
                          alt={
                            building?.nama ||
                            "Foto gedung"
                          }
                          className="h-14 w-20 rounded-md object-cover"
                        />

                      ) : (

                        <div className="flex h-14 w-20 items-center justify-center rounded-md bg-gray-100 text-xs text-gray-400">
                          Tidak ada
                        </div>

                      )}

                    </td>

                    {/* NAMA */}
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {building?.nama || "-"}
                    </td>

                    {/* LOKASI */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {building?.lokasi || "-"}
                    </td>

                    {/* DESKRIPSI */}
                    <td className="max-w-xs px-6 py-4 text-sm text-gray-600">
                      {building?.deskripsi || "-"}
                    </td>

                    {/* AKSI */}
                    <td className="px-6 py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            handleDetail(building)
                          }
                          className="rounded-md border border-gray-300 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
                        >
                          Detail
                        </button>

                        <button
                          type="button"
                          className="rounded-md border border-blue-200 px-3 py-2 text-xs font-medium text-[#133D86] hover:bg-blue-50"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="rounded-md border border-red-200 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
                        >
                          Hapus
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                /* =================================================
                   DATA KOSONG
                ================================================= */
                <tr>

                  <td
                    colSpan="5"
                    className="px-6 py-16 text-center"
                  >

                    <p className="text-sm font-medium text-gray-500">
                      Belum ada data gedung
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Belum ada data gedung yang dikembalikan oleh API.
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* =====================================================
          MODAL TAMBAH GEDUNG
      ===================================================== */}
      {showAddModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-lg overflow-hidden rounded-lg bg-white">

            {/* HEADER MODAL */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

              <div>

                <h2 className="text-lg font-semibold text-gray-800">
                  Tambah Gedung
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Masukkan informasi gedung baru.
                </p>

              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-2xl leading-none text-gray-400 hover:text-gray-700"
              >
                ×
              </button>

            </div>

            {/* FORM */}
            <form onSubmit={handleAddBuilding}>

              <div className="space-y-5 px-6 py-6">

                {/* NAMA */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Nama Gedung
                  </label>

                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                    placeholder="Contoh: Auditorium"
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#133D86]"
                  />

                </div>

                {/* LOKASI */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Lokasi
                  </label>

                  <input
                    type="text"
                    name="lokasi"
                    value={formData.lokasi}
                    onChange={handleInputChange}
                    placeholder="Masukkan lokasi gedung"
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#133D86]"
                  />

                </div>

                {/* FOTO */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Foto Gedung
                  </label>

                  <input
                    type="file"
                    name="foto"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-200"
                  />

                  {formData.foto && (
                    <p className="mt-2 text-xs text-gray-500">
                      File dipilih: {formData.foto.name}
                    </p>
                  )}

                </div>

                {/* DESKRIPSI */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Deskripsi
                  </label>

                  <textarea
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={handleInputChange}
                    placeholder="Masukkan deskripsi gedung"
                    rows="4"
                    className="w-full resize-none rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#133D86]"
                  />

                </div>

              </div>

              {/* FOOTER MODAL */}
              <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">

                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-md border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="rounded-md bg-[#133D86] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#0f316d]"
                >
                  Simpan Gedung
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* =====================================================
          MODAL DETAIL GEDUNG
      ===================================================== */}
      {showDetailModal && selectedBuilding && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-lg overflow-hidden rounded-lg bg-white">

            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

              <h2 className="text-lg font-semibold text-gray-800">
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

            {/* CONTENT */}
            <div className="space-y-5 px-6 py-6">

              {selectedBuilding?.foto && (
                <img
                  src={selectedBuilding.foto}
                  alt={
                    selectedBuilding?.nama ||
                    "Foto gedung"
                  }
                  className="h-56 w-full rounded-md object-cover"
                />
              )}

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Nama Gedung
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-800">
                  {selectedBuilding?.nama || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Lokasi
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {selectedBuilding?.lokasi || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Deskripsi
                </p>

                <p className="mt-1 text-sm leading-6 text-gray-700">
                  {selectedBuilding?.deskripsi || "-"}
                </p>
              </div>

            </div>

            {/* FOOTER */}
            <div className="flex justify-end border-t border-gray-200 px-6 py-4">

              <button
                type="button"
                onClick={() =>
                  setShowDetailModal(false)
                }
                className="rounded-md border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
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