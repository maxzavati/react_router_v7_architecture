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
