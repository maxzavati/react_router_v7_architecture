import type { Route } from "./+types/auth-connect";
import { AuthConnectPageView } from "~/components/views/auth/connect/view";
import { authConnectModel } from "~/components/views/auth/connect/model";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Auth" },
    { name: "description", content: "Sign in to your account" },
  ];
}

export async function action() {
  const result = await authConnectModel();

  if (result.type == "error") {
    throw result.response;
  }

  return result.redirect;
}

export default function AuthConnectRoute() {
  return <AuthConnectPageView />;
}
