const BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://hmif.if.unram.ac.id/api/v3";

const PROJECT =
  process.env.NEXT_PUBLIC_PROJECT_ID ||
  "ravenue";

const KEY =
  process.env.NEXT_PUBLIC_API_KEY || "";

// Helper untuk mengambil token secara universal (Server Side / Client Side)
async function getSessionToken() {
  if (typeof window !== "undefined") {
    // 1. Ambil dari localStorage atau Cookie di Client Browser
    const localToken = localStorage.getItem("token");
    if (localToken) return localToken;

    const match = document.cookie.match(/(?:^|; )session_token=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : "";
  }

  // 2. Ambil dari Cookies di Server Side (Next.js App Router)
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    return cookieStore.get("session_token")?.value || "";
  } catch (e) {
    return "";
  }
}

/**
 * Fungsi Utama Fetcher API
 */
export async function apiFetch(endpoint, options = {}) {
  const { method = "GET", body, token, headers: customHeaders = {} } = options;

  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  // Tentukan Token Auth
  let bearerToken = token || (await getSessionToken());

  // Handling HTTP Method Override (PUT & DELETE)
  let verb = method.toUpperCase();
  let suffix = "";
  if (verb === "PUT" || verb === "DELETE") {
    suffix = (cleanEndpoint.includes("?") ? "&" : "?") + "_method=" + verb;
    verb = "POST";
  }

  // Menyiapkan Headers
  const headers = {
    Accept: "application/json",
    ...(KEY && { "X-API-Key": KEY }),
    ...(bearerToken && { Authorization: `Bearer ${bearerToken}` }),
    ...(body && { "Content-Type": "application/json" }),
    ...(method.toUpperCase() === "PUT" || method.toUpperCase() === "DELETE"
      ? { "X-HTTP-Method-Override": method.toUpperCase() }
      : {}),
    ...customHeaders,
  };

  const url = `${BASE}/${PROJECT}${cleanEndpoint}${suffix}`;

  const res = await fetch(url, {
    ...options,
    method: verb,
    headers,
    body: body ? (typeof body === "string" ? body : JSON.stringify(body)) : undefined,
  });

  const contentType = res.headers.get("content-type");
  const data = contentType?.includes("application/json")
    ? await res.json().catch(() => ({}))
    : await res.text().catch(() => "");

  if (!res.ok) {
    console.error("DETAIL API ERROR:", {
      url,
      status: res.status,
      statusText: res.statusText,
      data,
    });

    throw new Error(
      typeof data === "object" && data?.message
        ? data.message
        : `[HTTP ${res.status}] Gagal mengambil data dari endpoint '${endpoint}'`
    );
  }

  return data;
}

// Alias agar kode yang mengimpor 'fetchApi' tidak breaking
export const fetchApi = apiFetch;

// Mengambil semua data venue / gedung
export async function getVenues() {
  return apiFetch("/venues"); // atau "/gedung" sesuai endpoint backend
}

// Mengambil semua data booking
export async function getBookings() {
  return apiFetch("/bookings");
}