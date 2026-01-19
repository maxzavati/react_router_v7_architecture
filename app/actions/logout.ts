import {
  destroySession,
  type SessionData,
  type SessionFlashData,
} from '~/session.server';
import { redirect, type Session } from 'react-router';
import { deleteSessionApi } from '~/apis/auth/endpoints';

export async function logoutAction({
  sessionId,
  session,
}: {
  sessionId: string | null;
  session: Session<SessionData, SessionFlashData>;
}) {
  if (sessionId) {
    const res = await deleteSessionApi({ session_id: sessionId });
    if (res.success) {
      return redirect('/auth/connect', {
        headers: {
          'Set-Cookie': await destroySession(session),
        },
      });
    }
  }
}
