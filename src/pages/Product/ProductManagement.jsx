// src/pages/dashboard/ProductManagement.jsx
import React, { useEffect, useState } from 'react';
import { fetchAllProducts, deleteProduct } from '../../services/productService.js';
import EditProductModal from './EditProductModal.jsx';
import AddProductModal from './AddProductModal.jsx';
import AddCategoryModal from './AddCategoryModal.jsx';
import { Plus, FolderPlus, Edit, Trash2, Package, Tag, Image as ImageIcon } from 'lucide-react';

const statusStyles = {
  AVAILABLE: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20',
  AUCTIONED: 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20',
  SOLD: 'bg-slate-100 text-slate-700 ring-1 ring-slate-600/20',
  INACTIVE: 'bg-rose-50 text-rose-700 ring-1 ring-rose-600/20',
  DEFAULT: 'bg-slate-100 text-slate-600 ring-1 ring-slate-600/20',
};

const formatStatus = (status) =>
  status ? status.charAt(0) + status.slice(1).toLowerCase() : '—';

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
    : '—';

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);

  const loadProducts = async () => {
    const data = await fetchAllProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name || 'this product'}"?`)) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  const openEdit = (product) => {
    setEditProduct(product);
    setShowEdit(true);
  };

  const closeEdit = () => {
    setShowEdit(false);
    setEditProduct(null);
    loadProducts();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Product Management</h1>
            <p className="text-sm text-slate-500 mt-1">{products.length} products listed in your catalog</p>
          </div>
          <div className="flex gap-3">
            <button
              className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
              onClick={() => setShowAddCategory(true)}
            >
              <FolderPlus size={16} /> Add Category
            </button>
            <button
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors"
              onClick={() => setShowAddProduct(true)}
            >
              <Plus size={16} /> Add Product
            </button>
          </div>
        </div>

        {/* Product Table */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3.5 text-left font-semibold text-slate-700">Product</th>
                <th className="px-6 py-3.5 text-left font-semibold text-slate-700">Category</th>
                <th className="px-6 py-3.5 text-left font-semibold text-slate-700">Status</th>
                <th className="px-6 py-3.5 text-left font-semibold text-slate-700">Last Updated</th>
                <th className="px-6 py-3.5 text-right font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p) => {
                const productName = p.name || p.title || 'Untitled Product';
                const mainImage =
                  p.imageUrls && Object.keys(p.imageUrls).length > 0
                    ? Object.values(p.imageUrls)[0]
                    : null;

                return (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Product Info (Thumbnail, Name, Description) */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3.5">
                        <div className="h-10 w-10 shrink-0 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                          {mainImage ? (
                            <img
                              src={mainImage}
                              alt={productName}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <ImageIcon className="h-5 w-5 text-slate-400" />
                          )}

                        </div>
                        <div className="min-w-0 max-w-xs sm:max-w-sm">
                          <h2 className="text-sm font-bold text-slate-900 truncate">{productName}</h2>
                          {p.description && (
                            <p className="text-xs text-slate-500 truncate mt-0.5" title={p.description}>
                              {p.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      {p.categoryName ? (
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                          <Tag size={12} className="text-indigo-500" />
                          {p.categoryName}
                        </span>
                      ) : (
                        <span className="text-xs italic text-slate-400">Unassigned</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[p.status] || statusStyles.DEFAULT}`}>
                        {formatStatus(p.status)}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-xs font-medium text-slate-600">
                      {formatDate(p.updatedAt || p.createdAt)}
                    </td>

                    {/* Adjacent Action Buttons */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-50 transition-colors"
                          onClick={() => openEdit(p)}
                        >
                          <Edit size={14} /> Edit
                        </button>
                        <button
                          className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                          onClick={() => handleDelete(p.id, productName)}
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    <Package size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="font-semibold text-slate-700">No products found</p>
                    <p className="text-xs text-slate-400 mt-1">Click "Add Product" above to create your first listing.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddProductModal
        isOpen={showAddProduct}
        onClose={() => {
          setShowAddProduct(false);
          loadProducts();
        }}
      />
      <AddCategoryModal isOpen={showAddCategory} onClose={() => setShowAddCategory(false)} />
      {editProduct && (
        <EditProductModal isOpen={showEdit} onClose={closeEdit} product={editProduct} />
      )}
    </div>
  );
}