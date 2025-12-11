import api from "../instance";

/**
 * Step 1: Create a request token
 * https://developer.themoviedb.org/reference/authentication-create-request-token
 */
export interface CreateRequestTokenResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}
export async function createRequestTokenApi(): Promise<CreateRequestTokenResponse> {
  const { data } = await api.get("/authentication/token/new");
  return data;
}

/**
 * Step 2 (no redirect): Validate the request token using TMDB username/password
 * https://developer.themoviedb.org/reference/authentication-validate-token-with-login
 */
export async function validateWithLoginApi(params: {
  username: string;
  password: string;
  request_token: string;
}): Promise<{
  success: boolean;
  expires_at: string;
  request_token: string;
}> {
  const { data } = await api.post(
    "/authentication/token/validate_with_login",
    params
  );
  return data;
}

/**
 * Step 3: Create a session using the validated request token
 * https://developer.themoviedb.org/reference/authentication-create-session
 */
export async function createSessionApi(request_token: string): Promise<{
  success: boolean;
  session_id: string;
}> {
  const { data } = await api.post("/authentication/session/new", {
    request_token,
  });
  return data;
}

/**
 * Optional: Delete a session (logout)
 * https://developer.themoviedb.org/reference/authentication-delete-session
 */
export async function deleteSessionApi(session_id: string): Promise<{
  success: boolean;
}> {
  const { data } = await api.delete("/authentication/session", {
    data: session_id,
  });
  return data;
}

/**
 * Optional: Get account details (requires session_id)
 * https://developer.themoviedb.org/reference/account-details
 */
export async function getAccountDetailsApi(session_id: string): Promise<{
  id: number;
  name: string;
  username: string;
  include_adult: boolean;
  iso_3166_1: string | null;
  iso_639_1: string | null;
} | null> {
  const { data } = await api.get("/account", {
    params: { session_id },
  });
  return data;
}
