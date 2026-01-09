import { redirect } from 'react-router';
import { createRequestTokenApi } from '~/apis/auth/endpoints';

export async function authConnectModel() {
  try {
    const res = await createRequestTokenApi();
    return redirect(
      `/auth/login?request_token=${encodeURIComponent(res.request_token)}`
    );
  } catch (error) {
    return {
      ok: false,
      errorMessage:
        'Failed to create request token. Please try again or come back later.',
    };
  }
}
