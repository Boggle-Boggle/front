import { BottomButton } from 'components/Button';
import { Header } from 'components/Header';

const MSG_BOOK_DETAIL_ADD_RECORD = '독서 기록 추가하기';

const handleDisabledButtonClick = () => undefined;

export const BookDetailSkeleton = () => {
  return (
    <>
      <Header withBack />

      <div className="flex h-full w-full animate-pulse flex-col overflow-y-auto px-mobile pb-safe-bottom">
        <section className="flex flex-col items-center py-5">
          <div className="h-[10.5rem] w-28 rounded bg-neutral-20" />
          <div className="mt-4 h-6 w-52 rounded bg-neutral-20" />
          <div className="mt-2 h-5 w-28 rounded bg-neutral-20" />
        </section>

        <div className="mt-2 flex h-12 gap-4">
          <div className="h-full flex-1 rounded bg-neutral-20" />
          <div className="h-full flex-1 rounded bg-neutral-20" />
        </div>

        <section className="mt-6 flex flex-col gap-3">
          <div className="h-5 w-24 rounded bg-neutral-20" />
          <div className="h-4 w-full rounded bg-neutral-20" />
          <div className="h-4 w-11/12 rounded bg-neutral-20" />
          <div className="h-4 w-4/5 rounded bg-neutral-20" />
        </section>

        <BottomButton onClick={handleDisabledButtonClick} disabled>
          {MSG_BOOK_DETAIL_ADD_RECORD}
        </BottomButton>
      </div>
    </>
  );
};
