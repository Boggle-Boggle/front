import { useQuery } from '@tanstack/react-query';

import { Navigate, Outlet } from 'react-router-dom';

import Loading from 'pages/Loading';

import { getMe } from '../Auth/api';

const PrivateRoute = () => {
  const { isError, isLoading, isSuccess } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: getMe,
    retry: false,
  });

  if (isLoading) return <Loading />;

  if (isSuccess) return <Outlet />;

  if (isError) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default PrivateRoute;
