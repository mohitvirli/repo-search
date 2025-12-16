"use client"

interface SortFilterProps {
  currentSort: string
  onSortChange: (sort: string) => void
}

const sortOptions = [
  { value: "", label: "Best Match" },
  { value: "stars", label: "Most Stars" },
  { value: "forks", label: "Most Forks" },
  { value: "updated", label: "Recently Updated" },
  { value: "help-wanted-issues", label: "Help Wanted" },
]

export function SortFilter({ currentSort, onSortChange }: SortFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer hover:border-primary/50 transition-colors"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
