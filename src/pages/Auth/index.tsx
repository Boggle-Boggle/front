import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from 'stores/useAuthStore';

import Loading from 'pages/Loading';

import { getAuthorization } from 'services/user';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const checkAuthorization = async () => {
      const queryParam = new URLSearchParams(location.search);
      const accessToken = queryParam.get('token');

      try {
        const authorization = await getAuthorization();

        if (accessToken) {
          login(accessToken);

          if (authorization === 'GUEST') navigate('/signup');
          else if (authorization === 'USER') navigate('/');
          // TODO : 권한이 업데이트 됐을 경우 권한이 업데이트 됨! 페이지로
          else if (authorization === 'LIMITED_USER') navigate('/');
        } else {
          alert('로그인에 문제가 발생했습니다.');
          logout();
          navigate('/login');
        }
      } catch (error) {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
        logout();
        navigate('/login');
      }
    };

    checkAuthorization();
  }, [location.search, navigate, login, logout]);

  return <Loading />;
};

export default Auth;
