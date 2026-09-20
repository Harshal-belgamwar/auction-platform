import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const colors = {
  success: 'border-success/30 bg-success/10 text-success',
  error: 'border-danger/30 bg-danger/10 text-danger',
  warning: 'border-warning/30 bg-warning/10 text-warning',
  info: 'border-info/30 bg-info/10 text-info',
};

/**
 * Toast container — renders all active toasts in the top-right corner.
 */
export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[100] flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type] || Info;
          return (
            <motion.div
              key={toast.id}
              className={`pointer-events-auto flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm ${colors[toast.type] || colors.info}`}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.95 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            >
              <Icon size={18} className="shrink-0" />
              <p className="text-sm font-medium text-surface-100">
                {toast.message}
              </p>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-2 shrink-0 rounded-md p-1 transition-colors hover:bg-white/10"
                aria-label="Dismiss"
              >
                <X size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
