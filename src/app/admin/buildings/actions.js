"use server";

import { cookies } from "next/headers";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://hmif.if.unram.ac.id/api/v2";

const PROJECT =
  process.env.NEXT_PUBLIC_PROJECT_ID ||
  "ravenue";

const API_KEY =
  process.env.NEXT_PUBLIC_API_KEY || "";

export async function getBuildings() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("session_token")?.value || "";

  console.log("=== CEK API GEDUNG ===");
  console.log("BASE_URL:", BASE_URL);
  console.log("PROJECT:", PROJECT);
  console.log("API KEY ADA:", Boolean(API_KEY));
  console.log("TOKEN ADA:", Boolean(token));

  const headers = {
    Accept: "application/json",
  };

  if (API_KEY) {
    headers["X-API-Key"] = API_KEY;
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(
    `${BASE_URL}/${PROJECT}/gedung`,
    {
      method: "GET",
      headers,
      cache: "no-store",
    }
  );

  const data = await response.json().catch(() => ({}));

  console.log("STATUS API:", response.status);
  console.log("RESPONSE API:", data);

  if (!response.ok) {
    throw new Error(
      data?.message ||
        `Request gagal dengan status ${response.status}`
    );
  }

  return data;
}