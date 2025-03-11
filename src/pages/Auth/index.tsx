import { useEffect, useReducer } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from 'stores/useAuthStore';

import Alert from 'components/Alert';
import Loading from 'pages/Loading';

import { getAuthorization } from 'services/user';
import CustomError from 'utils/Error';

function isCustomError(error: unknown): error is CustomError {
  return (error as CustomError).custom !== undefined;
}

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const [isAlertActive, handleAlertActive] = useReducer((prev) => !prev, false);
  const [isAccessTokenAlertActive, handleAccessTokenAlertActive] = useReducer((prev) => !prev, false);
  const [isWithdrawnAlertActive, handleWithdrawnAlertActive] = useReducer((prev) => !prev, false);
  const [isRefreshAlertActive, handleRefreshAlertActive] = useReducer((prev) => !prev, false);
  const [isTermAlertActive, handleTermAlertActive] = useReducer((prev) => !prev, false);

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
          else if (authorization === 'LIMITED_USER') navigate('/'); // TODO : 권한이 업데이트 됐을 경우 권한이 업데이트 됨! 페이지로
        } //
        // 엑세스 토큰이 없으면 얼럿 수행
        else {
          handleAccessTokenAlertActive();
          logout();

          setTimeout(() => {
            navigate('/login');
          }, 2500);
        }
      } catch (error) {
        console.log(error);
        if (isCustomError(error) && error.custom) {
          if (error.message === '탈퇴한 회원입니다. 회원가입을 다시 진행해주세요') handleWithdrawnAlertActive();
          else if (error.message === '로그인 기한이 만료되었어요. 다시 로그인 해주세요') handleRefreshAlertActive();
          else if (error.message === '약관에 동의하지 않았어요. 회원가입을 다시 진행해주세요') handleTermAlertActive();
        } //
        else {
          handleAlertActive();
        }

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
      {isAccessTokenAlertActive && (
        <Alert message="로그인 과정 중 오류가 발생했어요 다시 시도해주세요" onClose={handleAccessTokenAlertActive} />
      )}
      {isWithdrawnAlertActive && (
        <Alert message="탈퇴한 회원입니다. 회원가입을 다시 진행해주세요" onClose={handleWithdrawnAlertActive} />
      )}
      {isRefreshAlertActive && (
        <Alert message="로그인 기한이 만료되었어요. 다시 로그인 해주세요" onClose={handleRefreshAlertActive} />
      )}
      {isTermAlertActive && (
        <Alert message="약관에 동의하지 않았어요. 회원가입을 다시 진행해주세요'" onClose={handleTermAlertActive} />
      )}

      <Loading />
    </>
  );
};

export default Auth;
