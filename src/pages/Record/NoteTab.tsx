import { useReducer } from 'react';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';

import NoteItem from './shared/NoteItem';

const a = [1, 2, 3, 4];
const b = [1, 2, 3];

const NoteTab = () => {
  const [isToggled, handleToggle] = useReducer((prev) => !prev, true);

  return a.map((it) => (
    <>
      <div className="flex justify-between border-b-4 border-main px-4 py-[0.875rem]">
        <p className="font-bold">
          {it}회독
          <span className="ml-1 font-normal opacity-50">(2023.12.22~2024.01.01)</span>
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
      {isToggled && b.map(() => <NoteItem />)}
    </>
  ));
};

export default NoteTab;
