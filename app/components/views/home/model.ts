import {
  getPopularMoviesApi,
  getPopularTvShowsApi,
  getUpcomingMovieListApi,
  getUpcomingTvShowsApi,
} from "~/apis/movies/endpoints";

export async function homeLoader() {
  const upcomingMovies = await getUpcomingMovieListApi({
    language: "en-US",
    page: 1,
  });

  const popularMovies = await getPopularMoviesApi({
    language: "en-US",
    page: 1,
  });

  const popularTvShows = await getPopularTvShowsApi({
    language: "en-US",
    page: 1,
  });

  const upcomingTvShows = await getUpcomingTvShowsApi({
    language: "en-US",
    page: 1,
  });

  return { upcomingMovies, popularMovies, popularTvShows, upcomingTvShows };
}
