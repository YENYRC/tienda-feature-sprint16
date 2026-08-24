import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../api/products';

const linkStyle = {
  color: '#8FD9A8',
  textDecoration: 'none',
  marginRight: '0.75rem',
};

function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      const result = await getProducts();
      setProducts(result.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmar = window.confirm('¿Seguro que quieres eliminar este producto?');
    if (!confirmar) return;

    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      alert('Error al eliminar el producto');
    }
  }

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Ha ocurrido un error al cargar los productos.</p>;

  return (
    <div>
      <h1>Gestión de productos</h1>
      <Link to="/admin/products/new" style={linkStyle}>Crear producto</Link>

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <span>{p.name} — {p.price}€ </span>
            <Link to={`/admin/products/${p.id}/edit`} style={linkStyle}>Editar</Link>
            <button onClick={() => handleDelete(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminProductsPage;