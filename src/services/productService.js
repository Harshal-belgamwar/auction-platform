// src/services/productService.js
import api from "../api/axios.js";

export const fetchAllProducts = async () => {
  try {
    const response = await api.get('/api/v1/products/my');
    const data = response.data;
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.content)) return data.content;
    if (data && Array.isArray(data.products)) return data.products;
    return [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const addProduct = async (productData) => {
  try {
    const response = await api.post('/api/v1/products', productData);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/api/v1/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/api/v1/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
