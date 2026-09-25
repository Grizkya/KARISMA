const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL;

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function fetchApi(endpoint, options = {}) {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const headers = {
    "Content-Type": "application/json",

    ...(API_KEY && {
      "X-API-Key": API_KEY,
    }),

    ...(token && {
      Authorization: `Bearer ${token}`,
    }),

    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type");

  const data = contentType?.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    console.error("DETAIL API ERROR:", {
      url: `${BASE_URL}${endpoint}`,
      status: response.status,
      statusText: response.statusText,
      data,
    });

    throw new Error(
      typeof data === "object" && data?.message
        ? data.message
        : `[HTTP ${response.status}] Gagal mengambil data dari endpoint '${endpoint}'`
    );
  }

  return data;
}

// Mengambil semua data booking dari RaVenue
export async function getBookings() {
  return fetchApi("/ravenue/bookings");
}

// Mengambil semua data venue/gedung dari RaVenue
export async function getVenues() {
  return fetchApi("/ravenue/venues");
}