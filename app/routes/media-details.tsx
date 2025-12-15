import type { Route } from "./+types/media-details";
import { mediaDetailsModel } from "~/components/views/media-details/model";
import { MediaDetailsView } from "~/components/views/media-details/view";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Details" },
    { name: "description", content: "Item details" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const { mediaType, id } = params;

  return mediaDetailsModel({ mediaType, id });
}

export default function MediaDetailsRoute() {
  return <MediaDetailsView />;
}
