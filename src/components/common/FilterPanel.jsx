import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
// import { CATEGORIES, SORT_OPTIONS } from '@/utils/constants';

/**
 * Collapsible filter panel for auction listings.
 * @param {{ filters, onChange, onClear }} props
 */
export default function FilterPanel({ filters = {}, onChange, onClear }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  const activeCount = Object.values(filters).filter(Boolean).length;

  return (
    <div>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl border border-surface-700 bg-surface-800/50 px-4 py-3 text-sm font-medium text-surface-300 transition-colors hover:border-surface-500 hover:text-surface-100"
      >
        <SlidersHorizontal size={16} />
        Filters
        {activeCount > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-surface-950">
            {activeCount}
          </span>
        )}
        <ChevronDown
          size={14}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mt-3 rounded-xl border border-surface-700 bg-surface-800/60 p-5 backdrop-blur-sm"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Category */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-surface-400">
                  Category
                </label>
                <select
                  value={filters.category || ''}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-surface-200 outline-none focus:border-accent-500/40"
                  id="filter-category"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-surface-400">
                  Status
                </label>
                <select
                  value={filters.status || ''}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-surface-200 outline-none focus:border-accent-500/40"
                  id="filter-status"
                >
                  <option value="">All Statuses</option>
                  <option value="LIVE">Live</option>
                  <option value="UPCOMING">Upcoming</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-surface-400">
                  Min Price (₹)
                </label>
                <input
                  type="number"
                  value={filters.minPrice || ''}
                  onChange={(e) => handleChange('minPrice', e.target.value)}
                  placeholder="0"
                  className="w-full rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-surface-200 outline-none focus:border-accent-500/40"
                  id="filter-min-price"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-surface-400">
                  Max Price (₹)
                </label>
                <input
                  type="number"
                  value={filters.maxPrice || ''}
                  onChange={(e) => handleChange('maxPrice', e.target.value)}
                  placeholder="No limit"
                  className="w-full rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 text-sm text-surface-200 outline-none focus:border-accent-500/40"
                  id="filter-max-price"
                />
              </div>
            </div>

            {/* Sort + Clear */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-surface-400">Sort:</label>
                <select
                  value={filters.sort || ''}
                  onChange={(e) => handleChange('sort', e.target.value)}
                  className="rounded-lg border border-surface-600 bg-surface-900 px-3 py-1.5 text-sm text-surface-200 outline-none focus:border-accent-500/40"
                  id="filter-sort"
                >
                  <option value="">Default</option>
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {activeCount > 0 && (
                <button
                  onClick={onClear}
                  className="flex items-center gap-1.5 text-xs font-medium text-surface-400 transition-colors hover:text-danger"
                >
                  <X size={14} />
                  Clear Filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
