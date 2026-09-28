import { shouldHandleAsAuthRequired } from 'policy/error';
import { Navigate, Outlet } from 'react-router-dom';

import Loading from 'pages/Loading';

import { useGetMeQuery } from '../Auth/useGetMeQuery';

const PrivateRoute = () => {
  const { error, isError, isLoading, isSuccess } = useGetMeQuery();

  if (isLoading) return <Loading />;

  if (isError) {
    if (shouldHandleAsAuthRequired(error)) return <Navigate to="/login" replace />;

    throw error;
  }

  if (isSuccess) return <Outlet />;
  return null;
};

export default PrivateRoute;
