import { useState, useMemo } from 'react';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../components/ProductCard/ProductCard';
import './ProductsPage.css';

function ProductsPage() {
  const { data, loading, error } = useProducts();

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');

  // useMemo: solo recalcula cuando cambian data, search o sortBy
  const filteredProducts = useMemo(() => {
    return data
      .filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
      .slice()
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return 0;
      });
  }, [data, search, sortBy]);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Ha ocurrido un error al cargar los productos.</p>;

  return (
    <div>
      <h1>Catálogo de productos</h1>

      <div className="products-filters">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="default">Sin ordenar</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
        </select>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;