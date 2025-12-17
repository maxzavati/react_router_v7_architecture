import api from '../instance';
import type { AccountDetailsResponse, GetAccountDetailsParams } from './types';

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
