import { Outlet } from 'react-router-dom';

import BottomNavigator from './BottomNavigator';

const WithBottomNavLayout = () => {
  return (
    <section className="h-dvh w-full overflow-hidden pb-[calc(env(safe-area-inset-bottom)+60px)]">
      <Outlet />
      <BottomNavigator />
    </section>
  );
};

export default WithBottomNavLayout;
