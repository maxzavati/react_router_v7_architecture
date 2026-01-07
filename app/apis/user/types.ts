export interface GetAccountDetailsParams {
  session_id: string;
}

export interface AccountDetailsResponse {
  id: number;
  name: string;
  avatar: {
    tmdb: {
      avatar_path: string | null;
    };
    gravatar: {
      hash: string | null;
    };
  };
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

export interface GetFavoriteByIdParams {
  session_id: string;
  media_type: 'movie' | 'tv';
  media_id: number;
}

export interface FavoriteByIdResponse {
  id: number;
  favorite: boolean;
  watchlist: boolean;
  rated: boolean | { value: number };
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
  results: {
    id: number;
    title: string;
    name?: string;
    poster_path: string | null;
    backdrop_path: string | null;
    overview: string;
    vote_average: number;
    release_date: string;
    media_type?: 'movie';
  }[];
}

export interface FavoriteTvShowsResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results: {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
    overview: string;
    vote_average: number;
    first_air_date: string;
    media_type?: 'tv';
  }[];
}
