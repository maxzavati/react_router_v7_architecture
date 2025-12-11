import { HomePage } from "~/components/pages/home/home";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Max's React Demo" },
    { name: "description", content: "Welcome to Max's React Demo!" },
  ];
}

export default function HomeRoute() {
  return <HomePage />;
}
