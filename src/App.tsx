import { Outlet } from 'react-router-dom';

import ToastContainer from 'components/refactor/Toast/ToastContainer';

const App = () => {
  return (
    <div className="flex h-dvh flex-col bg-neutral-0">
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default App;
