import { redirect } from "react-router";
import type { Route } from "./+types/auth-connect";
import { AuthLoginPageView } from "~/components/pages/auth-login/view";
import { expiresAtToMaxAgeSeconds, sessionIdCookie } from "~/apis/auth/utils";
import { createSessionApi, validateWithLoginApi } from "~/apis/auth/endpoints";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Login to your account" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const url = new URL(request.url);
  const request_token = url.searchParams.get("request_token");

  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  if (
    !request_token ||
    typeof username !== "string" ||
    typeof password !== "string"
  ) {
    throw new Response("Invalid request", { status: 400 });
  }

  const validated = await validateWithLoginApi({
    username,
    password,
    request_token,
  });

  if (!validated.success) {
    throw new Response("Invalid credentials", { status: 401 });
  }

  const session = await createSessionApi(validated.request_token);

  if (!session.success) {
    throw new Response("Session creation failed", { status: 500 });
  }

  const maxAge = expiresAtToMaxAgeSeconds(validated.expires_at);
  const setCookieHeader = await sessionIdCookie.serialize(session.session_id, {
    maxAge,
  });

  return redirect("/", {
    headers: { "Set-Cookie": setCookieHeader },
  });
}

export default function AuthLoginRoute() {
  return <AuthLoginPageView />;
}
