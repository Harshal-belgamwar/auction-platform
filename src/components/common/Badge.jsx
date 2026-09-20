/**
 * Status badge component with preset color variants.
 * @param {{ variant, children, className, dot }} props
 */
export default function Badge({
  variant = 'default',
  children,
  className = '',
  dot = false,
}) {
  const variants = {
    live: 'badge-live',
    ending: 'badge-ending',
    upcoming: 'badge-upcoming',
    completed: 'badge-completed',
    won: 'badge-won',
    outbid: 'badge-outbid',
    leading: 'badge-leading',
    default: 'bg-surface-800 text-surface-300 border border-surface-700',
  };

  return (
    <span className={`badge ${variants[variant] || variants.default} ${className}`}>
      {dot && (
        <span
          className={`inline-block h-1.5 w-1.5 rounded-full ${
            variant === 'live' ? 'animate-pulse bg-success' :
            variant === 'ending' ? 'animate-pulse bg-danger' :
            'bg-current'
          }`}
        />
      )}
      {children}
    </span>
  );
}
