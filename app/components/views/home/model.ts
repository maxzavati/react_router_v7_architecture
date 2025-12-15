import {
  getPopularMoviesApi,
  getPopularTvShowsApi,
  getUpcomingMovieListApi,
  getUpcomingTvShowsApi,
} from "~/apis/movies/endpoints";

const params = { language: "en-US", page: 1 };

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
        error instanceof Error ? error.message : "Unable to load data.",
    };
  }
}
