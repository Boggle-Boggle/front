import { Outlet } from 'react-router-dom';

import BottomNavigator from 'components/BottomNavigator';

const App = () => {
  return (
    <section className="relative h-full w-full overflow-scroll">
      <Outlet />
      <BottomNavigator />
    </section>
  );
};

export default App;
