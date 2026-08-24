import { Link } from 'react-router-dom';

function CheckoutSuccessPage() {
  return (
    <div>
      <h1>Pago completado</h1>
      <p>Gracias por tu compra. Tu pedido ha sido procesado correctamente.</p>
      <Link to="/products" style={{ color: '#FFD700' }}>Seguir comprando</Link>
    </div>
  );
}

export default CheckoutSuccessPage;