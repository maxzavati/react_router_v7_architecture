import { useLoaderData, useNavigation, useParams } from "react-router";
import type { loader } from "~/routes/movie-tv-details";

export function useMovieTvDetailsViewModel() {
  const loaderData = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const params = useParams();
  const id = params.id;

  return {
    id,
    ...loaderData,
    isLoading: navigation.state == "loading",
  };
}
