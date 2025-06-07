"use server";
import { cookies } from 'next/headers';

export async function setTokenCookie(token: string) {
  cookies().set({
    name: 'token',
    value: token,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
  });
}

export async function clearTokenCookie() {
  cookies().delete('token');
}