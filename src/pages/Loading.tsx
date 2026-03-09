import { Loading as CommonLoading } from 'components/Loading';

const Loading = () => {
  return (
    <section className="relative h-dvh w-full bg-primary">
      <CommonLoading fullscreen />
    </section>
  );
};

export default Loading;
