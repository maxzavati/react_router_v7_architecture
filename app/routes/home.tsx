import type { Route } from './+types/home';
import { HomeView } from '~/components/views/home/view';
import {
  homeClientAction,
  homeLoaderModel,
} from '~/components/views/home/model';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Welcome' }, { name: 'description', content: 'Welcome' }];
}

export async function action(args: Route.ActionArgs) {
  return homeClientAction(args);
}

export async function loader(args: Route.LoaderArgs) {
  return await homeLoaderModel(args);
}

export default function HomeRoute() {
  return <HomeView />;
}
