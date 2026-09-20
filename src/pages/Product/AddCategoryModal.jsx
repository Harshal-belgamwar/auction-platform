import { X } from 'lucide-react';
import { useState } from 'react';

import api from '../../api/axios';
import toast from 'react-hot-toast';

export default function AddCategoryModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await api.post('/api/v1/products/category', { name, description });
      setName('');
      setDescription('');
      onClose();
      toast.success('Category added successfully');
    } catch (err) {
      toast.error(err.response.data.message)
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
        <button
          type="button"
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Add Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="category-name">Name</label>
            <input
              id="category-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="category-description">Description</label>
            <textarea
              id="category-description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300" onClick={onClose}>Cancel</button>
            <button type="submit" className="rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700" >Add Category</button>
          </div>
        </form>
      </div>
    </div>
  );
}
