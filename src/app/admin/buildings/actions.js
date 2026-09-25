"use server";

import { cookies } from "next/headers";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://hmif.if.unram.ac.id/api/v3";

const PROJECT =
  process.env.NEXT_PUBLIC_PROJECT_ID ||
  "ravenue";

const API_KEY =
  process.env.NEXT_PUBLIC_API_KEY || "";

// ========================================
// HEADER API
// ========================================
async function getHeaders() {
  const cookieStore = await cookies();

  const sessionToken =
    cookieStore.get("session_token")?.value || "";

  const token =
    sessionToken ||
    process.env.NEXT_PUBLIC_DEV_TOKEN ||
    "";

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (API_KEY) {
    headers["X-API-Key"] = API_KEY;
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

// ========================================
// GET SEMUA GEDUNG
// ========================================
export async function getBuildings() {
  const headers = await getHeaders();

  const response = await fetch(
    `${BASE_URL}/${PROJECT}/venues`,
    {
      method: "GET",
      headers,
      cache: "no-store",
    }
  );

  const data = await response.json().catch(() => []);

  console.log("=================================");
  console.log("GET GEDUNG");
  console.log("STATUS:", response.status);
  console.log("RESPONSE:", data);
  console.log("=================================");

  if (!response.ok) {
    throw new Error(
      data?.message ||
        `Gagal mengambil data gedung. Status: ${response.status}`
    );
  }

  return data;
}

// ========================================
// TAMBAH GEDUNG
// ========================================
export async function addBuilding(buildingData) {
  const headers = await getHeaders();

  const body = {
    name: buildingData.name,
    location: buildingData.location,
    capacity: Number(buildingData.capacity),
    description: buildingData.description || "",
  };

  console.log("=================================");
  console.log("TAMBAH GEDUNG");
  console.log("DATA YANG DITERIMA:", buildingData);
  console.log("BODY YANG DIKIRIM KE API:", body);
  console.log("=================================");

  const response = await fetch(
    `${BASE_URL}/${PROJECT}/venues`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      cache: "no-store",
    }
  );

  const data = await response.json().catch(() => ({}));

  console.log("=================================");
  console.log("HASIL TAMBAH GEDUNG");
  console.log("STATUS:", response.status);
  console.log("RESPONSE:", data);
  console.log("=================================");

  if (!response.ok) {
    throw new Error(
      data?.message ||
        `Gagal menambahkan gedung. Status: ${response.status}`
    );
  }

  return data;
}

// ========================================
// UPDATE GEDUNG
// ========================================
export async function updateBuilding(
  buildingId,
  buildingData
) {
  const headers = await getHeaders();

  const body = {
    name: buildingData.name,
    location: buildingData.location,
    capacity: Number(buildingData.capacity),
    description: buildingData.description || "",
  };

  console.log("=================================");
  console.log("UPDATE GEDUNG");
  console.log("ID:", buildingId);
  console.log("BODY:", body);
  console.log("=================================");

  const response = await fetch(
    `${BASE_URL}/${PROJECT}/venues/${buildingId}`,
    {
      method: "POST",
      headers: {
        ...headers,
        "X-HTTP-Method-Override": "PUT",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    }
  );

  const data = await response.json().catch(() => ({}));

  console.log("=================================");
  console.log("HASIL UPDATE GEDUNG");
  console.log("STATUS:", response.status);
  console.log("RESPONSE:", data);
  console.log("=================================");

  if (!response.ok) {
    throw new Error(
      data?.message ||
        `Gagal mengubah gedung. Status: ${response.status}`
    );
  }

  return data;
}

// ========================================
// DELETE GEDUNG
// ========================================
export async function deleteBuilding(buildingId) {
  const headers = await getHeaders();

  console.log("=================================");
  console.log("DELETE GEDUNG");
  console.log("ID:", buildingId);
  console.log("=================================");

  const response = await fetch(
    `${BASE_URL}/${PROJECT}/venues/${buildingId}`,
    {
      method: "POST",
      headers: {
        ...headers,
        "X-HTTP-Method-Override": "DELETE",
      },
      cache: "no-store",
    }
  );

  const data = await response.json().catch(() => ({}));

  console.log("=================================");
  console.log("HASIL DELETE GEDUNG");
  console.log("STATUS:", response.status);
  console.log("RESPONSE:", data);
  console.log("=================================");

  if (!response.ok) {
    throw new Error(
      data?.message ||
        `Gagal menghapus gedung. Status: ${response.status}`
    );
  }

  return data;
}