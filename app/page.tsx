"use client";

import { Pagination, RepositoryCard, SearchBar, SortFilter } from "@/components";
import { useGithubRepositories } from "@/hooks/useGithubRepositories";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "./loading";

export default function Home() {
  // Get navigation utilities
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract URL query parameters for search functionality
  const searchQuery = searchParams.get("q") ?? "";
  const currentPage = Number(searchParams.get("page") ?? 1);
  const sortBy = searchParams.get("sort") ?? "stars";

  // Fetch repositories from GitHub API based on search parameters
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGithubRepositories(searchQuery, currentPage, sortBy);

  // Extract repository list and total count from API response
  const repositories = data?.items ?? [];
  const totalCount = data?.total_count ?? 0;
  const loading = isLoading || isFetching;

  // Handle search action triggered from SearchBar component
  const handleSearch = (query: string) => {
    if (!query) {
      router.push(`/`);
      return;
    }

    router.push(`/?q=${encodeURIComponent(query)}&page=1&sort=${sortBy}`);
  };

  // Handle sort option change from SortFilter component
  const handleSortChange = (sort: string) => {
    router.push(`/?q=${searchQuery}&page=1&sort=${sort}`);
  };

  // Handle page change from Pagination component
  const onPageChange = (page: number) => {
    if (page !== currentPage) {
      router.push(`/?q=${searchQuery}&page=${page}&sort=${sortBy}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl flex flex-col h-screen">
        <header className="mb-6 text-center">
          <div className="flex align-center gap-3 mb-4 align-middle">
            <a href="/" className="flex"><Image src="/github.svg" alt="GitHub Logo" width={24} height={24} /></a>
            <SearchBar onSearch={handleSearch} />
          </div>
        </header>

        <div className="grow overflow-y-scroll">
          {/* Initial State  */}
          {!loading && !searchQuery && (
            <div className="text-center py-16">
              <h3 className="text-4xl font-semibold mb-2">Search GitHub repositories</h3>
              <p className="text-muted-foreground mb-4">Search for repositories by name, description, or topic in the search bar.</p>
              <p className="p-2 border border-neutral-800 bg-neutral-900 rounded w-60 font-bold text-sm justify-self-center">press / for quick access</p>
            </div>
          )}

          {/* Results Header */}
          {searchQuery && repositories.length > 0 && (
            <div className="mb-6 flex items-center justify-between">
              <div className="text-muted-foreground">
                <span className="text-white font-bold">{totalCount.toLocaleString()}</span>
                {totalCount > 0 && <span> {totalCount === 1 ? "repository" : "repositories"} found</span>}
              </div>
              {totalCount > 0 && <SortFilter currentSort={sortBy} onSortChange={handleSortChange} />}
            </div>
          )}

          {/* Loading State  */}
          {loading && <Loading />}

          {/* Results */}
          {!loading && repositories.length > 0 && repositories.map((repo) => <RepositoryCard key={repo.id} repository={repo} />)}

          {/* No Results */}
          {!loading && searchQuery && !isError&& repositories.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold mb-2">No repositories found</h3>
              <p className="text-muted-foreground">Try a different search term.</p>
            </div>
          )}

          {/* Error State */}
          {!loading && isError && (
             <div className="text-center py-16">
              <h3 className="text-2xl font-semibold mb-2">Something went wrong</h3>
              <p className="text-muted-foreground mb-4">
                {(error as Error).message || "Failed to load repositories"}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 rounded bg-blue-400 cursor-pointer text-white"
              >
                Retry
              </button>
            </div>
          )}
        </div>
        {/* Pagination */}
        {searchQuery && (
          <div className="mt-6">
            <Pagination currentPage={currentPage} totalCount={totalCount} onPageChange={onPageChange} />
          </div>
        )}
      </div>
    </div>
  );
}
