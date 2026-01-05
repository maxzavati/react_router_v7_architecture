import {
  getFavoriteMoviesApi,
  getFavoriteTvShowsApi,
  updateFavoriteApi,
} from '~/apis/user/endpoints';
import type { Route } from '../../../routes/+types/profile';
import { sessionIdCookie } from '~/apis/auth/utils';
import { userContext } from '~/contexts/user';

export async function profileLoaderModel({
  request,
  context,
}: Route.LoaderArgs) {
  const cookieHeader = request.headers.get('cookie');
  const sessionId = await sessionIdCookie.parse(cookieHeader);
  const user = context.get(userContext);

  try {
    if (sessionId && user?.account) {
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

    return {
      favoriteMovies: null,
      favoriteTvShows: null,
    };
  } catch (error) {
    return {
      isError: true,
      errorMessage:
        error instanceof Error ? error.message : 'Unable to load data.',
    };
  }
}

export async function profileAction({ request, context }: Route.ActionArgs) {
  const cookieHeader = request.headers.get('cookie');
  const sessionId = await sessionIdCookie.parse(cookieHeader);
  const formData = await request.formData();

  const mediaId = Number(formData.get('mediaId'));
  const mediaType = formData.get('mediaType') as 'movie' | 'tv';
  const favorite = formData.get('favorite') === 'true';
  const intent = formData.get('intent');
  const user = context.get(userContext);

  if (sessionId && mediaType && user?.account) {
    if (intent === 'favorite-toggle') {
      try {
        return await updateFavoriteApi({
          account_id: user.account.id,
          session_id: sessionId,
          media_type: mediaType,
          media_id: mediaId,
          favorite,
        });
      } catch (error) {
        return {
          isError: true,
          errorMessage:
            error instanceof Error
              ? error.message
              : 'Unable to update favorite status.',
        };
      }
    }
  }
}
