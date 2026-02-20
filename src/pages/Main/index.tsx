import { BookCase } from 'components/BookCase';
import { Searchbar } from 'components/Searchbar';

const MSG_TITLE_SEARCH_PLACEHOLDER = '책 제목을 입력해주세요';
const Main = () => {
  return (
    <div className="relative h-dvh overflow-scroll bg-secondary pt-safe-top">
      <div className="relative z-10 h-full px-mobile">
        <Searchbar value="" onChange={() => {}} onSubmit={() => {}} placeholder={MSG_TITLE_SEARCH_PLACEHOLDER} />
        <p className="mt-4 text-title1">2025년 전체 책장</p>
        <p className="mb-[1.375rem] text-body1 text-neutral-60">45권 채웠습니다</p>
        <BookCase />
      </div>

      <div className="absolute inset-0 bg-neutral-0 mix-blend-soft-light" />
      <div className="absolute bottom-0 h-48 w-full bg-[linear-gradient(180deg,_#A6D68E_0%,_rgba(255,255,255,0)_100%)]" />
    </div>
  );
};

export default Main;
