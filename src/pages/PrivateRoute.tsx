import { useQuery } from '@tanstack/react-query';

import { Navigate, Outlet } from 'react-router-dom';

import Loading from 'pages/Loading';

import { getMe } from 'services/users';

// 화면깎는 중
const PrivateRoute = () => {
  return <Outlet />;
  const { data, error, isLoading } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: getMe,
    retry: false,
  });

  if (isLoading) return <Loading />;

  if (error || !data) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default PrivateRoute;
