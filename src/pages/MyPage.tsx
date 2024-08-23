import useAuthStore from 'stores/useAuthStore';

import LogoutBtn from 'layouts/Login/LogoutBtn';

const MyPage = () => {
  const { isAuthenticated } = useAuthStore();
  return (
    <>
      {isAuthenticated && <LogoutBtn />}
      마이페이지
    </>
  );
};

export default MyPage;
