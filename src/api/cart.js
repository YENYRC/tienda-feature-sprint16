import api from './axios';

export const getCart = async () => {
  const response = await api.get('/api/cart');
  return response.data;
};

export const addCartItem = async (data) => {
  const response = await api.post('/api/cart', data);
  return response.data;
};

export const removeCartItem = async (itemId) => {
  const response = await api.delete(`/api/cart/${itemId}`);
  return response.data;
};

export const checkoutCart = async () => {
  const response = await api.post('/api/checkout');
  return response.data;
};