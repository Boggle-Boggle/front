import { Outlet } from 'react-router-dom';

import BottomNavigator from 'components/ui/BottomNavigator';

const App = () => {
  return (
    <>
      <Outlet />
      <BottomNavigator />
    </>
  );
};

export default App;
