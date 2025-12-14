import type { Route } from "./+types/details";
import { detailsModel } from "~/components/views/details/model";
import { DetailsView } from "~/components/views/details/view";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Details" },
    { name: "description", content: "Item details" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const { mediaType, id } = params;

  return detailsModel({ mediaType, id });
}

export default function DetailsRoute() {
  return <DetailsView />;
}
