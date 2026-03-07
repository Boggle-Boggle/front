import { Outlet } from 'react-router-dom';

import BottomNavigator from './BottomNavigator';

const WithBottomNavLayout = () => {
  return (
    <section className="h-dvh w-full">
      <Outlet />
      <div className="h-safe-bottom" />
      <BottomNavigator />
    </section>
  );
};

export default WithBottomNavLayout;
