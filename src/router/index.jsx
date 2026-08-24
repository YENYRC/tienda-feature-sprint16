import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import ProductsPage from '../pages/ProductsPage/ProductsPage';
import ProductDetailPage from '../pages/ProductDetailPage/ProductDetailPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import CartPage from '../pages/CartPage/CartPage';
import WishlistPage from '../pages/WishlistPage/WishlistPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import AdminPage from '../pages/AdminPage/AdminPage';
import AdminProductsPage from '../pages/AdminProductsPage/AdminProductsPage';
import AdminProductFormPage from '../pages/AdminProductFormPage/AdminProductFormPage';
import CheckoutSuccessPage from '../pages/CheckoutSuccessPage/CheckoutSuccessPage';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import AdminRoute from '../components/AdminRoute/AdminRoute';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <PrivateRoute>
            <WishlistPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/checkout/success"
        element={
          <PrivateRoute>
            <CheckoutSuccessPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <AdminProductsPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/products/new"
        element={
          <AdminRoute>
            <AdminProductFormPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/products/:id/edit"
        element={
          <AdminRoute>
            <AdminProductFormPage />
          </AdminRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;