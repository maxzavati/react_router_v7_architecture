import {
  useParams,
  useLoaderData,
  useNavigation,
  useRouteLoaderData,
} from 'react-router';
import { extractYear } from '~/utils/dates';
import type { loader } from '~/routes/media-details';

const TMDB_IMAGE_BASE = import.meta.env.VITE_IMAGE_BASE_URL;

export function useMediaDetailsViewModel() {
  const { data, mediaType, isFavorite } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const { mediaId } = useParams<{ mediaId: string }>();
  const { user } = useRouteLoaderData('root') as {
    user?: { sessionId: string | null };
  };

  const isTvShowType = mediaType == 'tv';
  const posterUrl = data.poster_path
    ? `${TMDB_IMAGE_BASE}/w500${data.poster_path}`
    : '';
  const title = isTvShowType ? data.name : data.title;
  const releaseDate = isTvShowType ? data.first_air_date : data.release_date;
  const year = releaseDate ? extractYear(releaseDate) : '';
  const genres = data.genres?.map((genre) => genre.name).join(', ') ?? '';
  const numberOfEpisodes = isTvShowType ? data.number_of_episodes : null;
  const numberOfSeasons = isTvShowType ? data.number_of_seasons : null;

  return {
    user,
    data,
    year,
    title,
    genres,
    mediaId,
    posterUrl,
    isFavorite,
    isTvShowType,
    numberOfSeasons,
    numberOfEpisodes,
    isLoading: navigation.state == 'loading',
    backgroundImageUrl: `url(${TMDB_IMAGE_BASE}/w1280${data.backdrop_path})`,
  };
}
