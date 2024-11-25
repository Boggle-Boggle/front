import Header from 'components/ui/Header';

import BookCase from './BookCase';

const Home = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#CBBAB9]">
      <Header />
      <BookCase />
    </div>
  );
};

export default Home;
