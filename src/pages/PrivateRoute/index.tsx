import { Navigate, Outlet } from 'react-router-dom';

import Loading from 'pages/Loading';

import { useGetMeQuery } from '../Auth/useGetMeQuery';

const PrivateRoute = () => {
  const { isError, isLoading, isSuccess } = useGetMeQuery();

  if (isLoading) return <Loading />;

  if (isSuccess) return <Outlet />;

  if (isError) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default PrivateRoute;
