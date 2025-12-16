import Repository from "@/types/repository";

const BASE_URL = "https://api.github.com";
const PER_PAGE = 10;

/**
 * Response structure for GitHub repository search API
 */
interface RepositoryResponse {
  total_count: number;
  items: Repository[];
}

/**
 * Fetches GitHub repositories based on a search query, page number, and sort option.
 *
 * @param query The search query string
 * @param page The page number for pagination
 * @param perPage The number of repositories per page
 * @param signal AbortSignal to cancel the request
 * @returns A promise resolving to the repository response
 */
export async function fetchRepositories(
  query: string,
  page = 1,
  sort = '',
  signal?: AbortSignal
): Promise<RepositoryResponse> {
  // Return empty result for empty query
  if (!query) {
    return { total_count: 0, items: [] };
  }

  // Construct query parameters
  const params = new URLSearchParams({
    q: query,
    page: String(page),
    per_page: String(PER_PAGE),
    sort: String(sort ?? ''),
  });

  // Fetch data from GitHub API
  const response = await fetch(`${BASE_URL}/search/repositories?${params.toString()}`,
    {
      signal,
      headers: {
        Accept: "application/vnd.github+json",
      },
    }
  );

  // Handle HTTP errors
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