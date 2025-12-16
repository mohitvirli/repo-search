"use client"

import { useState, type FormEvent } from "react"

import Image from "next/image"

interface SearchBarProps {
  onSearch: (query: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className="flex-grow">
      <div className={`justify-self-end ${isFocused ? "w-full" : "w-40"} transition-all duration-300 relative`}>
        <Image src="/search.svg" alt="Search Icon" width={16} height={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search..."
          className="w-full pl-12 pr-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
        <Image src="/cancel.svg" alt="Clear Icon" width={16} height={16} className={`absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground ${query ? 'block' : 'hidden'}`} onClick={() => setQuery('')} />
      </div>
    </form>
  )
}
