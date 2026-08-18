import { useParams } from 'react-router-dom';
import { useProduct } from '../../hooks/useProduct';
import { useReviews } from '../../hooks/useReviews';

function ProductDetailPage() {
  const { id } = useParams();
  const { data: product, loading: loadingProduct, error: errorProduct } = useProduct(id);
  const { data: reviews, loading: loadingReviews } = useReviews(id);

  if (loadingProduct) return <p>Cargando producto...</p>;
  if (errorProduct) return <p>Ha ocurrido un error al cargar el producto.</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Precio: {product.price}€</p>

      <h2>Reviews</h2>
      {loadingReviews ? (
        <p>Cargando reviews...</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>{review.comment}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductDetailPage;