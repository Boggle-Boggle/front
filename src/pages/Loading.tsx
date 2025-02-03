import SpinnerImg from 'assets/Spinner.gif';

const Loading = () => {
  return (
    <section className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
      <img src={SpinnerImg} alt="로딩중" className="w-14" />
    </section>
  );
};

export default Loading;
