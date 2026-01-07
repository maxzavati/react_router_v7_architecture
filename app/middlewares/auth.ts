import { redirect } from 'react-router';
import type { Route } from '../+types/root';
import { userContext } from '~/contexts/user';
import { getSessionCookie } from '~/apis/auth/utils';
import { getAccountDetailsApi } from '~/apis/user/endpoints';

export async function authMiddleware({ request, context }: Route.ActionArgs) {
  const pathname = new URL(request.url).pathname;
  const cookieHeader = request.headers.get('Cookie');
  const sessionId = await getSessionCookie(cookieHeader);

  if (sessionId) {
    const account = await getAccountDetailsApi({ session_id: sessionId });
    context.set(userContext, { account, sessionId });
  } else {
    context.set(userContext, { account: null, sessionId: null });
  }

  if (pathname.startsWith('/auth')) {
    if (sessionId) {
      throw redirect('/');
    }
    return;
  }

  if (pathname.startsWith('/profile') && !sessionId) {
    throw redirect('/auth/connect');
  }
}
