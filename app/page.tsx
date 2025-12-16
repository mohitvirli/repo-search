"use client";

import Repository from "@/components/Respository";
import { SearchBar } from "@/components/SearchBar";
import { searchRepositories } from "@/services/githubService";
import Image from "next/image";
import { useState } from "react";
import Loading from "./loading";

export default function Home() {
  const [repositories, setRepositories] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setLoading(true);
    searchRepositories(query).then((data) => {
      setRepositories(data.items);
    }).catch((error) => {
      console.error("Error searching repositories:", error); // TODO: handle error properly
    }).finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-12 text-center">
          <div className="flex align-center gap-3 mb-4 align-middle">
            <Image src="/github.svg" alt="GitHub Logo" width={24} height={24} />
            <SearchBar onSearch={handleSearch} />
          </div>
        </header>

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
    </div>
  );
}
