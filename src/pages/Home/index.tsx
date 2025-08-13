import Header from 'components/Header';

import BookCase from './BookCase';

const Home = () => {
  return (
    <>
      <Header withSpacer={false} title="타이틀" rightBtn={<button aria-label="기간선택" type="button" />} />
      <div className="flex h-dvh flex-col items-center justify-center overflow-scroll">
        <BookCase />
      </div>
    </>
  );
};

export default Home;
