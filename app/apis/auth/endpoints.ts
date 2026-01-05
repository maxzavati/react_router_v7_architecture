import api from '../instance';
import type {
  CreateRequestTokenResponse,
  ValidateWithLoginParams,
  ValidateWithLoginResponse,
  CreateSessionParams,
  CreateSessionResponse,
  DeleteSessionParams,
  DeleteSessionResponse,
} from './types';

export async function createRequestTokenApi(): Promise<CreateRequestTokenResponse> {
  const { data } = await api.get<CreateRequestTokenResponse>(
    '/authentication/token/new'
  );
  return data;
}

export async function validateWithLoginApi(
  params: ValidateWithLoginParams
): Promise<ValidateWithLoginResponse> {
  const { data } = await api.post<ValidateWithLoginResponse>(
    '/authentication/token/validate_with_login',
    params
  );
  return data;
}

export async function createSessionApi(
  params: CreateSessionParams
): Promise<CreateSessionResponse> {
  const { data } = await api.post<CreateSessionResponse>(
    '/authentication/session/new',
    params
  );
  return data;
}

export async function deleteSessionApi(
  params: DeleteSessionParams
): Promise<DeleteSessionResponse> {
  const { data } = await api.delete<DeleteSessionResponse>(
    '/authentication/session',
    { data: params }
  );
  return data;
}
