import { Outlet } from 'react-router-dom';

import BottomNavigator from 'components/ui/BottomNavigator';

const App = () => {
  return (
    <div>
      <Outlet />
      <BottomNavigator />
    </div>
  );
};

export default App;
