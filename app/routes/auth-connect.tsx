import {
  createRequestTokenApi,
  type CreateRequestTokenResponse,
} from "~/apis/auth/endpoints";
import { redirect } from "react-router";
import type { Route } from "./+types/auth-connect";
import { AuthConnectPageView } from "~/components/pages/auth-connect/view";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Auth" },
    { name: "description", content: "Sign in to your account" },
  ];
}

export async function action() {
  const data = await createRequestTokenApi();
  return redirect(
    `/auth/login?request_token=${encodeURIComponent(data.request_token)}`
  );
}

type AuthConnectRouteProps = {
  actionData: CreateRequestTokenResponse | null;
};

export default function AuthConnectRoute({
  actionData,
}: AuthConnectRouteProps) {
  console.log("AuthConnectRoute actionData:", actionData);
  return <AuthConnectPageView actionData={actionData} />;
}
