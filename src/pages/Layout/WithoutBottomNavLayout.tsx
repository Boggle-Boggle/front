import { Outlet } from 'react-router-dom';

const WithoutBottomNavLayout = () => {
  return (
    <section className="h-dvh w-full overflow-scroll">
      <Outlet />
    </section>
  );
};

export default WithoutBottomNavLayout;
