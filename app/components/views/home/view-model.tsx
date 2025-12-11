import { useLoaderData, useNavigation } from "react-router";
import type { loader } from "~/routes/home";

export function useHomeViewModel() {
  const loaderData = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  return {
    loaderData,
    isLoading: navigation.state === "loading",
  };
}
