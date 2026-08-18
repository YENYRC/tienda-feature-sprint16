import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <h1>Mi perfil</h1>
      {user ? (
        <p>Hola, {user.name || user.email}</p>
      ) : (
        <p>Sesión iniciada.</p>
      )}
      <button onClick={() => dispatch(logout())}>Cerrar sesión</button>
    </div>
  );
};

export default ProfilePage;