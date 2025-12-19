import api from '../instance';
import type {
  AccountDetailsResponse,
  FavoriteMoviesResponse,
  FavoriteTvShowsResponse,
  GetAccountDetailsParams,
  GetFavoriteMoviesParams,
  GetFavoriteTvShowsParams,
  UpdateFavoriteParams,
  UpdateFavoriteResponse,
} from './types';

/**
 * Get account details (requires session_id)
 * https://developer.themoviedb.org/reference/account-details
 */
export async function getAccountDetailsApi({
  session_id,
}: GetAccountDetailsParams): Promise<AccountDetailsResponse | null> {
  const { data } = await api.get<AccountDetailsResponse>('/account', {
    params: { session_id },
  });
  return data;
}

/**
 * Mark/unmark title as favorite
 * https://developer.themoviedb.org/reference/account-mark-as-favorite
 */
export async function updateFavoriteApi({
  account_id,
  session_id,
  media_type,
  media_id,
  favorite,
}: UpdateFavoriteParams): Promise<UpdateFavoriteResponse> {
  const { data } = await api.post<UpdateFavoriteResponse>(
    `/account/${account_id}/favorite`,
    { media_type, media_id, favorite },
    { params: { session_id } }
  );
  console.log('UpdateFavoriteResponse data:', data);
  return data;
}

/**
 * List favorite movies
 * https://developer.themoviedb.org/reference/account-get-favorite-movies
 */
export async function getFavoriteMoviesApi({
  account_id,
  session_id,
  ...params
}: GetFavoriteMoviesParams): Promise<FavoriteMoviesResponse> {
  const { data } = await api.get<FavoriteMoviesResponse>(
    `/account/${account_id}/favorite/movies`,
    { params: { session_id, ...params } }
  );
  return data;
}

/**
 * List favorite TV shows
 * https://developer.themoviedb.org/reference/account-get-favorite-tv-shows
 */
export async function getFavoriteTvShowsApi({
  account_id,
  session_id,
  ...params
}: GetFavoriteTvShowsParams): Promise<FavoriteTvShowsResponse> {
  const { data } = await api.get<FavoriteTvShowsResponse>(
    `/account/${account_id}/favorite/tv`,
    { params: { session_id, ...params } }
  );
  return data;
}
