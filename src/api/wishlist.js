import api from './axios';

export const getWishlist = async () => {
  const response = await api.get('/api/wishlist');
  return response.data;
};

export const toggleWishlist = async (productId) => {
  const response = await api.post(`/api/wishlist/${productId}`);
  return response.data;
};