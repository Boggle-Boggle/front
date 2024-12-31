import { useQuery } from '@tanstack/react-query';

import { useReducer } from 'react';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';

import Loading from 'pages/Loading';

import { getNote } from 'services/record';
import { formatDateTimeToDate } from 'utils/format';

import NoteItem from './shared/NoteItem';

type NoteTabProps = {
  recordId: string;
};

const NoteTab = ({ recordId }: NoteTabProps) => {
  const [isToggled, handleToggle] = useReducer((prev) => !prev, false);
  const { data, isLoading } = useQuery({
    queryKey: ['note', recordId],
    queryFn: () => getNote(recordId!),
  });

  if (isLoading) return <Loading />;

  return (
    data !== undefined &&
    data.map(({ readDate, notes }, idx) => {
      const startDate = readDate.startReadDate && formatDateTimeToDate(readDate.startReadDate);
      const endDate = readDate.endReadDate ? formatDateTimeToDate(readDate.endReadDate) : '독서중';

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
          {isToggled && notes.map((note) => <NoteItem note={note} />)}
        </>
      );
    })
  );
};

export default NoteTab;
