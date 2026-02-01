import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Loading from 'pages/Loading';

import { refreshToken } from 'services/user';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParam = new URLSearchParams(location.search);
    const userStatus = queryParam.get('status');

    const handleAuth = async () => {
      // 기존 유저일 경우 refresh를 통해 엑세스 토큰 발급
      if (userStatus === 'EXISTING_USER') {
        await refreshToken();
        navigate('/');
        return;
      }

      // 신규 유저일 경우 회원가입 로직
      if (userStatus === 'SIGNUP_REQUIRED') navigate('/signup');
    };

    handleAuth();
  });

  return <Loading />;
};

export default Auth;
