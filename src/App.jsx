import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/index';
import Navbar from './components/Navbar/Navbar';
import { meThunk } from './store/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(meThunk());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;