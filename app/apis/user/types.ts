export interface GetAccountDetailsParams {
  session_id: string;
}

export interface AccountDetailsResponse {
  id: number;
  name: string;
  username: string;
  include_adult: boolean;
  iso_3166_1: string | null;
  iso_639_1: string | null;
}

export interface UpdateFavoriteParams {
  account_id: number;
  session_id: string;
  media_type: 'movie' | 'tv';
  media_id: number;
  favorite: boolean;
}

export interface UpdateFavoriteResponse {
  status_code: number;
  status_message: string;
}

export interface GetFavoriteMoviesParams {
  account_id: number;
  session_id: string;
  language?: string;
  page?: number;
  sort_by?: string;
}

export interface GetFavoriteTvShowsParams {
  account_id: number;
  session_id: string;
  language?: string;
  page?: number;
  sort_by?: string;
}

export interface FavoriteMoviesResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results: Array<{
    id: number;
    title: string;
    name?: string;
    poster_path: string | null;
    backdrop_path: string | null;
    overview: string;
    vote_average: number;
    media_type?: 'movie';
  }>;
}

export interface FavoriteTvShowsResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results: Array<{
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
    overview: string;
    vote_average: number;
    media_type?: 'tv';
  }>;
}
