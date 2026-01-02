import api from '../instance';
import type {
  GetUpcomingMovieListParams,
  UpcomingMoviesResponse,
  GetPopularMoviesParams,
  PopularMoviesResponse,
  GetPopularTvShowsParams,
  PopularTvShowsResponse,
  GetUpcomingTvShowsParams,
  UpcomingTvShowsResponse,
  DiscoverMovieResponse,
  DiscoverTvResponse,
  SearchTitlesParams,
  GetMovieDetailsParams,
  MovieDetails,
  GetTvShowDetailsParams,
  TvShowDetails,
  TrendingThisWeekParams,
  TrendingThisWeekResponse,
  GetMovieVideosParams,
  MovieVideosResponse,
  GetTopRatedMoviesParams,
  TopRatedMoviesResponse,
  GetTopRatedTvShowsParams,
  TopRatedTvShowsResponse,
} from './types';

export async function searchTitlesApi(
  params: SearchTitlesParams
): Promise<DiscoverMovieResponse | DiscoverTvResponse> {
  const { type, query, ...rest } = params;
  const endpoint = type == 'movie' ? '/discover/movie' : '/discover/tv';

  const requestParams: Record<string, unknown> = {
    ...rest,
  };

  if (query) {
    requestParams.with_text_query = query;
  }

  const { data } = await api.get(endpoint, { params: requestParams });

  return data;
}

export async function getTrendingAllApi(
  params?: TrendingThisWeekParams
): Promise<TrendingThisWeekResponse> {
  const { timeWindow = 'week', ...rest } = params ?? {};
  const { data } = await api.get<TrendingThisWeekResponse>(
    `/trending/all/${timeWindow}`,
    {
      params: rest,
    }
  );
  return data;
}

export async function getUpcomingMovieListApi(
  params?: GetUpcomingMovieListParams
): Promise<UpcomingMoviesResponse> {
  const { data } = await api.get<UpcomingMoviesResponse>('/movie/upcoming', {
    params,
  });
  return data;
}

export async function getPopularMoviesApi(
  params?: GetPopularMoviesParams
): Promise<PopularMoviesResponse> {
  const { data } = await api.get<PopularMoviesResponse>('/movie/popular', {
    params,
  });
  return data;
}

export async function getPopularTvShowsApi(
  params?: GetPopularTvShowsParams
): Promise<PopularTvShowsResponse> {
  const { data } = await api.get<PopularTvShowsResponse>('/tv/popular', {
    params,
  });
  return data;
}

export async function getUpcomingTvShowsApi(
  params?: GetUpcomingTvShowsParams
): Promise<UpcomingTvShowsResponse> {
  const { data } = await api.get<UpcomingTvShowsResponse>('/tv/on_the_air', {
    params,
  });
  return data;
}

export async function getTopRatedMoviesApi(
  params?: GetTopRatedMoviesParams
): Promise<TopRatedMoviesResponse> {
  const { data } = await api.get<TopRatedMoviesResponse>('/movie/top_rated', {
    params,
  });
  return data;
}

export async function getTopRatedTvShowsApi(
  params?: GetTopRatedTvShowsParams
): Promise<TopRatedTvShowsResponse> {
  const { data } = await api.get<TopRatedTvShowsResponse>('/tv/top_rated', {
    params,
  });
  return data;
}

export async function getMovieDetailsApi({
  movie_id,
  ...params
}: GetMovieDetailsParams): Promise<MovieDetails> {
  const { data } = await api.get<MovieDetails>(`/movie/${movie_id}`, {
    params,
  });
  return data;
}

export async function getTvShowDetailsApi({
  tv_id,
  ...params
}: GetTvShowDetailsParams): Promise<TvShowDetails> {
  const { data } = await api.get<TvShowDetails>(`/tv/${tv_id}`, { params });
  return data;
}

export async function getTrendingThisWeekApi(
  params?: TrendingThisWeekParams
): Promise<TrendingThisWeekResponse> {
  const { mediaType = 'all', timeWindow = 'week', ...rest } = params ?? {};
  const { data } = await api.get<TrendingThisWeekResponse>(
    `/trending/${mediaType}/${timeWindow}`,
    { params: rest }
  );
  return data;
}

export async function getMovieVideosApi({
  movie_id,
  ...params
}: GetMovieVideosParams): Promise<MovieVideosResponse> {
  const { data } = await api.get<MovieVideosResponse>(
    `/movie/${movie_id}/videos`,
    {
      params,
    }
  );
  return data;
}
