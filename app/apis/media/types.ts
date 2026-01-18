type TrendingTimeWindow = 'day' | 'week';
type TrendingMediaType = 'all' | 'movie' | 'tv' | 'person';

// Media Lists
interface BaseMediaItem {
  id: number;
  vote_average: number;
  poster_path: string | null;
  backdrop_path: string | null;
}

interface BaseMovieItem extends BaseMediaItem {
  title: string;
  release_date: string;
}

interface BaseTvShow extends BaseMediaItem {
  name: string;
  first_air_date: string;
}

interface BaseTrendingMedia extends BaseMediaItem {
  id: number;
  media_type: TrendingMediaType;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
}

export interface TrendingThisWeekParams {
  page: number;
  region?: string;
  language?: string;
  mediaType?: TrendingMediaType;
  timeWindow?: TrendingTimeWindow;
}

export interface TrendingThisWeekResponse {
  page: number;
  results: BaseTrendingMedia[];
  total_pages: number;
  total_results: number;
}

export interface GetTopRatedMoviesParams {
  page: number;
  language?: string;
  region?: string;
}

export interface TopRatedMoviesResponse {
  page: number;
  results: BaseMovieItem[];
  total_pages: number;
  total_results: number;
}

export interface GetTopRatedTvShowsParams {
  page: number;
  language?: string;
  timezone?: string;
}

export interface TopRatedTvShowsResponse {
  page: number;
  results: BaseTvShow[];
  total_pages: number;
  total_results: number;
}

// Media Details
export interface BaseMediaDetails extends BaseMediaItem {
  overview: string;
  tagline: string | null;
  homepage: string | null;
  origin_country: string[];
  genres: { id: number; name: string }[];
  status: string;
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
}

export interface MovieDetails extends BaseMediaDetails {
  title: string;
  release_date: string;
  runtime: number | null;
}

export interface GetTvShowDetailsParams {
  tv_id: number;
}

export interface TvShowDetails extends BaseMediaDetails {
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
}
