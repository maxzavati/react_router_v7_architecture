import {
  getPopularMoviesApi,
  getPopularTvShowsApi,
  getUpcomingMovieListApi,
  getUpcomingTvShowsApi,
} from '~/apis/media/endpoints';
import { userContext } from '~/contexts/user';
import type { Route } from '../../../routes/+types/home';
import { updateFavoriteApi } from '~/apis/user/endpoints';

const params = { language: 'en-US', page: 1 };

export async function homeLoader() {
  try {
    const [upcomingMovies, popularMovies, popularTvShows, upcomingTvShows] =
      await Promise.all([
        getUpcomingMovieListApi(params),
        getPopularMoviesApi(params),
        getPopularTvShowsApi(params),
        getUpcomingTvShowsApi(params),
      ]);

    return {
      upcomingMovies,
      popularMovies,
      popularTvShows,
      upcomingTvShows,
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

  console.log('------->', user, mediaType);

  if (user?.sessionId && mediaType && user?.account) {
    console.log('Updating favorite from Home action');
    return await updateFavoriteApi({
      account_id: user?.account?.id,
      session_id: user.sessionId,
      media_type: mediaType,
      media_id: mediaId,
      favorite,
    });
  }
}
