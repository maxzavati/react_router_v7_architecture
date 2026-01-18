interface PagedResponse<T> {
  page: number;
  total_pages?: number;
  total_results?: number;
  results: T[];
}

export async function fetchAllPages<T>(
  fetchPage: (page: number) => Promise<PagedResponse<T>>,
) {
  const aggregated: T[] = [];
  let page = 1;
  let totalPages = Infinity;

  while (page <= totalPages) {
    const response = await fetchPage(page);
    aggregated.push(...response.results);

    if (!response.results.length) break;

    totalPages =
      response.total_pages ??
      (response.total_results && response.results.length
        ? Math.ceil(response.total_results / response.results.length)
        : page);

    page += 1;
  }

  return aggregated;
}

export function posterPath(path: string | null) {
  return path
    ? `${import.meta.env.VITE_IMAGE_BASE_URL}/w500${path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';
}
