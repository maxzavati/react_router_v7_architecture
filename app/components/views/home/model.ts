import {
  getFavoriteMoviesApi,
  getFavoriteTvShowsApi,
  updateFavoriteApi,
} from '~/apis/user/endpoints';
import {
  getTopRatedMoviesApi,
  getTopRatedTvShowsApi,
  getTrendingAllApi,
} from '~/apis/media/endpoints';
import { userContext } from '~/contexts/user';
import { fetchAllPages } from '~/apis/utils';
import { sessionIdCookie } from '~/apis/auth/utils';
import type { Route } from '../../../routes/+types/home';

const params = { language: 'en-US', page: 1 };

export async function homeLoaderModel({ request, context }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get('cookie');
  const sessionId = await sessionIdCookie.parse(cookieHeader);

  try {
    const [trendingAllRes, topRatedMoviesRes, topRatedTvShowsRes] =
      await Promise.all([
        getTrendingAllApi(params),
        getTopRatedMoviesApi(params),
        getTopRatedTvShowsApi(params),
      ]);

    const user = context.get(userContext);

    const favoriteMovieIds = new Set<number>();
    const favoriteTvShowIds = new Set<number>();

    if (sessionId && user?.account) {
      const accountId = user.account.id;
      const baseFavoriteParams = {
        account_id: accountId,
        session_id: sessionId,
        sort_by: 'created_at.desc',
      };

      const [favoriteMovies, favoriteTvShows] = await Promise.all([
        fetchAllPages((page) =>
          getFavoriteMoviesApi({ ...baseFavoriteParams, page })
        ),
        fetchAllPages((page) =>
          getFavoriteTvShowsApi({ ...baseFavoriteParams, page })
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
  } catch (error) {
    return {
      isError: true,
      errorMessage:
        error instanceof Error ? error.message : 'Unable to load data.',
    };
  }
}

export async function homeClientAction({ request, context }: Route.ActionArgs) {
  const cookieHeader = request.headers.get('cookie');
  const sessionId = await sessionIdCookie.parse(cookieHeader);
  const formData = await request.formData();
  const mediaId = Number(formData.get('mediaId'));
  const mediaType = formData.get('mediaType') as 'movie' | 'tv';
  const favorite = formData.get('favorite') === 'true';

  const user = context.get(userContext);

  if (sessionId && mediaType && user?.account) {
    return await updateFavoriteApi({
      account_id: user.account.id,
      session_id: sessionId,
      media_type: mediaType,
      media_id: mediaId,
      favorite,
    });
  }
}
