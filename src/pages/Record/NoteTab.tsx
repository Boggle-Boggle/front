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

  if (isLoading) return <Loading />;

  return (
    data !== undefined &&
    data.map(({ readDate, notes }, idx) => {
      const startDate = (readDate.startReadDate && formatDateTimeToDate(readDate.startReadDate)) ?? '';
      const endDate = readDate.endReadDate ? formatDateTimeToDate(readDate.endReadDate) : '독서중';

      if (idx === 0 && notes.length === 0) return;

      return <ReadDateItem startDate={startDate} endDate={endDate} notes={notes} idx={idx} />;
    })
  );
};

export default NoteTab;
