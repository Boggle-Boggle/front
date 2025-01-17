import { Outlet } from 'react-router-dom';

import BottomNavigator from 'components/BottomNavigator';

const App = () => {
  return (
    <>
      <Outlet />
      <BottomNavigator />
    </>
  );
};

export default App;
