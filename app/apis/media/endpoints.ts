import api from '../instance';
import type {
  MovieDetails,
  TvShowDetails,
  GetMovieDetailsParams,
  GetTvShowDetailsParams,
  TrendingThisWeekParams,
  TrendingThisWeekResponse,
  GetTopRatedMoviesParams,
  TopRatedMoviesResponse,
  GetTopRatedTvShowsParams,
  TopRatedTvShowsResponse,
} from './types';

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
