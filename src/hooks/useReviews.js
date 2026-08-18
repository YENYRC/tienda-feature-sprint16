import { useState, useEffect } from 'react';
import { getReviews } from '../api/reviews';

export const useReviews = (productId) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const result = await getReviews(productId);
        setData(result.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  return { data, loading, error };
};