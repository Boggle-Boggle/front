import useAuthStore from 'stores/useAuthStore';

import api from 'services/index';

const useLogout = () => {
  const logoutStore = useAuthStore((state) => state.logout);

  const logout = () => {
    api
      .post('/auth/logout')
      .then(() => {
        logoutStore();
      })
      .catch(() => {
        // TODO : 로그아웃 에러핸들링
        // console.error('Error during logout', error);
      });
  };

  return { logout };
};

export default useLogout;
