import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Pagination component with page numbers.
 * @param {{ currentPage, totalPages, onPageChange }} props
 */
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    const delta = 2;
    const start = Math.max(1, currentPage - delta);
    const end = Math.min(totalPages, currentPage + delta);

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 pt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-surface-700 text-surface-400 transition-colors hover:border-surface-500 hover:text-surface-200 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {getPages().map((page, i) =>
        page === '...' ? (
          <span key={`dots-${i}`} className="px-1 text-surface-500">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
              page === currentPage
                ? 'bg-accent-500 text-surface-950'
                : 'border border-surface-700 text-surface-400 hover:border-surface-500 hover:text-surface-200'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-surface-700 text-surface-400 transition-colors hover:border-surface-500 hover:text-surface-200 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
