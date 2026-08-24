import { Link } from 'react-router-dom';

function AdminPage() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Bienvenida al panel de administración</p>
      <ul>
        <li>
          <Link to="/admin/products">Gestionar productos</Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminPage;