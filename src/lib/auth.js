'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://hmif.if.unram.ac.id/api/v3';
const PROJECT = process.env.NEXT_PUBLIC_PROJECT_ID || 'ravenue';
const KEY = process.env.NEXT_PUBLIC_API_KEY || 'pk_ravenue_9bda1b42faee2c8c';

export async function loginAction(email, password) {
  try {
    const trimmedEmail = email?.trim()?.toLowerCase();

    // Request langsung ke backend API resmi tanpa akun demo
    const res = await fetch(`${BASE_URL}/${PROJECT}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-API-Key': KEY,
      },
      body: JSON.stringify({ email: trimmedEmail, password }),
      cache: 'no-store',
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { error: data.message || 'Login gagal. Periksa email dan password Anda.' };
    }

    // Ambil data user & token sesuai struktur respon API
    const user = data.user || data.data?.user || (data.data?.role ? data.data : (data.role ? data : null)) || data;
    const token = data.token || data.data?.token || data.access_token || `token_${Date.now()}`;
    const role = (user?.role || (trimmedEmail.includes('admin') ? 'admin' : 'user')).toLowerCase();
    user.role = role;

    const cookieStore = await cookies();
    if (token) {
      cookieStore.set('session_token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });
    }
    cookieStore.set('user_role', role, {
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    cookieStore.set('user_profile', JSON.stringify(user), {
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return { success: true, user, token, role };
  } catch (err) {
    return { error: 'Terjadi kesalahan jaringan atau server.' };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('session_token');
  cookieStore.delete('user_role');
  cookieStore.delete('user_profile');
  redirect('/login');
}