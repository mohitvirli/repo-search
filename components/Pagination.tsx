"use client"

/**
 * This is fully AI Generated Pagination component, I modified styles and other
 * logic as per requirement.
 *
 * Note - Considered react-paginate package & shadcn-ui pagination but it was
 *        adding too much bloat to the project hence created a custom one.
 */
interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const showEllipsis = totalPages > 7

    if (!showEllipsis) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // Always show first page
    pages.push(1)

    if (currentPage > 3) {
      pages.push("...")
    }

    // Show pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i)
    }

    if (currentPage < totalPages - 2) {
      pages.push("...")
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg text-blue-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
        aria-label="Previous page"
      >
         <span>&#x276e;</span> Previous
      </button>

      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`min-w-10 h-10 px-3 rounded-lg cursor-pointer border border-transparent hover:border-white transition-all ${
                currentPage === page
                  ? "bg-blue-500 text-primary-foreground border-primary"
                  : "bg-card border-border hover:bg-accent hover:border-primary/50"
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="min-w-10 h-10 px-3 flex items-center justify-center text-muted-foreground">
              {page}
            </span>
          ),
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg text-blue-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
        aria-label="Next page"
      >
       Next <span>&#x276f;</span>
      </button>
    </div>
  )
}
