
const BASE_URL = "https://api.github.com";
const PER_PAGE = 10;
/**
 *
 * @param query
 * @param page
 * @param perPage
 * @param signal
 * @returns
 */
export async function fetchRepositories(
  query: string,
  page = 1,
  sort = '',
  signal?: AbortSignal
): Promise<any> { // TODO:
  if (!query) {
    return { total_count: 0, items: [] };
  }

  const params = new URLSearchParams({
    q: query,
    page: String(page),
    per_page: String(PER_PAGE),
    sort: String(sort ?? ''),
  });

  const response = await fetch(`${BASE_URL}/search/repositories?${params.toString()}`,
    {
      signal,
      headers: {
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("Rate limit exceeded");
    }
    throw new Error("Failed to fetch repositories");
  }

  return response.json();
}