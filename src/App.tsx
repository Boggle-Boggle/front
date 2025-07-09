import { Outlet } from 'react-router-dom';

import ToastContainer from 'components/refactor/Toast/ToastContainer';

const App = () => {
  return (
    <>
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default App;
