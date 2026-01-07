import {
  useFetcher,
  useLoaderData,
  useNavigation,
  useParams,
  useRouteLoaderData,
} from 'react-router';
import type { loader } from '~/routes/media-details';

export function useMediaDetailsViewModel() {
  const loaderData = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const params = useParams();
  const id = params.id;

  const { user } = useRouteLoaderData('root') as {
    user?: { sessionId: string | null };
  };
  const fetcher = useFetcher<{ favorite: boolean }>();

  const submittedFavorite = fetcher.formData?.get('favorite');
  const optimisticFavorite =
    typeof submittedFavorite === 'string'
      ? submittedFavorite === 'true'
      : (fetcher.data?.favorite ?? loaderData.isFavorite);

  const isSubmitting = fetcher.state !== 'idle';

  function handleFavoriteClick() {
    fetcher.submit(
      {
        intent: 'favorite-toggle',
        mediaId: loaderData.data ? loaderData.data.id : 0,
        mediaType: params.mediaType == 'movies' ? 'movie' : 'tv',
        favorite: (!optimisticFavorite).toString(),
      },
      { method: 'post' }
    );
  }

  return {
    id,
    user,
    ...loaderData,
    isSubmitting,
    isFavorite: loaderData.isFavorite,
    optimisticFavorite,
    handleFavoriteClick,
    isLoading: navigation.state == 'loading',
  };
}
