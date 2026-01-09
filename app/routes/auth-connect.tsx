import type { Route } from './+types/auth-connect';
import { AuthConnectPageView } from '~/components/views/auth/connect/view';
import { authConnectModel } from '~/components/views/auth/connect/model';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Auth' },
    { name: 'description', content: 'Sign in to your account' },
  ];
}

export function action() {
  return authConnectModel();
}

export default function AuthConnectRoute() {
  return <AuthConnectPageView />;
}
