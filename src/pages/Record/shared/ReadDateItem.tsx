import { useReducer } from 'react';
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
  const [isToggled, handleToggle] = useReducer((prev) => !prev, true);

  return (
    <>
      <button
        className="flex w-full justify-between border-b-4 border-main px-4 py-[0.875rem]"
        onClick={handleToggle}
        type="button"
        aria-label={isToggled ? '도서 정보 자세히 보기' : '도서 정보 간략히 보기'}
      >
        <p className="font-bold">
          {idx}회독
          {idx > 0 && <span className="ml-1 font-normal opacity-50">{`${startDate}~${endDate}`}</span>}
        </p>
        {isToggled ? (
          <GoChevronUp style={{ width: '20px', height: '20px' }} />
        ) : (
          <GoChevronDown style={{ width: '20px', height: '20px' }} />
        )}
      </button>
      {isToggled && notes.map((note) => <NoteItem note={note} readDateIndex={idx} />)}
    </>
  );
};

export default ReadDateItem;
