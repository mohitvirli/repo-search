import Repository from "@/types/repository";

const BASE_URL = "https://api.github.com";
const PER_PAGE = 10;

interface RepositoryResponse {
  total_count: number;
  items: Repository[];
}

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
): Promise<RepositoryResponse> {
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

    const errorData = await response.json();
    if (errorData && errorData.message) {
      throw new Error(errorData.message);
    }

    throw new Error(response.statusText || "Failed to fetch repositories");
  }

  return response.json();
}