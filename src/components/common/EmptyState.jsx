import { PackageOpen } from 'lucide-react';

/**
 * Empty state illustration with message and optional CTA.
 * @param {{ title, message, icon, action, onAction }} props
 */
export default function EmptyState({
  title = 'Nothing here yet',
  message = '',
  icon: Icon = PackageOpen,
  action = '',
  onAction = null,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-800/60">
        <Icon size={32} className="text-surface-500" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-surface-200">{title}</h3>
      {message && (
        <p className="mb-4 max-w-sm text-sm text-surface-400">{message}</p>
      )}
      {action && onAction && (
        <button
          onClick={onAction}
          className="rounded-xl bg-accent-500 px-5 py-2.5 text-sm font-semibold text-surface-950 transition-all hover:bg-accent-400"
        >
          {action}
        </button>
      )}
    </div>
  );
}
