import {
  mediaDetailsActionModel,
  mediaDetailsLoaderModel,
} from '~/components/views/media-details/model';
import type { Route } from './+types/media-details';
import { MediaDetailsView } from '~/components/views/media-details/view';

export function meta(args: Route.MetaArgs) {
  const loaderData = args.matches[1]?.loaderData;
  const { data, mediaType } = loaderData;
  const title = (mediaType == 'tv' ? data.name : data.title) || 'Media details';
  return [
    { title },
    { name: 'description', content: data.overview ?? 'Media details page' },
  ];
}

export function loader(args: Route.LoaderArgs) {
  return mediaDetailsLoaderModel(args);
}

export function action(args: Route.ActionArgs) {
  return mediaDetailsActionModel(args);
}

export default function MediaDetailsRoute() {
  return <MediaDetailsView />;
}
