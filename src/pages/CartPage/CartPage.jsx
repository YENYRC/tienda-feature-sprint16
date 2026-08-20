import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeCartItem, checkout } from '../../store/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error, checkoutSuccess } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (loading) return <p>Cargando carrito...</p>;
  if (error) return <p>Error: {error}</p>;

  const total = items.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.quantity,
    0
  );

  const handleCheckout = () => {
    dispatch(checkout());
  };

  return (
    <div>
      <h1>Mi carrito</h1>

      {checkoutSuccess && (
        <p style={{ color: 'lightgreen' }}>
          ¡Compra realizada con éxito! Gracias por tu pedido.
        </p>
      )}

      {items.length === 0 ? (
        <>
          <p>Tu carrito está vacío.</p>
          <Link to="/products" style={{ color: "#FFD700" }}>Seguir comprando</Link>
        </>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.product?.name || item.productId} - {item.quantity} x {item.product?.price?.toFixed(2)}€
                <button onClick={() => dispatch(removeCartItem(item.productId))}>Eliminar</button>
              </li>
            ))}
          </ul>
          <p><strong>Total: {total.toFixed(2)}€</strong></p>
          <button onClick={handleCheckout}>Finalizar compra</button>
          <br />
          <Link to="/products" style={{ color: "#FFD700" }}>Seguir comprando</Link>
        </>
      )}
    </div>
  );
};

export default CartPage;
