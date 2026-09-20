import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Animated search bar.
 * @param {{ value, onChange, placeholder, onSubmit }} props
 */
export default function SearchBar({
  value = '',
  onChange,
  placeholder = 'Search auctions...',
  onSubmit,
}) {
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(value);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <motion.div
        className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
          focused
            ? 'border-accent-500/40 bg-surface-800/80'
            : 'border-surface-700 bg-surface-800/50'
        }`}
        animate={{ borderColor: focused ? 'rgba(245,183,49,0.4)' : 'rgba(70,80,102,1)' }}
      >
        <Search size={18} className="shrink-0 text-surface-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-surface-100 outline-none placeholder:text-surface-500"
          id="search-auctions"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="rounded-md p-1 text-surface-400 transition-colors hover:text-surface-200"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </motion.div>
    </form>
  );
}
