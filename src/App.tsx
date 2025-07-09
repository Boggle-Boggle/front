import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      {/* 전역 컨테이너 추가 */}
      <Outlet />
    </>
  );
};

export default App;
