"use client"

import { useEffect, useRef, useState, type FormEvent } from "react";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

interface SearchBarProps {
  onSearch: (query: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const searcghParams = useSearchParams();
  const [query, setQuery] = useState(searcghParams.get("q") ?? "");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const clearQuery = () => {
    setQuery("")
    onSearch("")
  };

  // Listen to `/` for focusing the search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        inputRef.current?.blur();
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="grow">
      <div className={`${isFocused || query ? "w-full" : "w-60"} justify-self-end transition-all duration-300 relative`}>
        <Image src="/search.svg" alt="Search Icon" width={16} height={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Type / to search..."
          className="w-full pl-12 pr-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
        <Image src="/cancel.svg" alt="Clear Icon" width={16} height={16} className={`absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground ${query ? 'block' : 'hidden'}`} onClick={clearQuery} />
      </div>
    </form>
  )
}
