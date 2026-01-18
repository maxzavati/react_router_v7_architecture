import {
  mediaDetailsActionModel,
  mediaDetailsLoaderModel,
  metaDetailsLoaderModel,
} from '~/components/views/media-details/model';
import type { Route } from './+types/media-details';
import { MediaDetailsView } from '~/components/views/media-details/view';

export function meta(args: Route.MetaArgs) {
  return metaDetailsLoaderModel(args);
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
