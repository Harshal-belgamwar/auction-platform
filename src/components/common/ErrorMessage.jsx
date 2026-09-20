import { AlertCircle, RefreshCw } from 'lucide-react';

/**
 * Error message with optional retry button.
 * @param {{ message, onRetry }} props
 */
export default function ErrorMessage({
  message = 'Something went wrong. Please try again.',
  onRetry = null,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-danger/10">
        <AlertCircle size={28} className="text-danger" />
      </div>
      <p className="mb-4 max-w-sm text-sm text-surface-300">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 rounded-xl border border-surface-700 px-4 py-2 text-sm font-medium text-surface-300 transition-colors hover:border-surface-500 hover:text-surface-100"
        >
          <RefreshCw size={14} />
          Try Again
        </button>
      )}
    </div>
  );
}
