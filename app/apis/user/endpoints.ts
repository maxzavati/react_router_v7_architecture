import api from '../instance';
import type {
  AccountDetailsResponse,
  FavoriteByIdResponse,
  FavoriteMoviesResponse,
  FavoriteTvShowsResponse,
  GetAccountDetailsParams,
  GetFavoriteByIdParams,
  GetFavoriteMoviesParams,
  GetFavoriteTvShowsParams,
  UpdateFavoriteParams,
  UpdateFavoriteResponse,
} from './types';

export async function getAccountDetailsApi({
  session_id,
}: GetAccountDetailsParams): Promise<AccountDetailsResponse | null> {
  const { data } = await api.get<AccountDetailsResponse>('/account', {
    params: { session_id },
  });
  return data;
}

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
  return data;
}

export async function getFavoriteByIdApi({
  session_id,
  media_type,
  media_id,
}: GetFavoriteByIdParams): Promise<FavoriteByIdResponse> {
  const { data } = await api.get<FavoriteByIdResponse>(
    `/${media_type}/${media_id}/account_states`,
    { params: { session_id } }
  );
  return data;
}

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
