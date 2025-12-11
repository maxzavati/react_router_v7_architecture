import { jwtDecode } from "jwt-decode";
import { createCookie } from "react-router";

export function expiresAtToMaxAgeSeconds(expires_at: string): number {
  const expiresMs = Date.parse(expires_at.replace(" UTC", "Z"));
  const nowMs = Date.now();
  const diffSeconds = Math.floor((expiresMs - nowMs) / 1000);
  return Math.max(0, diffSeconds);
}

export const sessionIdCookie = createCookie("tmdb_session_id", {
  httpOnly: true,
  sameSite: "lax",
  path: "/",
  secure: true,
});

export function isValidToken(token: string | null | undefined) {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);

    if (!decoded.exp) {
      console.error('Token is missing the "exp" field.');
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const isNearExpired = decoded.exp - currentTime <= 120;

    return !isNearExpired;
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
}
