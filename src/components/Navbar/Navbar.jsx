import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
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
      {token && (
        <>
          <NavLink to="/cart" style={linkStyle}>Carrito</NavLink>
          <NavLink to="/wishlist" style={linkStyle}>Wishlist</NavLink>
          <NavLink to="/profile" style={linkStyle}>Perfil</NavLink>
        </>
      )}
      {token ? (
        <button onClick={handleLogout}>Cerrar sesión</button>
      ) : (
        <NavLink to="/login" style={linkStyle}>Iniciar sesión</NavLink>
      )}
    </nav>
  );
};

export default Navbar;
