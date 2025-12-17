import type { Route } from './+types/home';
import { HomeView } from '~/components/views/home/view';
import { homeLoader } from '~/components/views/home/model';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Welcome' }, { name: 'description', content: 'Welcome' }];
}

export async function loader() {
  return await homeLoader();
}

export default function HomeRoute() {
  return <HomeView />;
}
