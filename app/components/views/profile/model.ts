import {
  getFavoriteMoviesApi,
  getFavoriteTvShowsApi,
} from '~/apis/user/endpoints';
import { userContext } from '~/contexts/user';
import { getSession } from '~/session.server';
import type { Route } from '../../../routes/+types/profile';
import { toggleFavoriteActionModel } from '~/components/favorite-button/model';

export async function profileLoaderModel({
  request,
  context,
}: Route.LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const sessionId = session.get('sessionId');
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

export async function profileActionModel(args: Route.ActionArgs) {
  const formData = await args.request.formData();
  const intent = formData.get('intent');

  if (intent === 'favorite-toggle') {
    return toggleFavoriteActionModel({ ...args, formData });
  }
}
