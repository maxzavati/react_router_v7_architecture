export type TrendingMediaType = 'all' | 'movie' | 'tv' | 'person';
export type TrendingTimeWindow = 'day' | 'week';

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

interface BaseMovie {
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

interface BaseTvShow {
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

interface TrendingItem {
  id: number;
  media_type: TrendingMediaType;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
}

export interface TrendingThisWeekResponse {
  page: number;
  results: TrendingItem[];
  total_pages: number;
  total_results: number;
}

export interface TrendingThisWeekParams {
  mediaType?: TrendingMediaType;
  timeWindow?: TrendingTimeWindow;
  language?: string;
  page?: number;
  region?: string;
}

export interface GetTopRatedMoviesParams {
  language?: string;
  page?: number;
  region?: string;
}

export interface TopRatedMoviesResponse {
  page: number;
  results: BaseMovie[];
  total_pages: number;
  total_results: number;
}

export interface GetTopRatedTvShowsParams {
  language?: string;
  page?: number;
  timezone?: string;
}

export interface TopRatedTvShowsResponse {
  page: number;
  results: BaseTvShow[];
  total_pages: number;
  total_results: number;
}

// Media Details
interface BaseMediaDetails {
  id: number;
  overview: string;
  tagline: string | null;
  homepage: string | null;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
  genres: { id: number; name: string }[];
  status: 'Released' | 'Ended';
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
}

export interface GetMovieDetailsParams {
  movie_id: number;
  language?: string;
  append_to_response?: string;
}

export interface MovieDetails extends BaseMediaDetails {
  title: string;
  release_date: string;
  runtime: number | null;
}

export interface GetTvShowDetailsParams {
  tv_id: number;
  language?: string;
  append_to_response?: string;
}

export interface TvShowDetails extends BaseMediaDetails {
  id: number;
  name: string;
  first_air_date: string;
  number_of_episodes: number;
  number_of_seasons: number;
  last_episode_to_air: {
    runtime: number;
    air_date: string;
  };
  created_by: {
    id: number;
    name: string;
  };
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
  }[];
}
