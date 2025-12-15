import type { Route } from "./+types/details";
import { movieTvDetailsModel } from "~/components/views/movie-tv-details/model";
import { MovieTvDetailsView } from "~/components/views/movie-tv-details/view";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Details" },
    { name: "description", content: "Item details" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const { mediaType, id } = params;

  return movieTvDetailsModel({ mediaType, id });
}

export default function MovieTvDetailsRoute() {
  return <MovieTvDetailsView />;
}
