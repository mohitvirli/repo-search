"use client";

import { Pagination } from "@/components/Pagination";
import Repository from "@/components/Respository";
import { SearchBar } from "@/components/SearchBar";
import { SortFilter } from "@/components/SortFilter";
import { useGithubRepositories } from "@/hooks/useGithubRepositories";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "./loading";



export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchQuery = searchParams.get("q") ?? "";
  const currentPage = Number(searchParams.get("page") ?? 1);
  const sortBy = searchParams.get("sort") ?? "stars";

  const {
    data,
    isLoading,
    isFetching,
  } = useGithubRepositories(searchQuery, currentPage, sortBy);

  const repositories = data?.items ?? [];
  const totalCount = data?.total_count ?? 0;
  const loading = isLoading || isFetching;

  const handleSearch = (query: string) => {
    router.push(`/?q=${encodeURIComponent(query)}&page=1&sort=${sortBy}`);
  };

  const handleSortChange = (sort: string) => {
    router.push(`/?q=${searchQuery}&page=1&sort=${sort}`);
  };

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
            <Image src="/github.svg" alt="GitHub Logo" width={24} height={24} />
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
          {!loading && repositories.length > 0 && repositories.map((repo) => <Repository key={repo.id} repository={repo} />)}

          {/* No Results */}
          {!loading && searchQuery && repositories.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold mb-2">No repositories found</h3>
              <p className="text-muted-foreground">Try a different search term.</p>
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
