import { FiPlus } from 'react-icons/fi';
import { LuPencil } from 'react-icons/lu';

import CheckBox from 'components/CheckBox';

const ReadingDate = () => {
  const dates = [1, 2, 3, 4];
  return (
    <div className="border-t-[3px] border-main">
      <p className="relative flex h-14 items-center justify-between px-6 font-semibold">
        독서기간
        <button className="text-xs font-normal opacity-50" type="button" aria-label="독서기간 추가">
          <FiPlus style={{ width: '24px', height: '24px' }} />
        </button>
      </p>
      <ul>
        {dates.map(() => (
          <li className="relative flex h-14 w-full items-center border-t-[1px] border-main px-6">
            <CheckBox color="red" type="minus" />
            <p className="px-[0.376rem] text-sm font-semibold">1회독</p>
            <span className="rounded-3xl border border-accent px-1 text-xs text-accent">완독서</span>
            <div className="absolute right-6 flex items-center text-sm opacity-50">
              2024.07.15 - 2024.08.19
              <LuPencil style={{ marginLeft: '3px' }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReadingDate;
