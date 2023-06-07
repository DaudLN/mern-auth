import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '../store/userStore';

const PrivateRoute = () => {
  const userInfo = useUserStore((s) => s.userInfo);
  return userInfo.email ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
