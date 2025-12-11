import { redirect } from "react-router";
import { createRequestTokenApi } from "~/apis/auth/endpoints";

export async function authConnectModel() {
  const data = await createRequestTokenApi();

  if (!data.success || !data.request_token) {
    return {
      type: "error" as const,
      response: new Response("Failed to create request token.", {
        status: 500,
      }),
    };
  }

  return {
    type: "success" as const,
    redirect: redirect(
      `/auth/login?request_token=${encodeURIComponent(data.request_token)}`
    ),
  };
}
