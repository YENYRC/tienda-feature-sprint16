import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutThunk, selectIsAdmin } from '../../store/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isAdmin = useSelector(selectIsAdmin);

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate('/login');
  };

  const linkStyle = ({ isActive }) => ({
    marginRight: '1rem',
    fontWeight: isActive ? 'bold' : 'normal',
    color: isActive ? '#FFD700' : '#D9B3FF',
    textDecoration: 'none',
  });

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <NavLink to="/" style={linkStyle}>Inicio</NavLink>
      <NavLink to="/products" style={linkStyle}>Productos</NavLink>
      {user && (
        <>
          <NavLink to="/cart" style={linkStyle}>Carrito</NavLink>
          <NavLink to="/wishlist" style={linkStyle}>Wishlist</NavLink>
          <NavLink to="/profile" style={linkStyle}>Perfil</NavLink>
        </>
      )}
      {isAdmin && (
        <NavLink to="/admin" style={linkStyle}>Admin</NavLink>
      )}
      {user ? (
        <button onClick={handleLogout}>Cerrar sesión</button>
      ) : (
        <NavLink to="/login" style={linkStyle}>Iniciar sesión</NavLink>
      )}
    </nav>
  );
};

export default Navbar;