import {
  getFavoriteMoviesApi,
  getFavoriteTvShowsApi,
  updateFavoriteApi,
} from '~/apis/user/endpoints';
import {
  getPopularMoviesApi,
  getPopularTvShowsApi,
  getUpcomingMovieListApi,
  getUpcomingTvShowsApi,
} from '~/apis/media/endpoints';
import { userContext } from '~/contexts/user';
import { sessionIdCookie } from '~/apis/auth/utils';
import type { Route } from '../../../routes/+types/home';

const params = { language: 'en-US', page: 1 };

export async function homeLoader({ request, context }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get('cookie');
  const sessionId = await sessionIdCookie.parse(cookieHeader);

  try {
    const [
      popularMoviesRes,
      upcomingMoviesRes,
      popularTvShowsRes,
      upcomingTvShowsRes,
    ] = await Promise.all([
      getPopularMoviesApi(params),
      getUpcomingMovieListApi(params),
      getPopularTvShowsApi(params),
      getUpcomingTvShowsApi(params),
    ]);

    const user = context.get(userContext);

    const favoriteMovieIds = new Set<number>();
    const favoriteTvShowIds = new Set<number>();

    if (sessionId && user?.account) {
      const [favoriteMovies, favoriteTvShows] = await Promise.all([
        getFavoriteMoviesApi({
          account_id: user.account.id,
          session_id: sessionId,
          sort_by: 'created_at.desc',
        }),
        getFavoriteTvShowsApi({
          account_id: user.account.id,
          session_id: sessionId,
          sort_by: 'created_at.desc',
        }),
      ]);

      favoriteMovies.results.forEach((movie) => favoriteMovieIds.add(movie.id));
      favoriteTvShows.results.forEach((show) => favoriteTvShowIds.add(show.id));
    }

    const popularMovies = {
      ...popularMoviesRes,
      results: popularMoviesRes.results.map((movie) => ({
        ...movie,
        isFavorite: favoriteMovieIds.has(movie.id),
      })),
    };

    const upcomingMovies = {
      ...upcomingMoviesRes,
      results: upcomingMoviesRes.results.map((movie) => ({
        ...movie,
        isFavorite: favoriteMovieIds.has(movie.id),
      })),
    };

    const popularTvShows = {
      ...popularTvShowsRes,
      results: popularTvShowsRes.results.map((show) => ({
        ...show,
        isFavorite: favoriteTvShowIds.has(show.id),
      })),
    };

    const upcomingTvShows = {
      ...upcomingTvShowsRes,
      results: upcomingTvShowsRes.results.map((show) => ({
        ...show,
        isFavorite: favoriteTvShowIds.has(show.id),
      })),
    };

    return {
      popularMovies,
      upcomingMovies,
      popularTvShows,
      upcomingTvShows,
      favoriteMovieIds,
      favoriteTvShowIds,
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
  const formData = await request.formData();
  const mediaId = Number(formData.get('mediaId'));
  const mediaType = formData.get('mediaType') as 'movie' | 'tv';
  const favorite = formData.get('favorite') === 'true';

  const user = context.get(userContext);

  if (user?.sessionId && mediaType && user?.account) {
    return await updateFavoriteApi({
      account_id: user?.account?.id,
      session_id: user.sessionId,
      media_type: mediaType,
      media_id: mediaId,
      favorite,
    });
  }
}
