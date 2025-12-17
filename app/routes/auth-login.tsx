import type { Route } from './+types/auth-connect';
import { AuthLoginView } from '~/components/views/auth/login/view';
import { authLoginModel } from '~/components/views/auth/login/model';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Login' },
    { name: 'description', content: 'Login to your account' },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const result = await authLoginModel({ request, formData });

  if (result.type == 'error') {
    throw result.response;
  }

  return result.redirect;
}

export default function AuthLoginRoute() {
  return <AuthLoginView />;
}
