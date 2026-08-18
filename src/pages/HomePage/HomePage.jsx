import { useProducts } from '../../hooks/useProducts';

function HomePage() {
  const { data, loading, error } = useProducts();

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Ha ocurrido un error al cargar los productos.</p>;

  return (
    <div>
      <h1>Bienvenida a la tienda</h1>
      <p>Tenemos {data.length} productos disponibles.</p>
    </div>
  );
}

export default HomePage;