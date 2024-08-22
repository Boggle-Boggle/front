import { Outlet } from 'react-router-dom';
import useAuthStore from 'stores/useAuthStore';

import BottomNavigator from 'components/ui/BottomNavigator';
import LogoutBtn from 'layouts/Login/LogoutBtn';

const App = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      <Outlet />
      {isAuthenticated && <LogoutBtn />}
      <BottomNavigator />
    </>
  );
};

export default App;
