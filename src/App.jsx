import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/index';
import Navbar from './components/Navbar/Navbar';
import { meThunk } from './store/authSlice';
import { fetchCart } from './store/cartSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(meThunk());
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;