import useAuthStore from 'stores/useAuthStore';

import api from 'services/index';

const LogoutBtn = () => {
  const logout = useAuthStore((state) => state.logout);

  const handleClick = () => {
    api
      .post('/auth/logout')
      .then(() => {
        logout();
      })
      .catch(() => {
        // TODO : 로그아웃 에러핸들링
        // console.error('Error during logout', error);
      });
  };

  return (
    <button type="submit" onClick={handleClick}>
      로그아웃
    </button>
  );
};

export default LogoutBtn;
