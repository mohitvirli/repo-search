"use client";

import { Pagination } from "@/components/Pagination";
import Repository from "@/components/Respository";
import { SearchBar } from "@/components/SearchBar";
import { SortFilter } from "@/components/SortFilter";
import { fetchRepositories } from "@/services/githubService";
import Image from "next/image";
import { useState } from "react";
import Loading from "./loading";

export default function Home() {
  const [repositories, setRepositories] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [loading, setLoading] = useState(false);

  const searchRepositories = async (query: string, page = 1, sort = "stars") => {
    setLoading(true);
    try {
      const data = await fetchRepositories(query, page, sort);
      setRepositories(data.items);
      setTotalCount(data.total_count);
    } catch (error) {
      console.error("Error searching repositories:", error); // TODO: handle error properly
    } finally {
      setLoading(false);
    }
  }
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    searchRepositories(query, 1, sortBy);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort)
    searchRepositories(searchQuery, 1, sort)
  }

  const onPageChange = (page: number) => {
    if (page === currentPage) return;
    setCurrentPage(page);
    searchRepositories(searchQuery, page, sortBy);
  }

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

          {/* Loading State  */}
          {loading && <Loading />}

          {/* Results Header */}
          {!loading && searchQuery && (
            <div className="mb-6 flex items-center justify-between">
              <div className="text-muted-foreground">
                <span className="text-white font-bold">{totalCount.toLocaleString()}</span>
                {totalCount > 0 && <span> {totalCount === 1 ? "repository" : "repositories"} found</span>}
              </div>
              {totalCount > 0 && <SortFilter currentSort={sortBy} onSortChange={handleSortChange} />}
            </div>
          )}
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
        {!loading && totalCount > 0 && repositories.length > 0 && (
          <div className="mt-6">
            <Pagination currentPage={currentPage} totalPages={Math.ceil(totalCount / 10)} onPageChange={onPageChange} />
          </div>
        )}
      </div>
    </div>
  );
}
