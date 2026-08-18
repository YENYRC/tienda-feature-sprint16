import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist, toggleWishlist } from '../../store/wishlistSlice';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { productIds, loading, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  if (loading) return <p>Cargando wishlist...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Mi wishlist</h1>
      {productIds.length === 0 ? (
        <p>No tienes productos favoritos todavía.</p>
      ) : (
        <ul>
          {productIds.map((id) => (
            <li key={id}>
              Producto #{id}
              <button onClick={() => dispatch(toggleWishlist(id))}>Quitar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishlistPage;