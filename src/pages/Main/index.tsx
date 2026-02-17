import { BookCase } from 'components/BookCase';
import Header from 'components/Header';

const Main = () => {
  return (
    <>
      <Header withSpacer={false} title="타이틀" rightBtn={<button aria-label="기간선택" type="button" />} />
      <div className="flex h-dvh flex-col items-center justify-center overflow-scroll">
        <BookCase />
      </div>
    </>
  );
};

export default Main;
