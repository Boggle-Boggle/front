import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from 'stores/useAuthStore';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  // TODO : 에러핸들링
  useEffect(() => {
    const queryParam = new URLSearchParams(location.search);
    const accessToken = queryParam.get('token');
    console.log(`location.search : ${location.search}`);
    console.log(`queryParam : ${queryParam}`);
    console.log(`accessToken : ${accessToken}`);

    if (accessToken) {
      login(accessToken);

      navigate('/');
    } else {
      alert('토큰 문제');
    }
  });

  return <>로그인 중...</>;
};

export default Auth;
