import {
  useParams,
  useFetcher,
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
  const params = useParams();

  const { user } = useRouteLoaderData('root') as {
    user?: { sessionId: string | null };
  };

  const fetcher = useFetcher<{ favorite: boolean }>();

  const submittedFavorite = fetcher.formData?.get('favorite');

  const optimisticFavorite =
    typeof submittedFavorite === 'string'
      ? submittedFavorite === 'true'
      : (fetcher.data?.favorite ?? isFavorite);

  const isSubmitting = fetcher.state !== 'idle';

  function handleFavoriteAction() {
    fetcher.submit(
      {
        intent: 'favorite-toggle',
        mediaId: data ? data.id : 0,
        mediaType: params.mediaType == 'movies' ? 'movie' : 'tv',
        favorite: (!optimisticFavorite).toString(),
      },
      { method: 'post' }
    );
  }

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

  console.log(data);

  return {
    user,
    data,
    year,
    title,
    genres,
    posterUrl,
    isFavorite,
    isSubmitting,
    isTvShowType,
    numberOfSeasons,
    numberOfEpisodes,
    optimisticFavorite,
    handleFavoriteAction,
    isLoading: navigation.state == 'loading',
    backgroundImageUrl: `url(${TMDB_IMAGE_BASE}/w1280${data.backdrop_path})`,
  };
}
