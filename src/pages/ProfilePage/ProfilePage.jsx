import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutThunk } from '../../store/authSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate('/login');
  };

  return (
    <div>
      <h1>Mi perfil</h1>
      {user ? (
        <p>Hola, {user.name || user.email}</p>
      ) : (
        <p>Sesión iniciada.</p>
      )}
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default ProfilePage;