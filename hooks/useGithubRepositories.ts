import { useQuery } from "@tanstack/react-query";
import { fetchRepositories } from "@/services/githubService";

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
