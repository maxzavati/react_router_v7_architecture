import { redirect } from "react-router";
import { createSessionApi, validateWithLoginApi } from "~/apis/auth/endpoints";
import { expiresAtToMaxAgeSeconds, sessionIdCookie } from "~/apis/auth/utils";

interface LoginParams {
  request: Request;
  formData: FormData;
}

export async function authLoginModel({ request, formData }: LoginParams) {
  try {
    const url = new URL(request.url);
    const request_token = url.searchParams.get("request_token");
    const username = formData.get("username");
    const password = formData.get("password");

    if (
      !request_token ||
      typeof username !== "string" ||
      typeof password !== "string"
    ) {
      return {
        type: "error" as const,
        response: new Response("Invalid request", { status: 400 }),
      };
    }

    const validated = await validateWithLoginApi({
      username,
      password,
      request_token,
    });
    if (!validated.success) {
      return {
        type: "error" as const,
        response: new Response("Invalid credentials", { status: 401 }),
      };
    }

    const session = await createSessionApi({
      request_token: validated.request_token,
    });
    if (!session.success) {
      return {
        type: "error" as const,
        response: new Response("Session creation failed", { status: 500 }),
      };
    }

    const maxAge = expiresAtToMaxAgeSeconds(validated.expires_at);
    const setCookieHeader = await sessionIdCookie.serialize(
      session.session_id,
      { maxAge }
    );

    return {
      type: "success" as const,
      redirect: redirect("/", {
        headers: { "Set-Cookie": setCookieHeader },
      }),
    };
  } catch (cause) {
    console.error("[authLoginModel] unexpected error", cause);
    return {
      type: "error" as const,
      response: new Response("Failed to sign in. Please try again later.", {
        status: 500,
      }),
    };
  }
}
