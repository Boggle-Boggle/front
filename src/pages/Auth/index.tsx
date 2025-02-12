import { useEffect, useReducer } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from 'stores/useAuthStore';

import Alert from 'components/Alert';
import Loading from 'pages/Loading';

import { getAuthorization } from 'services/user';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const [isAlertActive, handleAlertActive] = useReducer((prev) => !prev, false);

  useEffect(() => {
    const checkAuthorization = async () => {
      const queryParam = new URLSearchParams(location.search);
      const accessToken = queryParam.get('token');

      try {
        if (accessToken) {
          login(accessToken);
          const authorization = await getAuthorization();

          if (authorization === 'GUEST') navigate('/signup');
          else if (authorization === 'USER') navigate('/');
          // TODO : 권한이 업데이트 됐을 경우 권한이 업데이트 됨! 페이지로
          else if (authorization === 'LIMITED_USER') navigate('/');
        } else {
          handleAlertActive();
          logout();

          setTimeout(() => {
            navigate('/login');
          }, 2500);
        }
      } catch (error) {
        handleAlertActive();
        logout();
        setTimeout(() => {
          navigate('/login');
        }, 2500);
      }
    };

    checkAuthorization();
  }, [location.search, navigate, login, logout]);

  return (
    <>
      {isAlertActive && <Alert message="오류가 발생했어요 다시 시도해주세요" onClose={handleAlertActive} />}
      <Loading />
    </>
  );
};

export default Auth;
