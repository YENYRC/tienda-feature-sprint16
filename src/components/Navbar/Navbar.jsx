import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutThunk, selectIsAdmin } from '../../store/authSlice';
import { selectCartCount } from '../../store/cartSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isAdmin = useSelector(selectIsAdmin);
  const cartCount = useSelector(selectCartCount);

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate('/login');
  };

  const linkStyle = ({ isActive }) => ({
    marginRight: '1.5rem',
    fontWeight: isActive ? 600 : 500,
    color: isActive ? '#5c7a61' : '#6b7268',
    textDecoration: 'none',
    fontSize: '0.95rem',
    letterSpacing: '0.02em',
    transition: 'color 0.2s',
  });

  const buttonStyle = {
    padding: '0.5rem 1.1rem',
    fontSize: '0.9rem',
    fontWeight: 500,
    color: '#2d2d2d',
    background: 'transparent',
    border: '1px solid #8ca891',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background 0.2s, color 0.2s',
  };

  return (
    <nav
      style={{
        padding: '1.2rem 2rem',
        borderBottom: '1px solid #e8e2d9',
        display: 'flex',
        alignItems: 'center',
        background: '#ffffff',
      }}
    >
      <NavLink to="/" style={linkStyle}>Inicio</NavLink>
      <NavLink to="/products" style={linkStyle}>Productos</NavLink>
      {user && (
        <>
          <NavLink to="/cart" style={{ ...linkStyle({ isActive: false }), display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            Carrito
            <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>🛒</span>
            {cartCount > 0 && (
              <span
                style={{
                  background: '#8ca891',
                  color: '#ffffff',
                  borderRadius: '999px',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  padding: '0.1rem 0.45rem',
                  lineHeight: 1.4,
                }}
              >
                {cartCount}
              </span>
            )}
          </NavLink>
          <NavLink to="/wishlist" style={linkStyle}>Wishlist</NavLink>
          <NavLink to="/profile" style={linkStyle}>Perfil</NavLink>
        </>
      )}
      {isAdmin && (
        <NavLink to="/admin" style={linkStyle}>Admin</NavLink>
      )}
      {user ? (
        <button
          onClick={handleLogout}
          style={{ ...buttonStyle, marginLeft: 'auto' }}
          onMouseEnter={(e) => {
            e.target.style.background = '#8ca891';
            e.target.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '#2d2d2d';
          }}
        >
          Cerrar sesión
        </button>
      ) : (
        <NavLink to="/login" style={{ ...linkStyle({ isActive: false }), marginLeft: 'auto' }}>
          Iniciar sesión
        </NavLink>
      )}
    </nav>
  );
};

export default Navbar;