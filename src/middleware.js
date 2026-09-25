import { NextResponse } from "next/server";

export function middleware(request) {
  // 1. Ambil session_token dan user_role yang disimpan di cookie
  const token = request.cookies.get("session_token")?.value;
  const role = request.cookies.get("user_role")?.value;
  const { pathname } = request.nextUrl;

  // 2. Daftar rute terproteksi (harus login terlebih dahulu)
  const isProtected =
    pathname.startsWith("/booking") ||
    pathname.startsWith("/notification") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/admin");

  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 3. Proteksi khusus rute Admin: Jika sudah login tetapi role bukan admin
  if (token && pathname.startsWith("/admin") && role && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Hanya jalankan middleware pada rute yang membutuhkan proteksi akses
export const config = {
  matcher: [
    "/booking/:path*",
    "/notification/:path*",
    "/profile/:path*",
    "/admin/:path*",
  ],
};