import { useQuery } from "@tanstack/react-query";
import { fetchRepositories } from "@/services/githubService";

/**
 * Custom hook to fetch GitHub repositories based on search query, page number,
 * and sort option.
 *
 * Caches results using React Query for performance optimization.
 *
 * @param query The search query string
 * @param page The page number for pagination
 * @param sort The sort option for the repositories
 * @returns React Query result object containing repository data and status
 */
export function useGithubRepositories(
  query: string,
  page: number,
  sort: string
) {
  return useQuery({
    queryKey: ["github-repos", query, page, sort],
    queryFn: () => fetchRepositories(query, page, sort),
    enabled: !!query,
  });
}
