export interface CreateRequestTokenResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface ValidateWithLoginParams {
  username: string;
  password: string;
  request_token: string;
}

export interface ValidateWithLoginResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface CreateSessionParams {
  request_token: string;
}

export interface CreateSessionResponse {
  success: boolean;
  session_id: string;
}

export interface DeleteSessionParams {
  session_id: string;
}

export interface DeleteSessionResponse {
  success: boolean;
}
