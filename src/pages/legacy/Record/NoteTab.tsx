import { useQuery } from '@tanstack/react-query';

import Loading from 'pages/Loading';

import { getNote } from 'services/record';
import { formatDateTimeToDate } from 'utils/format';

import ReadDateItem from './shared/ReadDateItem';

type NoteTabProps = {
  recordId: string;
};

const NoteTab = ({ recordId }: NoteTabProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ['note', recordId],
    queryFn: () => getNote(recordId!),
  });

  if (isLoading || data === undefined) return <Loading />;

  const totalNoteCount = data.reduce((pre, cur) => pre + cur.notes.length, 0);

  if (totalNoteCount === 0)
    return (
      <div className="flex h-32 flex-col items-center justify-center bg-white">
        <p className="font-bold">등록된 독서노트가 없어요</p>
        <p className="pb-4 pt-2 text-xs opacity-50">아래의 아이콘을 눌러 독서노트를 작성해보세요</p>
      </div>
    );

  return data.map(({ readDate, notes }, idx) => {
    const startDate = (readDate.startReadDate && formatDateTimeToDate(readDate.startReadDate)) ?? '';
    const endDate = readDate.endReadDate ? formatDateTimeToDate(readDate.endReadDate) : '읽는중';

    if (idx === 0 && notes.length === 0) return;

    return <ReadDateItem startDate={startDate} endDate={endDate} notes={notes} idx={idx} />;
  });
};

export default NoteTab;
