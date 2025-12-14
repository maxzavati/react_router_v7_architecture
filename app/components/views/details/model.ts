import {
  getMovieDetailsApi,
  getTvShowDetailsApi,
} from "~/apis/movies/endpoints";

type MediaType = "movies" | "tv-shows";

function isMediaType(value: string): value is MediaType {
  return value === "movies" || value === "tv-shows";
}

interface DetailsModelParams {
  mediaType: string | undefined;
  id: string | undefined;
}

export async function detailsModel({ mediaType, id }: DetailsModelParams) {
  if (!mediaType || !id) {
    throw new Error("Missing media type or id");
  }

  if (!isMediaType(mediaType)) {
    throw new Error(`Unsupported media type: ${mediaType}`);
  }

  const numericId = Number(id);
  if (!Number.isFinite(numericId)) {
    throw new Error(`Invalid id: ${id}`);
  }

  if (mediaType === "movies") {
    const data = await getMovieDetailsApi({ movie_id: numericId });
    return { mediaType: "movie" as const, data };
  }

  const data = await getTvShowDetailsApi({ tv_id: numericId });
  return { mediaType: "tv" as const, data };
}
