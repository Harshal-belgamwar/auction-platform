import React, { useEffect, useState } from 'react';
import { fetchAllCategories, deleteCategory } from '../../services/categoryService.js';
import AddCategoryModal from '../Product/AddCategoryModal.jsx';
import EditCategoryModal from './EditCategoryModal.jsx';
import { Plus, Edit, Trash2, FolderTree, Search, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await fetchAllCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load categories:', err);
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete the category "${name}"?`)) {
      try {
        await deleteCategory(id);
        toast.success(`Category "${name}" deleted successfully`);
        loadCategories();
      } catch (err) {
        console.error('Failed to delete category:', err);
        toast.error(err.response?.data?.message || 'Failed to delete category');
      }
    }
  };

  const openEdit = (category) => {
    setSelectedCategory(category);
    setShowEditModal(true);
  };

  const closeEdit = () => {
    setShowEditModal(false);
    setSelectedCategory(null);
  };

  const filteredCategories = categories.filter((cat) => {
    const query = searchQuery.toLowerCase();
    return (
      (cat.name && cat.name.toLowerCase().includes(query)) ||
      (cat.description && cat.description.toLowerCase().includes(query)) ||
      (cat.id && String(cat.id).includes(query))
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 flex items-center gap-2.5">
              <FolderTree className="h-7 w-7 text-indigo-600" />
              Category Management
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {categories.length} {categories.length === 1 ? 'category' : 'categories'} configured in catalog
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 rounded-lg border border-slate-300 bg-white pl-9 pr-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 shadow-sm"
              />
            </div>

            {/* Add Category Button */}
            <button
              className="flex items-center gap-2 shrink-0 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 transition-colors"
              onClick={() => setShowAddModal(true)}
            >
              <Plus size={16} /> Add Category
            </button>
          </div>
        </div>

        {/* Categories Table Container */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-500 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
              <p className="text-sm font-medium">Loading categories...</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-3.5 text-left font-semibold text-slate-700 w-20">ID</th>
                  <th className="px-6 py-3.5 text-left font-semibold text-slate-700">Name</th>
                  <th className="px-6 py-3.5 text-left font-semibold text-slate-700">Description</th>
                  <th className="px-6 py-3.5 text-right font-semibold text-slate-700 w-36">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCategories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-slate-400">#{cat.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{cat.name}</td>
                    <td className="px-6 py-4 text-slate-600 max-w-md truncate">
                      {cat.description || <span className="italic text-slate-400">No description provided</span>}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-indigo-600 hover:bg-indigo-50 transition-colors font-medium text-xs"
                          onClick={() => openEdit(cat)}
                        >
                          <Edit size={14} /> Edit
                        </button>
                        <button
                          className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-red-600 hover:bg-red-50 transition-colors font-medium text-xs"
                          onClick={() => handleDelete(cat.id, cat.name)}
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredCategories.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                      <FolderTree size={32} className="mx-auto mb-2 opacity-50" />
                      <p className="font-medium text-slate-600">No categories found</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {searchQuery ? 'Try adjusting your search query' : 'Get started by creating a new category.'}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddCategoryModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={loadCategories}
      />

      {selectedCategory && (
        <EditCategoryModal
          isOpen={showEditModal}
          onClose={closeEdit}
          category={selectedCategory}
          onSuccess={loadCategories}
        />
      )}
    </div>
  );
}
