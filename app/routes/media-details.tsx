import {
  mediaDetailsActionModel,
  mediaDetailsLoaderModel,
} from '~/components/views/media-details/model';
import type { Route } from './+types/media-details';
import { MediaDetailsView } from '~/components/views/media-details/view';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Details' },
    { name: 'description', content: 'Item details' },
  ];
}

export async function loader(args: Route.LoaderArgs) {
  return mediaDetailsLoaderModel(args);
}

export async function action(args: Route.ActionArgs) {
  return mediaDetailsActionModel(args);
}

export default function MediaDetailsRoute() {
  return <MediaDetailsView />;
}
