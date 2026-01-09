import type { Route } from './+types/home';
import { HomeView } from '~/components/views/home/view';
import {
  homeActionModel,
  homeLoaderModel,
} from '~/components/views/home/model';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Welcome' }, { name: 'description', content: 'Welcome' }];
}

export function action(args: Route.ActionArgs) {
  return homeActionModel(args);
}

export function loader(args: Route.LoaderArgs) {
  return homeLoaderModel(args);
}

export default function HomeRoute() {
  return <HomeView />;
}
