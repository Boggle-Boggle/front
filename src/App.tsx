import { Outlet } from 'react-router-dom';

import BottomNavigator from 'components/ui/BottomNavigator';

const App = () => {
  return (
    <div>
      <div>헤더</div>
      <Outlet />
      <BottomNavigator />
    </div>
  );
};

export default App;
