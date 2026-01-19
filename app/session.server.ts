import { createCookieSessionStorage } from 'react-router';

export type SessionData = {
  sessionId: string;
};

export type SessionFlashData = {
  error: string;
};

const secret = import.meta.env.VITE_SESSION_SECRET;

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: 'tmdb_session_id',
      secrets: [secret],
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: true,
    },
  });

function handleCookieExpireDate(
  expiresAt: string | undefined,
): Date | undefined {
  return expiresAt && !Number.isNaN(Date.parse(expiresAt))
    ? new Date(expiresAt)
    : undefined;
}

export { getSession, commitSession, destroySession, handleCookieExpireDate };
