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
  const [isToggled, handleToggle] = useReducer((prev) => !prev, false);

  return (
    <>
      <div className="flex justify-between border-b-4 border-main px-4 py-[0.875rem]">
        <p className="font-bold">
          {idx}회독
          {idx > 0 && <span className="ml-1 font-normal opacity-50">{`${startDate}~${endDate}`}</span>}
        </p>
        {isToggled ? (
          <button onClick={handleToggle} aria-label="도서 정보 자세히 보기" type="button">
            <GoChevronUp style={{ width: '20px', height: '20px' }} />
          </button>
        ) : (
          <button onClick={handleToggle} aria-label="도서 정보 간략히 보기" type="button">
            <GoChevronDown style={{ width: '20px', height: '20px' }} />
          </button>
        )}
      </div>
      {isToggled && notes.map((note) => <NoteItem note={note} readDateIndex={idx} />)}
    </>
  );
};

export default ReadDateItem;
