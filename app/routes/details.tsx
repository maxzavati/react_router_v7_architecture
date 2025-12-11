import { useParams } from "react-router";
import type { Route } from "./+types/details";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Details" },
    { name: "description", content: "Item details" },
  ];
}

export default function DetailsRoute() {
  const params = useParams();
  const id = params.id ?? "unknown";

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Details</h1>
      <p>Item ID: {id}</p>
    </main>
  );
}
