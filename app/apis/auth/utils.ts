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
