import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeCartItem, checkout } from '../../store/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (loading) return <p>Cargando carrito...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Mi carrito</h1>
      {items.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name || item.productId} - {item.quantity}
              <button onClick={() => dispatch(removeCartItem(item.productId))}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
      {items.length > 0 && (
        <button onClick={() => dispatch(checkout())}>Finalizar compra</button>
      )}
    </div>
  );
};

export default CartPage;