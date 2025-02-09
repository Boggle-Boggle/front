import CheckBox from 'components/CheckBox';
import Icon from 'components/Icon';

import useModal from 'hooks/useModal';
import { formatDateTimeToDate } from 'utils/format';

import { STATUS } from 'types/library';
import { RecordDate, StatusType } from 'types/record';

import { CommonPlus, CommonPencil } from 'assets/icons';

import EditReadingDateModal from './EditReadingDateModal';

type EditReadingDatePros = {
  readDates: (RecordDate & { status: StatusType })[];
  setReadDates: React.Dispatch<React.SetStateAction<(RecordDate & { status: StatusType })[]>>;
};

const EditReadingDate = ({ readDates, setReadDates }: EditReadingDatePros) => {
  const { isOpen, close, open } = useModal();

  const handleDeleteDate = async (deleteIdx: number) => {
    const newReadDates = readDates.filter((_, idx) => deleteIdx !== idx);
    setReadDates(newReadDates);
  };

  return (
    <>
      <div className="border-t-[3px] border-main">
        <p className="relative flex h-14 items-center justify-between px-6 font-semibold">
          독서기간
          <button className="text-xs font-normal opacity-50" type="button" aria-label="독서기간 추가" onClick={open}>
            <Icon Component={CommonPlus} size="sm" />
          </button>
        </p>
        <ul>
          {readDates.map(({ readDateId, startReadDate, endReadDate, status }, idx) => {
            const startDate = startReadDate && formatDateTimeToDate(startReadDate);
            const endDate = endReadDate && formatDateTimeToDate(endReadDate);

            return (
              <li className="relative flex h-14 w-full items-center border-t-[1px] border-main px-6" key={readDateId}>
                <button type="button" aria-label="회독 삭제" onClick={() => handleDeleteDate(idx)}>
                  <CheckBox color="red" type="minus" />
                </button>
                <p className="px-[0.376rem] text-sm font-semibold">{idx + 1}회독</p>
                <span className="rounded-3xl border border-accent px-1 py-[2px] text-xs text-accent">
                  {STATUS[status]}
                </span>
                <div className="absolute right-6 flex items-center text-sm opacity-50">
                  {`${startDate} - ${endDate ?? '읽는중'}`}
                  <Icon Component={CommonPencil} size="xs" style={{ marginLeft: '3px' }} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {isOpen && <EditReadingDateModal setReadDates={setReadDates} readDates={readDates} close={close} />}
    </>
  );
};

export default EditReadingDate;
