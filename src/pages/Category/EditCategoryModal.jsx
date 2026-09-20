import { X, Edit3 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { updateCategory } from '../../services/categoryService.js';
import toast from 'react-hot-toast';

export default function EditCategoryModal({ isOpen, onClose, category, onSuccess }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name || '');
      setDescription(category.description || '');
    }
  }, [category]);

  if (!isOpen || !category) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await updateCategory(category.id, { name, description });
      toast.success('Category updated successfully');
      onClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Failed to update category:', err);
      toast.error(err.response?.data?.message || err.message || 'Failed to update category');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200">
              <Edit3 size={20} />
            </span>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-semibold text-slate-900">Edit Category</h1>
              <p className="truncate text-xs text-slate-500">Update category details below.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-6">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="edit-category-name">
                Category Name
              </label>
              <input
                id="edit-category-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="edit-category-description">
                Description
              </label>
              <textarea
                id="edit-category-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={3}
                className="w-full resize-none rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200 sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 disabled:opacity-50 sm:w-auto flex items-center justify-center gap-1.5"
            >
              <Edit3 size={16} />
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
