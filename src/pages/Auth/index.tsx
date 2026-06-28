import { Navigate, useSearchParams } from 'react-router-dom';

const OAUTH_STATUS_EXISTING_USER = 'EXISTING_USER';
const OAUTH_STATUS_SIGNUP_REQUIRED = 'SIGNUP_REQUIRED';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');

  if (status === OAUTH_STATUS_EXISTING_USER) return <Navigate to="/" replace />;

  if (status === OAUTH_STATUS_SIGNUP_REQUIRED) return <Navigate to="/signup" replace />;

  return <Navigate to="/login" replace />;
};

export default Auth;
