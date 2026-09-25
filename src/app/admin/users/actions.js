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

// =========================
// HEADER API
// =========================
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

// =========================
// GET USERS
// =========================
export async function getUsers() {
  const headers = await getHeaders();

  const response = await fetch(
    `${BASE_URL}/${PROJECT}/users`,
    {
      method: "GET",
      headers,
      cache: "no-store",
    }
  );

  const data = await response.json().catch(() => ({}));

  console.log("=== CEK API USER ===");
  console.log("STATUS:", response.status);
  console.log("RESPONSE:", data);

  if (!response.ok) {
    throw new Error(
      data?.message ||
        `Request gagal dengan status ${response.status}`
    );
  }

  return data;
}

// =========================
// DELETE USER
// =========================
export async function deleteUser(userId) {
  const headers = await getHeaders();

  console.log("=== HAPUS USER ===");
  console.log("USER ID:", userId);

  const response = await fetch(
    `${BASE_URL}/${PROJECT}/users/${userId}`,
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

  console.log("DELETE USER STATUS:", response.status);
  console.log("DELETE USER RESPONSE:", data);

  if (!response.ok) {
    throw new Error(
      data?.message ||
        `Gagal menghapus user. Status: ${response.status}`
    );
  }

  return data;
}