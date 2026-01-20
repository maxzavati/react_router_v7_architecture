import { redirect } from 'react-router';
import type { Route } from '../+types/root';
import { deleteSessionApi } from '~/apis/auth/endpoints';
import { destroySession, getSession } from '~/session.server';

export async function logoutAction({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const sessionId = session.get('sessionId');

  if (!sessionId) return null;

  const formData = await request.formData();

  if (formData.get('intent') === 'logout') {
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
