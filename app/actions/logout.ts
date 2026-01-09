import { redirect } from 'react-router';
import { deleteSessionApi } from '~/apis/auth/endpoints';
import { removeSessionCookie } from '~/apis/auth/utils';

export async function logoutAction({
  sessionId,
}: {
  sessionId: string | null;
}) {
  if (sessionId) {
    const res = await deleteSessionApi({ session_id: sessionId });
    if (res.success) {
      const headers = new Headers();
      headers.append('Set-Cookie', await removeSessionCookie());
      return redirect('/auth/connect', { headers });
    }
  }
}
