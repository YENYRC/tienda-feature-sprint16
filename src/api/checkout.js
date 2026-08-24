import api from './axios';

export const createCheckoutSession = async () => {
  const response = await api.post('/api/checkout/session');
  return response.data;
};