// src/services/categoryService.js
import api from '../api/axios.js';

export const fetchAllCategories = async () => {
  try {
    const response = await api.get('/api/v1/products/category');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await api.post('/api/v1/products/category', categoryData);
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const response = await api.put(`/api/v1/products/category/${id}`, categoryData);
    return response.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/api/v1/products/category/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

// Backwards compatibility alias
export const addCategory = createCategory;
