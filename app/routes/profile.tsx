import type { Route } from './+types/profile';
import { ProfileView } from '~/components/views/profile/view';
import {
  profileActionModel,
  profileLoaderModel,
} from '~/components/views/profile/model';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Profile' },
    { name: 'description', content: 'User profile' },
  ];
}

export function loader(args: Route.LoaderArgs) {
  return profileLoaderModel(args);
}

export function action(args: Route.ActionArgs) {
  return profileActionModel(args);
}

export default function ProfileRoute() {
  return <ProfileView />;
}
