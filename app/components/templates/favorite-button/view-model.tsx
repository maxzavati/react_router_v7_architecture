import { useFetcher } from 'react-router';
import { useGetUserOnClientSide } from '~/hooks/use-get-user';

interface UseToggleFavoriteButtonViewModelParams {
  id: number;
  isFavorite: boolean;
  mediaType: 'movie' | 'tv';
}

export function useToggleFavoriteButtonViewModel({
  id,
  mediaType,
  isFavorite,
}: UseToggleFavoriteButtonViewModelParams) {
  const sessionId = useGetUserOnClientSide();
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
        mediaId: id.toString(),
        mediaType,
        favorite: (!optimisticFavorite).toString(),
      },
      { method: 'post' },
    );
  }

  return {
    sessionId,
    isSubmitting,
    optimisticFavorite,
    handleFavoriteAction,
  };
}
