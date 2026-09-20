// src/components/dashboard/AddProductModal.jsx
import { useState, useEffect } from 'react';
import { X, Plus, ImagePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from "../../api/axios";
import toast from 'react-hot-toast';

export default function AddProductModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);

  // const categories = [
  //   { id: 1, name: 'Electronics' },
  //   { id: 2, name: 'Fashion' },
  //   { id: 3, name: 'Vehicles' },
  //   { id: 4, name: 'Furniture' },
  //   { id: 5, name: 'Books' },
  //   { id: 6, name: 'Collectibles' },
  //   { id: 7, name: 'Sports' },
  //   { id: 8, name: 'Jewelry' },
  // ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', title);
      formData.append('description', description);
      formData.append('categoryId', categoryId);
      images.forEach((file) => formData.append('images', file));

      await api.post('/api/v1/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onClose?.();
      toast.success('Product added successfully');
      navigate('/dashboard/product-management');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files) setImages(Array.from(e.target.files));
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };


  const fetchCategories = async () => {
    try {
      console.log("API BASE URL:", api.defaults.baseURL);
      const resp = await api.get('/api/v1/products/category');
      setCategories(resp.data);
    } catch (err) {
      toast.error("Error fetching categories");
    }
  }

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200">
              <Plus size={20} />
            </span>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-semibold text-slate-900">Add new product</h1>
              <p className="truncate text-xs text-slate-500">Fill in the details to list a new item.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-6">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="title">
                Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="e.g. Vintage leather jacket"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Describe the product's condition, features, and details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="w-full resize-none rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="images">
                Product images
              </label>
              <label
                htmlFor="images"
                className="flex h-[42px] cursor-pointer items-center gap-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3.5 text-sm text-slate-500 transition hover:border-indigo-400 hover:bg-indigo-50/50 hover:text-indigo-600"
              >
                <ImagePlus size={16} className="shrink-0" />
                <span className="truncate">
                  {images.length > 0 ? `${images.length} file(s) selected` : 'Choose files'}
                </span>
              </label>
              <input
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
              {images.length > 0 && (
                <div className="mt-2 max-h-28 space-y-1 overflow-y-auto pr-1">
                  {images.map((file, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <span className="min-w-0 flex-1 truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="shrink-0 inline-flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-700"
                      >
                        <X size={12} /> Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
              className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 sm:w-auto"
            >
              Add product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}