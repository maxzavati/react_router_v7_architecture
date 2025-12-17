import type { Route } from './+types/media-details';
import { ProfileView } from '~/components/views/profile/view';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Profile' },
    { name: 'description', content: 'User profile' },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {}

export default function ProfileRoute() {
  return <ProfileView />;
}
