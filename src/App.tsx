import { Outlet } from 'react-router-dom';

import LayerContainer from 'components/refactor/Layer/LayerContainer';
import ToastContainer from 'components/refactor/Toast/ToastContainer';

const App = () => {
  return (
    <div className="flex h-dvh flex-col bg-neutral-0">
      <Outlet />
      <LayerContainer />
      <ToastContainer />
    </div>
  );
};

export default App;
