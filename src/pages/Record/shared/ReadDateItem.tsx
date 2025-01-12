import { useEffect, useState } from 'react';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';

import { Note } from 'types/record';

import NoteItem from './NoteItem';

type ReadDateItemProps = {
  startDate: string;
  endDate: string;
  notes: Note[];
  idx: number;
};

const ReadDateItem = ({ notes, startDate, endDate, idx }: ReadDateItemProps) => {
  const [isToggled, setIsToggled] = useState<boolean>(false);

  useEffect(() => {
    if (notes.length > 0) setIsToggled(true);
  }, [notes]);

  return (
    <section className="bg-white">
      <button
        className="flex w-full justify-between border-b-4 border-main px-4 py-[0.875rem]"
        onClick={() => setIsToggled(!isToggled)}
        type="button"
        aria-label={isToggled ? '도서 정보 자세히 보기' : '도서 정보 간략히 보기'}
      >
        <p className="font-bold">
          {idx === 0 ? '회독정보없음' : `${idx}회독`}
          {idx > 0 && <span className="ml-1 font-normal opacity-50">{`${startDate}~${endDate}`}</span>}
        </p>
        {isToggled ? (
          <GoChevronUp style={{ width: '20px', height: '20px' }} />
        ) : (
          <GoChevronDown style={{ width: '20px', height: '20px' }} />
        )}
      </button>

      <section className={`grid ${isToggled ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} transition-all duration-200`}>
        <div className="overflow-hidden">
          {notes.length > 0 ? (
            notes.map((note) => <NoteItem note={note} readDateIndex={idx} />)
          ) : (
            <div className="= flex h-20 items-center justify-center border-b-4 border-main">
              <p className="text-sm opacity-50">작성된 독서노트 없음</p>
            </div>
          )}
        </div>
      </section>
    </section>
  );
};

export default ReadDateItem;
