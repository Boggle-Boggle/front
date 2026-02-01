import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from 'stores/useAuthStore';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuthStore();
  return <Outlet />;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
