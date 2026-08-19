import { Outlet } from 'react-router-dom';

import BottomNavigator from './BottomNavigator';

const WithBottomNavLayout = () => {
  return (
    <section className="flex h-dvh w-full flex-col overflow-hidden">
      <div className="min-h-0 w-full flex-1 overflow-hidden">
        <Outlet />
      </div>
      <BottomNavigator />
    </section>
  );
};

export default WithBottomNavLayout;
