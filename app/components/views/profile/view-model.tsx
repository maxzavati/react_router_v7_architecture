import { useLoaderData, useNavigation } from 'react-router';
import type { loader } from '~/routes/profile';

export function useProfileViewModel() {
  const loaderData = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  const tmdbAvatar = loaderData.accountDetails?.avatar?.tmdb?.avatar_path;
  const gravatarHash = loaderData.accountDetails?.avatar?.gravatar?.hash;
  const avatarUrl = tmdbAvatar
    ? `https://image.tmdb.org/t/p/w185${tmdbAvatar}`
    : gravatarHash
      ? `https://www.gravatar.com/avatar/${gravatarHash}?s=185&d=identicon`
      : undefined;
  const avatarFallback =
    loaderData.accountDetails?.name?.[0] ??
    loaderData.accountDetails?.username?.[0] ??
    '?';

  return {
    ...loaderData,
    avatarUrl,
    avatarFallback,
    isLoading: navigation.state == 'loading',
  };
}
