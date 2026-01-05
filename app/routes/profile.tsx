import type { Route } from './+types/profile';
import { ProfileView } from '~/components/views/profile/view';
import {
  profileAction,
  profileLoaderModel,
} from '~/components/views/profile/model';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Profile' },
    { name: 'description', content: 'User profile' },
  ];
}

export async function loader(args: Route.LoaderArgs) {
  return await profileLoaderModel(args);
}

export async function action(args: Route.ActionArgs) {
  return profileAction(args);
}

export default function ProfileRoute() {
  return <ProfileView />;
}
