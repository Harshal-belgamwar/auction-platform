import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * Animated modal with backdrop.
 * @param {{ isOpen, onClose, title, children, maxWidth }} props
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg',
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className={`relative w-full ${maxWidth} glass-card p-6 shadow-modal`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-surface-50">{title}</h2>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-surface-400 transition-colors hover:bg-surface-800 hover:text-surface-200"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
