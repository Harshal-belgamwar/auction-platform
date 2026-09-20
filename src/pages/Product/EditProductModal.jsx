import React, { useState, useEffect } from 'react';
import { X, Edit, Trash2, Plus } from 'lucide-react';
import api from '../../api/axios.js';
import { updateProduct } from '../../services/productService.js';
import toast from 'react-hot-toast';

export default function EditProductModal({ isOpen, onClose, product }) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);

  // Existing images are a Map-like object:
  // { "1": "url1", "2": "url2", "3": "url3" }
  const [existingImages, setExistingImages] = useState({});

  // New images selected from computer
  const [newImages, setNewImages] = useState([]);

  const [loading, setLoading] = useState(false);


  // ==========================================
  // FETCH CATEGORIES
  // ==========================================

  const fetchCategories = async () => {
    try {

      const resp = await api.get('/api/v1/products/category');

      setCategories(resp.data);

    } catch (err) {

      console.error('Error fetching categories:', err);

      toast.error('Error fetching categories');
    }
  };


  // ==========================================
  // LOAD PRODUCT FROM PROP
  // ==========================================

  useEffect(() => {

    if (!isOpen || !product) {
      return;
    }

    // Product data is already passed from parent
    setName(product.name || '');
    setDescription(product.description || '');
    setCategoryId(
      product.categoryId !== null &&
        product.categoryId !== undefined
        ? String(product.categoryId)
        : ''
    );

    setExistingImages(product.imageUrls || {});

    // Reset newly selected images whenever
    // a different product is opened
    setNewImages([]);

    // Only categories need to be fetched
    fetchCategories();

  }, [isOpen, product]);


  // ==========================================
  // ADD NEW IMAGES
  // ==========================================

  const handleImageChange = (e) => {

    const files = Array.from(e.target.files);

    if (files.length === 0) {
      return;
    }

    setNewImages((prev) => [
      ...prev,
      ...files
    ]);

    // Allow selecting the same file again
    e.target.value = '';
  };


  // ==========================================
  // REMOVE EXISTING IMAGE
  // ==========================================

  const removeExistingImage = (imageId) => {

    setExistingImages((prev) => {

      const updated = { ...prev };

      delete updated[imageId];

      return updated;
    });
  };


  // ==========================================
  // REMOVE NEW IMAGE
  // ==========================================

  const removeNewImage = (index) => {

    setNewImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };


  // ==========================================
  // SUBMIT UPDATE
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const formData = new FormData();

      // Product fields
      formData.append('name', name);
      formData.append('description', description);
      formData.append('categoryId', categoryId);




      Object.entries(existingImages).forEach(
        ([imageId, imageUrl]) => {

          formData.append(
            `imageUrls[${imageId}]`,
            imageUrl
          );
        }
      );


      // ==========================================
      // NEW IMAGES
      // ==========================================

      newImages.forEach((file) => {

        formData.append(
          'images',
          file
        );
      });


      // Debug FormData
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }


      // Update product
      await updateProduct(
        product.id,
        formData
      );


      toast.success(
        'Product updated successfully'
      );

      onClose();

    } catch (err) {

      console.error(
        'Update product error:',
        err
      );

      console.error(
        'Response:',
        err.response?.data
      );

      toast.error(
        err.response?.data?.message ||
        'Error updating product'
      );

    } finally {

      setLoading(false);
    }
  };


  // ==========================================
  // MODAL
  // ==========================================

  if (!isOpen) {
    return null;
  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">

      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">

        {/* HEADER */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-6 py-4 backdrop-blur">

          <h2 className="text-lg font-semibold text-slate-900">
            Edit Product
          </h2>

          <button
            type="button"
            className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            onClick={onClose}
          >
            <X size={18} />
          </button>

        </div>


        <form
          onSubmit={handleSubmit}
          className="space-y-6 px-6 py-6"
        >

          {/* ==========================================
              NAME
          ========================================== */}

          <div>

            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Title
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="block w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
              placeholder="e.g. Wireless Headphones"
              required
            />

          </div>


          {/* ==========================================
              DESCRIPTION
          ========================================== */}

          <div>

            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Description
            </label>

            <textarea
              rows={3}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="block w-full resize-none rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
              placeholder="Briefly describe this product"
              required
            />

          </div>


          {/* ==========================================
              CATEGORY
          ========================================== */}

          <div>

            <label
              className="mb-1.5 block text-sm font-medium text-slate-700"
              htmlFor="category"
            >
              Category
            </label>

            <select
              id="category"
              value={categoryId}
              onChange={(e) =>
                setCategoryId(e.target.value)
              }
              required
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 shadow-sm transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
            >

              <option value="">
                Select category
              </option>

              {categories.map((category) => (

                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>

              ))}

            </select>

          </div>


          {/* ==========================================
              CURRENT IMAGES
          ========================================== */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Current images
            </label>


            {Object.keys(existingImages).length === 0 ? (

              <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
                No current images
              </div>

            ) : (

              <div className="grid grid-cols-3 gap-3">

                {Object.entries(existingImages).map(
                  ([imageId, imageUrl], index) => (

                    <div
                      key={imageId}
                      className="group relative overflow-hidden rounded-xl border border-slate-200 shadow-sm"
                    >

                      <img
                        src={imageUrl}
                        alt={`Product ${index + 1}`}
                        className="h-28 w-full object-cover"
                      />

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

                      <button
                        type="button"
                        onClick={() =>
                          removeExistingImage(imageId)
                        }
                        className="absolute right-1.5 top-1.5 rounded-full bg-white/90 p-1.5 text-red-600 shadow transition hover:bg-red-600 hover:text-white"
                        title="Remove image"
                      >

                        <Trash2 size={14} />

                      </button>

                    </div>

                  )
                )}

              </div>

            )}

          </div>


          {/* ==========================================
              ADD NEW IMAGES
          ========================================== */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Add new images
            </label>

            <label
              htmlFor="product-images"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm font-medium text-slate-600 transition hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600"
            >

              <Plus size={18} />

              <span>
                Click to add images
              </span>

            </label>


            <input
              id="product-images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />

          </div>


          {/* ==========================================
              NEW IMAGE PREVIEWS
          ========================================== */}

          {newImages.length > 0 && (

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                New images
              </label>


              <div className="grid grid-cols-3 gap-3">

                {newImages.map((file, index) => (

                  <div
                    key={`${file.name}-${index}`}
                    className="group relative overflow-hidden rounded-xl border border-indigo-200 shadow-sm"
                  >

                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="h-28 w-full object-cover"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

                    <button
                      type="button"
                      onClick={() =>
                        removeNewImage(index)
                      }
                      className="absolute right-1.5 top-1.5 rounded-full bg-white/90 p-1.5 text-red-600 shadow transition hover:bg-red-600 hover:text-white"
                      title="Remove image"
                    >

                      <Trash2 size={14} />

                    </button>

                  </div>

                ))}

              </div>

            </div>

          )}


          {/* ==========================================
              BUTTONS
          ========================================== */}

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              Cancel
            </button>


            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >

              <Edit size={14} />

              {loading
                ? 'Saving...'
                : 'Save changes'}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}