import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createProduct,
  updateProduct,
  getProductById,
} from '../../api/products';

function AdminProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    stock: '',
    category: '',
  });
  const [file, setFile] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [loading, setLoading] = useState(isEditing);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isEditing) return;

    async function fetchProduct() {
      try {
        const result = await getProductById(id);
        const product = result.data;
        setFormData({
          name: product.name || '',
          price: product.price ?? '',
          description: product.description || '',
          stock: product.stock ?? '',
          category: product.category || '',
        });
        setCurrentImageUrl(product.imageUrl || null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id, isEditing]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('stock', formData.stock || 0);
    data.append('category', formData.category);
    if (file) {
      data.append('image', file);
    }

    try {
      if (isEditing) {
        await updateProduct(id, data);
      } else {
        await createProduct(data);
      }
      navigate('/admin/products');
    } catch (err) {
      alert('Error al guardar el producto');
    }
  }

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>Ha ocurrido un error al cargar el producto.</p>;

  return (
    <div>
      <h1>{isEditing ? 'Editar producto' : 'Crear producto'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        <input
          name="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          placeholder="Precio"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descripción"
        />
        <input
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Stock"
        />
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Categoría"
        />

        {isEditing && currentImageUrl && (
          <div>
            <p>Imagen actual:</p>
            <img src={currentImageUrl} alt={formData.name} width="120" />
          </div>
        )}

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        />

        <button type="submit">
          {isEditing ? 'Actualizar' : 'Crear'}
        </button>
      </form>
    </div>
  );
}

export default AdminProductFormPage;