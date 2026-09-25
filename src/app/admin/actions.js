"use server";

import { cookies } from "next/headers";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://hmif.if.unram.ac.id/api/v3";

const PROJECT =
  process.env.NEXT_PUBLIC_PROJECT_ID ||
  "ravenue";

const API_KEY =
  process.env.NEXT_PUBLIC_API_KEY ||
  "";

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
  };

  if (API_KEY) {
    headers["X-API-Key"] = API_KEY;
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

export async function getDashboardData() {
  const headers = await getHeaders();

  const [usersResponse, bookingsResponse, venuesResponse] =
    await Promise.all([
      fetch(`${BASE_URL}/${PROJECT}/users`, {
        method: "GET",
        headers,
        cache: "no-store",
      }),

      fetch(`${BASE_URL}/${PROJECT}/bookings`, {
        method: "GET",
        headers,
        cache: "no-store",
      }),

      fetch(`${BASE_URL}/${PROJECT}/venues`, {
        method: "GET",
        headers,
        cache: "no-store",
      }),
    ]);

  const users = await usersResponse.json().catch(() => []);
  const bookings = await bookingsResponse.json().catch(() => []);
  const venues = await venuesResponse.json().catch(() => []);

  if (!usersResponse.ok) {
    throw new Error(
      users?.message ||
        `Gagal mengambil data user (${usersResponse.status})`
    );
  }

  if (!bookingsResponse.ok) {
    throw new Error(
      bookings?.message ||
        `Gagal mengambil data booking (${bookingsResponse.status})`
    );
  }

  if (!venuesResponse.ok) {
    throw new Error(
      venues?.message ||
        `Gagal mengambil data gedung (${venuesResponse.status})`
    );
  }

  return {
    users: Array.isArray(users) ? users : [],
    bookings: Array.isArray(bookings) ? bookings : [],
    venues: Array.isArray(venues) ? venues : [],
  };
}
    export async function getPendingBookings() {
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

  if (!response.ok) {
    throw new Error(
      data?.message ||
        `Gagal mengambil data booking (${response.status})`
    );
  }

  const bookings = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
    ? data.data
    : [];

  // Ambil booking yang masih menunggu
  return bookings.filter((booking) => {
    const status = String(
      booking?.status || ""
    ).toLowerCase();

    return (
      status === "pending" ||
      status === "menunggu"
    );
  });
}