import { useLoaderData, useNavigation } from 'react-router';
import type { loader } from '~/routes/profile';

export function useProfileViewModel() {
  const loaderData = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  const tmdbAvatar = loaderData?.accountDetails.avatar.tmdb.avatar_path;
  const avatarUrl = tmdbAvatar
    ? `${import.meta.env.VITE_IMAGE_BASE_URL}/w185${tmdbAvatar}`
    : null;
  const avatarFallback =
    loaderData?.accountDetails.name?.[0] ??
    loaderData?.accountDetails.username?.[0] ??
    '?';

  return {
    ...loaderData,
    avatarUrl,
    avatarFallback,
    isLoading: navigation.state == 'loading',
  };
}
