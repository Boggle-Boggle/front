import { Loading as CommonLoading } from 'components/Loading';

const Loading = () => {
  return (
    <section className="flex h-dvh w-full items-center justify-center bg-primary">
      <CommonLoading className="h-40 w-40" color="#8bcfa7" />
    </section>
  );
};

export default Loading;
