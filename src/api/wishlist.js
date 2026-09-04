import api from './axios';

export const getWishlist = async () => {
  const response = await api.get('/api/wishlist');
  return response.data;
};

export const addWishlistItem = async (productId) => {
  const response = await api.post(`/api/wishlist/${productId}`);
  return response.data;
};

export const removeWishlistItem = async (productId) => {
  const response = await api.delete(`/api/wishlist/${productId}`);
  return response.data;
};