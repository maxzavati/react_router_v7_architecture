import { useFetcher } from 'react-router';
import { useGetUserOnClientSide } from '~/hooks/use-get-user';

interface UseMediaCardVMParams {
  mediaId: number;
  isFavorite: boolean;
  mediaType: 'movie' | 'tv';
}

export function useMediaCardViewModel({
  mediaId,
  mediaType,
  isFavorite,
}: UseMediaCardVMParams) {
  const sessionId = useGetUserOnClientSide();
  const fetcher = useFetcher<{ favorite: boolean }>();

  const submittedFavorite = fetcher.formData?.get('favorite');
  const optimisticFavorite =
    typeof submittedFavorite === 'string'
      ? submittedFavorite === 'true'
      : (fetcher.data?.favorite ?? isFavorite);

  const isSubmitting = fetcher.state !== 'idle';

  function handleFavoriteClick() {
    fetcher.submit(
      {
        intent: 'favorite-toggle',
        mediaId: mediaId.toString(),
        mediaType,
        favorite: (!optimisticFavorite).toString(),
      },
      { method: 'post' }
    );
  }

  return {
    sessionId,
    optimisticFavorite,
    isSubmitting,
    handleFavoriteClick,
  };
}
