import { Outlet } from 'react-router-dom';
import useAuthStore from 'stores/useAuthStore';

import LogoutBtn from 'layouts/Login/LogoutBtn';

const App = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      <div>헤더</div>
      {isAuthenticated && <LogoutBtn />}
      <Outlet />
      <div>푸터</div>
    </>
  );
};

export default App;
