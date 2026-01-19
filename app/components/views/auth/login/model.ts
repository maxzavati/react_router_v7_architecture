import {
  getSession,
  commitSession,
  handleCookieExpireDate,
} from '~/session.server';
import { redirect } from 'react-router';
import { createSessionApi, validateWithLoginApi } from '~/apis/auth/endpoints';

export async function authLoginActionModel({ request }: { request: Request }) {
  try {
    const formData = await request.formData();
    const url = new URL(request.url);
    const requestToken = url.searchParams.get('request_token');
    const username = formData.get('username');
    const password = formData.get('password');

    if (
      !requestToken ||
      typeof username !== 'string' ||
      typeof password !== 'string'
    ) {
      throw new Response('Invalid request', { status: 400 });
    }

    const validated = await validateWithLoginApi({
      username,
      password,
      request_token: requestToken,
    });

    if (!validated.success) {
      throw new Response('Invalid credentials', { status: 401 });
    }

    const session = await createSessionApi({
      request_token: validated.request_token,
    });

    if (!session.success) {
      throw new Response('Session creation failed', { status: 500 });
    }

    const sessionStore = await getSession(request.headers.get('Cookie'));
    sessionStore.set('sessionId', session.session_id);
    const expires = handleCookieExpireDate(validated.expires_at);
    const sessionIdCookieValue = await commitSession(sessionStore, { expires });

    return redirect('/', {
      headers: { 'Set-Cookie': sessionIdCookieValue },
    });
  } catch (error) {
    return {
      ok: false,
      errorMessage:
        'Login failed. Please check your credentials and try again.',
    };
  }
}

export async function loginLoaderModel({ request }: { request: Request }) {
  const url = new URL(request.url);
  if (!url.searchParams.get('request_token')) {
    throw redirect('/auth/connect');
  }
}
