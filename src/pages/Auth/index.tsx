import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from 'pages/Loading';

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login', { replace: true });
  }, [navigate]);

  return <Loading />;
};

export default Auth;
