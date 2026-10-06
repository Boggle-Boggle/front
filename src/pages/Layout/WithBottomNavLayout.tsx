import { Outlet } from 'react-router-dom';

import BottomNavigator from './BottomNavigator';

const WithBottomNavLayout = () => {
  return (
    <section className="relative flex h-dvh w-full flex-col overflow-hidden">
      <div className="min-h-0 w-full flex-1 overflow-hidden">
        <Outlet />
      </div>
      <div className="absolute bottom-0 left-0 z-navigator flex w-full justify-center">
        <BottomNavigator />
      </div>
    </section>
  );
};

export default WithBottomNavLayout;
