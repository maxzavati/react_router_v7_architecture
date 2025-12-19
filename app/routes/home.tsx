import type { Route } from './+types/home';
import { HomeView } from '~/components/views/home/view';
import { homeClientAction, homeLoader } from '~/components/views/home/model';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Welcome' }, { name: 'description', content: 'Welcome' }];
}

export async function action(args: Route.ActionArgs) {
  return homeClientAction(args);
}

export async function loader() {
  return await homeLoader();
}

export default function HomeRoute() {
  return <HomeView />;
}
