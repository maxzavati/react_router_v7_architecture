import { createCookieSessionStorage } from 'react-router';

export type SessionData = {
  sessionId: string;
};

export type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: 'tmdb_session_id',
      secrets: ['s3cret1'],
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: true,
    },
  });

export { getSession, commitSession, destroySession };
