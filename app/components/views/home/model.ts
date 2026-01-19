import {
  getTopRatedMoviesApi,
  getTopRatedTvShowsApi,
  getTrendingAllApi,
} from '~/apis/media/endpoints';
import {
  getFavoriteMoviesApi,
  getFavoriteTvShowsApi,
} from '~/apis/user/endpoints';
import { fetchAllPages } from '~/apis/utils';
import { userContext } from '~/contexts/user';
import type { Route } from '../../../routes/+types/home';
import { toggleFavoriteActionModel } from '~/components/templates/favorite-button/model';
import { getSession } from '~/session.server';

const params = { language: 'en-US', page: 1 };

export async function homeLoaderModel({ request, context }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const sessionId = session.get('sessionId');

  const [trendingAllRes, topRatedMoviesRes, topRatedTvShowsRes] =
    await Promise.all([
      getTrendingAllApi(params),
      getTopRatedMoviesApi(params),
      getTopRatedTvShowsApi(params),
    ]);

  const user = context.get(userContext);

  const favoriteMovieIds = new Set<number>();
  const favoriteTvShowIds = new Set<number>();

  if (sessionId && user.account) {
    const accountId = user.account.id;
    const baseFavoriteParams = {
      account_id: accountId,
      session_id: sessionId,
      sort_by: 'created_at.desc',
    };

    const [favoriteMovies, favoriteTvShows] = await Promise.all([
      fetchAllPages((page) =>
        getFavoriteMoviesApi({ ...baseFavoriteParams, page }),
      ),
      fetchAllPages((page) =>
        getFavoriteTvShowsApi({ ...baseFavoriteParams, page }),
      ),
    ]);

    favoriteMovies.forEach((movie) => favoriteMovieIds.add(movie.id));
    favoriteTvShows.forEach((show) => favoriteTvShowIds.add(show.id));
  }

  const trendingAll = {
    ...trendingAllRes,
    results: trendingAllRes.results.map((item) => ({
      ...item,
      isFavorite:
        favoriteMovieIds.has(item.id) || favoriteTvShowIds.has(item.id),
    })),
  };

  const topRatedMovies = {
    ...topRatedMoviesRes,
    results: topRatedMoviesRes.results.map((movie) => ({
      ...movie,
      isFavorite: favoriteMovieIds.has(movie.id),
    })),
  };

  const topRatedTvShows = {
    ...topRatedTvShowsRes,
    results: topRatedTvShowsRes.results.map((show) => ({
      ...show,
      isFavorite: favoriteTvShowIds.has(show.id),
    })),
  };

  return {
    trendingAll,
    favoriteMovieIds,
    favoriteTvShowIds,
    topRatedMovies,
    topRatedTvShows,
  };
}

export async function homeActionModel({ request, context }: Route.ActionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const sessionId = session.get('sessionId');
  const formData = await request.formData();
  const intent = formData.get('intent');
  const user = context.get(userContext);
  const accountId = user?.account?.id ?? null;

  if (sessionId && intent === 'favorite-toggle') {
    return toggleFavoriteActionModel({
      sessionId,
      accountId,
      formData,
    });
  }
}
