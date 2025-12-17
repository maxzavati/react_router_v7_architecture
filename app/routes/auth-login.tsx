import {
  loginLoaderModel,
  authLoginActionModel,
} from '~/components/views/auth/login/model';
import type { Route } from './+types/auth-connect';
import { AuthLoginView } from '~/components/views/auth/login/view';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Login' },
    { name: 'description', content: 'Login to your account' },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  return await authLoginActionModel({ request });
}

export async function loader({ request }: Route.LoaderArgs) {
  return await loginLoaderModel({ request });
}

export default function AuthLoginRoute() {
  return <AuthLoginView />;
}
