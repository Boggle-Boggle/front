import { Header } from 'components/Header';

export const NoteDetailSkeleton = () => {
  return (
    <>
      <Header title="" withBack />

      <div className="flex h-full flex-col px-mobile">
        <div className="skeleton mb-3 mt-5 h-6 w-48" />
        <div className="flex flex-col gap-2">
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-11/12" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-4/5" />
          <div className="skeleton h-4 w-10/12" />
        </div>
        <div className="skeleton mt-4 h-3 w-32" />
      </div>
    </>
  );
};
