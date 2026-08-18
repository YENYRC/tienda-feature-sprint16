import { useDispatch } from 'react-redux';
import { addCartItem } from '../../store/cartSlice';

function ProductCard({ product }) {
  const dispatch = useDispatch();

  if (!product) return null;

  const imageUrl = product.image || 'https://placehold.co/300x300?text=Sin+imagen';

  const handleAddToCart = () => {
    dispatch(addCartItem({ productId: product.id, quantity: 1 }));
  };

  return (
    <div className="product-card">
      <img src={imageUrl} alt={product.name} className="product-card__image" />
      <h3 className="product-card__name">{product.name}</h3>
      <p className="product-card__price">{product.price}€</p>
      <button onClick={handleAddToCart} className="product-card__add-btn">
        Añadir al carrito
      </button>
    </div>
  );
}

export default ProductCard;