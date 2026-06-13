import { Outlet } from 'react-router-dom';

const WithoutBottomNavLayout = () => {
  return (
    <section className="flex h-dvh w-full flex-col overflow-hidden">
      <Outlet />
    </section>
  );
};

export default WithoutBottomNavLayout;
