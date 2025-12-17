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
  type: 'movie';
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
  type: 'tv';
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

export interface GetMovieDetailsParams {
  movie_id: number;
  language?: string;
  append_to_response?: string;
}

export interface MovieDetails extends MovieSummary {
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string | null;
  imdb_id: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
  revenue: number;
  runtime: number | null;
  spoken_languages: { iso_639_1: string; name: string; english_name: string }[];
  status: string;
  tagline: string | null;
}

export interface GetTvShowDetailsParams {
  tv_id: number;
  language?: string;
  append_to_response?: string;
}

export interface TvShowDetails extends TvShowSummary {
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string | null;
  }[];
  episode_run_time: number[];
  genres: { id: number; name: string }[];
  homepage: string | null;
  in_production: boolean;
  languages: string[];
  last_air_date: string | null;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    air_date: string;
    episode_number: number;
    season_number: number;
    runtime: number | null;
  } | null;
  next_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    air_date: string;
    episode_number: number;
    season_number: number;
    runtime: number | null;
  } | null;
  networks: {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
  seasons: {
    air_date: string | null;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
  }[];
  status: string;
  tagline: string | null;
  type: string;
}
