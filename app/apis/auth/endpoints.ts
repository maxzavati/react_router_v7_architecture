import api from "../instance";
import type {
  CreateRequestTokenResponse,
  ValidateWithLoginParams,
  ValidateWithLoginResponse,
  CreateSessionParams,
  CreateSessionResponse,
  DeleteSessionParams,
  DeleteSessionResponse,
} from "./types";

/**
 * Step 1: Create a request token
 * https://developer.themoviedb.org/reference/authentication-create-request-token
 */
export async function createRequestTokenApi(): Promise<CreateRequestTokenResponse> {
  const { data } = await api.get<CreateRequestTokenResponse>(
    "/authentication/token/new"
  );
  return data;
}

/**
 * Step 2 (no redirect): Validate the request token using TMDB username/password
 * https://developer.themoviedb.org/reference/authentication-validate-token-with-login
 */
export async function validateWithLoginApi(
  params: ValidateWithLoginParams
): Promise<ValidateWithLoginResponse> {
  const { data } = await api.post<ValidateWithLoginResponse>(
    "/authentication/token/validate_with_login",
    params
  );
  return data;
}

/**
 * Step 3: Create a session using the validated request token
 * https://developer.themoviedb.org/reference/authentication-create-session
 */
export async function createSessionApi(
  params: CreateSessionParams
): Promise<CreateSessionResponse> {
  const { data } = await api.post<CreateSessionResponse>(
    "/authentication/session/new",
    params
  );
  return data;
}

/**
 * Delete a session (logout)
 * https://developer.themoviedb.org/reference/authentication-delete-session
 */
export async function deleteSessionApi(
  params: DeleteSessionParams
): Promise<DeleteSessionResponse> {
  const { data } = await api.delete<DeleteSessionResponse>(
    "/authentication/session",
    { data: params }
  );
  return data;
}
