import { useNavigate } from 'react-router-dom';

import { formatDateTimeToDate } from 'utils/format';

import { LibraryBook } from 'types/library';

type ListLayoutProps = {
  allBooks: LibraryBook[];
};

const ListLayout = ({ allBooks }: ListLayoutProps) => {
  const navigate = useNavigate();

  return (
    <section className="p-4">
      {allBooks &&
        allBooks.map(({ readingRecordId, imageUrl, title, rating, recentReadDate, readingCount }) => {
          const startDate = recentReadDate && formatDateTimeToDate(recentReadDate.startReadDate);
          const endDate = recentReadDate?.endReadDate && formatDateTimeToDate(recentReadDate.endReadDate);
          const readDate = !recentReadDate
            ? '아직 읽기 전이에요'
            : recentReadDate.endReadDate
              ? `${startDate} ~ ${endDate}`
              : `${startDate} ~ 읽는중`;

          return (
            <li
              className="relative mb-9 h-28 w-full rounded-[0.4375rem] bg-white shadow-[1px_1px_4px_0_rgba(0,0,0,0.1)]"
              key={readingRecordId}
            >
              <button className="h-full w-full" type="button" onClick={() => navigate(`/record/${readingRecordId}`)}>
                <img
                  src={imageUrl}
                  alt={`${title} 북커버`}
                  className="absolute bottom-0 left-5 h-32 w-[5.7rem] shadow-[3px_0px_4px_0_rgba(0,0,0,0.25)]"
                />
                <span className="absolute bottom-0 left-6 block h-32 w-[0.0625rem] bg-black opacity-50 blur-[2px]" />
                <div className="ml-32 flex h-full flex-col items-start justify-between py-[0.6rem]">
                  <img
                    src={`${import.meta.env.VITE_IMG_BASE_URL || ''}/assets/stars.png`}
                    alt={`${rating}점`}
                    className="w-[5.5rem]"
                  />
                  <p className="line-clamp-2 justify-center pr-2 text-start font-semibold leading-6">{title}</p>

                  <p className="text-[0.8125rem] opacity-50">{readDate}</p>
                </div>
              </button>
              {readingCount > 0 && (
                <span className="absolute right-[0.5rem] top-[0.6rem] flex h-4 w-10 items-center rounded-2xl border px-2 py-[0.125rem] text-[0.575rem] text-sub">
                  {readingCount}회독
                </span>
              )}
            </li>
          );
        })}
    </section>
  );
};

export default ListLayout;
