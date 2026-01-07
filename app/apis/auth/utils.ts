import { createCookie } from 'react-router';

const SESSION_ID_COOKIE = 'tmdb_session_id';

export function expiresAtToMaxAgeSeconds(expires_at: string): number {
  const expiresMs = Date.parse(expires_at.replace(' UTC', 'Z'));
  const nowMs = Date.now();
  const diffSeconds = Math.floor((expiresMs - nowMs) / 1000);
  return Math.max(0, diffSeconds);
}

export const sessionIdCookie = createCookie(SESSION_ID_COOKIE, {
  httpOnly: true,
  sameSite: 'lax',
  path: '/',
  secure: true,
});

export async function removeSessionCookie(): Promise<string> {
  return sessionIdCookie.serialize('', { maxAge: 0 });
}
