import {
  getFavoriteMoviesApi,
  getFavoriteTvShowsApi,
} from '~/apis/user/endpoints';
import { userContext } from '~/contexts/user';
import type { Route } from '../../../routes/+types/profile';
import { getSessionCookie } from '~/apis/auth/utils';
import { toggleFavoriteActionModel } from '~/components/templates/favorite-button/model';

export async function profileLoaderModel({
  request,
  context,
}: Route.LoaderArgs) {
  const cookieHeader = request.headers.get('cookie');
  const sessionId = await getSessionCookie(cookieHeader);
  const user = context.get(userContext);

  if (sessionId && user.account) {
    const accountId = user.account.id;
    const baseFavoriteParams = {
      account_id: accountId,
      session_id: sessionId,
      sort_by: 'created_at.desc',
    };

    const favoriteMovies = getFavoriteMoviesApi({
      ...baseFavoriteParams,
      page: 1,
    });
    const favoriteTvShows = getFavoriteTvShowsApi({
      ...baseFavoriteParams,
      page: 1,
    });

    return {
      accountDetails: user.account,
      favoriteMovies,
      favoriteTvShows,
    };
  }
}

export async function profileActionModel({
  request,
  context,
}: Route.ActionArgs) {
  const cookieHeader = request.headers.get('cookie');
  const sessionId = await getSessionCookie(cookieHeader);
  const formData = await request.formData();
  const intent = formData.get('intent');
  const user = context.get(userContext);
  const accountId = user?.account?.id ?? null;

  if (intent === 'favorite-toggle') {
    return toggleFavoriteActionModel({
      sessionId,
      accountId,
      formData,
    });
  }
}
