import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAdmin } from '../../store/authSlice';

const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const checkingSession = useSelector((state) => state.auth.checkingSession);
  const isAdmin = useSelector(selectIsAdmin);

  if (checkingSession) {
    return <p>Cargando...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;