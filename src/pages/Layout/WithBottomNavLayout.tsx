import { Outlet } from 'react-router-dom';

import BottomNavigator from 'components/BottomNavigator';

const WithBottomNavLayout = () => {
  return (
    <section className="h-dvh w-full">
      <Outlet />
      <BottomNavigator />
    </section>
  );
};

export default WithBottomNavLayout;
