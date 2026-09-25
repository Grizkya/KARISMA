import { cookies } from "next/headers";

const BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://hmif.if.unram.ac.id/api/v3";

const PROJECT =
  process.env.NEXT_PUBLIC_PROJECT_ID ||
  "ravenue";

const KEY =
  process.env.NEXT_PUBLIC_API_KEY || "";

export async function apiFetch(endpoint, options = {}) {
  const { method = "GET", body, token, headers: customHeaders = {} } = options;

  // Formatting endpoint agar selalu diawali '/'
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  // Ambil token dari cookie (Server Side) jika token manual tidak dipassing
  let bearerToken = token || "";
  if (!bearerToken) {
    try {
      const cookieStore = await cookies();
      bearerToken = cookieStore.get("session_token")?.value || "";
    } catch (e) {
      // Dipanggil dari Client Component (cookies() tidak tersedia), aman diabaikan
    }
  }

  // Handling untuk HTTP Method Override (PUT & DELETE)
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

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      data.message || res.statusText || `Request gagal: status ${res.status}`
    );
  }

  return data;
}