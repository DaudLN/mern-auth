import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import App from './App';
import ErrorPage from './pages/ErrorPage';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <PrivateRoute />,
        children: [{ path: '/profile', element: <Profile /> }],
      },
      { element: <Home />, index: true },
      { path: '/signin', element: <Signin /> },
      { path: '/signup', element: <Signup /> },
    ],
  },
]);

export default router;
