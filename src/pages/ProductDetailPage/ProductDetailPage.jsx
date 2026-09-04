import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useProduct } from '../../hooks/useProduct';
import { useReviews } from '../../hooks/useReviews';
import { addCartItem } from '../../store/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../store/wishlistSlice';

function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: product, loading: loadingProduct, error: errorProduct } = useProduct(id);
  const { data: reviews, loading: loadingReviews } = useReviews(id);
  const wishlistIds = useSelector((state) => state.wishlist.productIds);

  if (loadingProduct) return <p>Cargando producto...</p>;
  if (errorProduct) return <p>Ha ocurrido un error al cargar el producto.</p>;

  const isInWishlist = wishlistIds?.some((item) => item.productId === id);

  const handleAddToCart = () => {
    dispatch(addCartItem({ productId: id, quantity: 1 }));
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(id));
    } else {
      dispatch(addToWishlist(id));
    }
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Precio: {product.price}€</p>

      <button onClick={handleAddToCart}>Añadir al carrito</button>
      <button onClick={handleToggleWishlist}>
        {isInWishlist ? 'Quitar de wishlist' : 'Añadir a wishlist'}
      </button>

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