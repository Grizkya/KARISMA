import { NextResponse } from "next/server";

export function middleware(request) {
  // 1. Ambil session_token dan user_role yang disimpan di cookie
  const rawToken = request.cookies.get("session_token")?.value;
  const role = request.cookies.get("user_role")?.value;
  const { pathname } = request.nextUrl;

  // Validasi token: pastikan ada dan bukan string dummy/kosong
  const isValidToken =
    rawToken &&
    rawToken !== "undefined" &&
    rawToken !== "null" &&
    rawToken.trim() !== "";

  // 2. Daftar rute terproteksi (harus login terlebih dahulu)
  const isProtected =
    pathname.startsWith("/booking") ||
    pathname.startsWith("/notification") ||
    pathname.startsWith("/admin");

  // Jika belum login / token tidak valid dan mencoba mengakses rute terproteksi
  if (!isValidToken && isProtected) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    const response = NextResponse.redirect(loginUrl);

    // Bersihkan cookie yang tidak valid jika ada
    if (rawToken) {
      response.cookies.delete("session_token");
      response.cookies.delete("user_role");
    }
    return response;
  }

  // 3. Proteksi khusus rute Admin: Jika sudah login tetapi role bukan admin
  if (isValidToken && pathname.startsWith("/admin") && role && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Hanya jalankan middleware pada rute yang membutuhkan proteksi akses (rute utama & sub-path)
export const config = {
  matcher: [
    "/booking",
    "/booking/:path*",
    "/notification",
    "/notification/:path*",
    "/admin",
    "/admin/:path*",
  ],
};