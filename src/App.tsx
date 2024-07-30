import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <div>헤더</div>
      <Outlet />
      <div>푸터</div>
    </>
  );
};

export default App;
