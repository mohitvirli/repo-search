"use client";

import { SearchBar } from "@/components/SearchBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-12 text-center">
          <div className="flex align-center gap-3 mb-4 align-middle">
            <Image src="/github.svg" alt="GitHub Logo" width={24} height={24} />
            <h1 className="text-xl">Github Search</h1>
            <SearchBar onSearch={() => {}} />
          </div>
        </header>
      </div>
    </div>
  );
}
