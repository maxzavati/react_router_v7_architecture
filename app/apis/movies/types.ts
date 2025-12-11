export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface DatedPaginatedResponse<T> extends PaginatedResponse<T> {
  dates: {
    maximum: string;
    minimum: string;
  };
}

export interface MovieSummary {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TvShowSummary {
  adult?: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}

export interface UpcomingMoviesResponse extends DatedPaginatedResponse<MovieSummary> {}

export interface PopularMoviesResponse extends PaginatedResponse<MovieSummary> {}

export interface PopularTvShowsResponse extends PaginatedResponse<TvShowSummary> {}

export interface UpcomingTvShowsResponse extends PaginatedResponse<TvShowSummary> {}

export interface GetUpcomingMovieListParams {
  language?: string;
  page?: number;
  region?: string;
}

export interface GetPopularMoviesParams {
  language?: string;
  page?: number;
  region?: string;
}

export interface GetPopularTvShowsParams {
  language?: string;
  page?: number;
}

export interface GetUpcomingTvShowsParams {
  language?: string;
  page?: number;
  timezone?: string;
}

export interface DiscoverMovieParams {
  type: "movie";
  query?: string;
  language?: string;
  page?: number;
  region?: string;
  include_adult?: boolean;
  sort_by?: string;
  with_genres?: string;
  with_keywords?: string;
  with_original_language?: string;
  with_watch_providers?: string;
  watch_region?: string;
  release_date_gte?: string;
  release_date_lte?: string;
  year?: number;
  primary_release_year?: number;
  vote_average_gte?: number;
  vote_average_lte?: number;
  vote_count_gte?: number;
}

export interface DiscoverTvParams {
  type: "tv";
  query?: string;
  language?: string;
  page?: number;
  timezone?: string;
  include_adult?: boolean;
  sort_by?: string;
  with_genres?: string;
  with_keywords?: string;
  with_networks?: string;
  with_original_language?: string;
  with_watch_providers?: string;
  watch_region?: string;
  first_air_date_gte?: string;
  first_air_date_lte?: string;
  first_air_date_year?: number;
  vote_average_gte?: number;
  vote_average_lte?: number;
  vote_count_gte?: number;
}

export type SearchTitlesParams = DiscoverMovieParams | DiscoverTvParams;

export interface DiscoverMovieResponse extends PaginatedResponse<MovieSummary> {}

export interface DiscoverTvResponse extends PaginatedResponse<TvShowSummary> {}
