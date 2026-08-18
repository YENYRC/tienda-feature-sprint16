import api from './axios';

export const getReviews = async (productId) => {
  const response = await api.get(`/api/reviews/${productId}`);
  return response.data;
};