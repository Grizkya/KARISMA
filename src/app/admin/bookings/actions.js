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
// GET BOOKING
// =========================

export async function getBookings() {
  const headers = await getHeaders();

  const response = await fetch(
    `${BASE_URL}/${PROJECT}/bookings`,
    {
      method: "GET",
      headers,
      cache: "no-store",
    }
  );

  const data = await response.json().catch(() => []);

  console.log(
    "STATUS API BOOKING:",
    response.status
  );

  console.log(
    "RESPONSE API BOOKING:",
    data
  );

  if (!response.ok) {
    throw new Error(
      data?.message ||
        `Request gagal dengan status ${response.status}`
    );
  }

  return Array.isArray(data) ? data : [];
}


// =========================
// UPDATE STATUS BOOKING
// =========================

export async function updateBookingStatus(
  bookingId,
  status
) {
  const headers = await getHeaders();

  const response = await fetch(
    `${BASE_URL}/${PROJECT}/bookings/${bookingId}`,
    {
      method: "POST",

      headers: {
        ...headers,
        "X-HTTP-Method-Override": "PUT",
      },

      body: JSON.stringify({
        status: status,
      }),

      cache: "no-store",
    }
  );

  const data = await response
    .json()
    .catch(() => ({}));

  console.log(
    "STATUS UPDATE BOOKING:",
    response.status
  );

  console.log(
    "RESPONSE UPDATE BOOKING:",
    data
  );

  if (!response.ok) {
    throw new Error(
      data?.message ||
        `Gagal mengubah booking (${response.status})`
    );
  }

  return data;
}


// =========================
// DELETE BOOKING
// =========================

export async function deleteBooking(
  bookingId
) {
  const headers = await getHeaders();

  const response = await fetch(
    `${BASE_URL}/${PROJECT}/bookings/${bookingId}`,
    {
      method: "POST",

      headers: {
        ...headers,
        "X-HTTP-Method-Override": "DELETE",
      },

      cache: "no-store",
    }
  );

  const data = await response
    .json()
    .catch(() => ({}));

  console.log(
    "STATUS DELETE BOOKING:",
    response.status
  );

  console.log(
    "RESPONSE DELETE BOOKING:",
    data
  );

  if (!response.ok) {
    throw new Error(
      data?.message ||
        `Gagal menghapus booking (${response.status})`
    );
  }

  return data;
}