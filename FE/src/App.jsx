import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './router/routes';
import Login from './pages/login';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
