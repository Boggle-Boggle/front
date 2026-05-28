import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToastStore } from 'stores/useToastStore';

import Loading from 'pages/Loading';

import { getAuthErrorRoute } from 'services/auth';

const MSG_AUTH_ERROR = '로그인에 실패했습니다. 잠시 후 다시 시도해주세요.';

const Auth = () => {
  const { addToast } = useToastStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get('status');
    const errorCode = searchParams.get('code');

    if (status === 'EXISTING_USER') {
      navigate('/', { replace: true });
      return;
    }

    if (status === 'SIGNUP_REQUIRED') {
      navigate('/signup', { replace: true });
      return;
    }

    addToast({
      description: MSG_AUTH_ERROR,
      type: 'error',
    });

    navigate(getAuthErrorRoute(errorCode), { replace: true });
  }, [addToast, location.search, navigate]);

  return <Loading />;
};

export default Auth;
