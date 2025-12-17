import { redirect } from 'react-router';
import { createSessionApi, validateWithLoginApi } from '~/apis/auth/endpoints';
import { expiresAtToMaxAgeSeconds, sessionIdCookie } from '~/apis/auth/utils';

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

    const maxAge = expiresAtToMaxAgeSeconds(validated.expires_at);
    const setCookie = await sessionIdCookie.serialize(session.session_id, {
      maxAge,
    });

    return redirect('/', {
      headers: { 'Set-Cookie': setCookie },
    });
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }

    throw new Response('Failed to sign in. Please try again later.', {
      status: 500,
    });
  }
}

export async function loginLoaderModel({ request }: { request: Request }) {
  const url = new URL(request.url);
  if (!url.searchParams.get('request_token')) {
    throw redirect('/auth/connect');
  }
  return null;
}
