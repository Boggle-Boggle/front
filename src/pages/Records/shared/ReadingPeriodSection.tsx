import { ReadingPeriodButton } from './ReadingPeriodButton';
import { SectionTitle } from './SectionTitle';

type ReadingPeriodSectionProps = {
  startDate: string;
  endDate: string;
  onOpenStartDate: () => void;
  onOpenEndDate: () => void;
};

const MSG_ADD_RECORD_PERIOD_TITLE = '독서 기간';
const MSG_ADD_RECORD_START_DATE = '시작일';
const MSG_ADD_RECORD_END_DATE = '완료일';
const MSG_ADD_RECORD_EMPTY_DATE = '00.00.00';

const formatDateLabel = (dateString: string) => {
  if (!dateString) return MSG_ADD_RECORD_EMPTY_DATE;
  const datePart = dateString.split('T')[0];
  const [year, month, day] = datePart.split('-');
  if (!year || !month || !day) return MSG_ADD_RECORD_EMPTY_DATE;
  return `${year.slice(-2)}.${month}.${day}`;
};

export const ReadingPeriodSection = (props: ReadingPeriodSectionProps) => {
  const { startDate, endDate, onOpenStartDate, onOpenEndDate } = props;

  return (
    <section className="w-full">
      <SectionTitle title={MSG_ADD_RECORD_PERIOD_TITLE} />
      <div className="flex items-center justify-center gap-4">
        <ReadingPeriodButton
          label={MSG_ADD_RECORD_START_DATE}
          value={formatDateLabel(startDate)}
          isActive={Boolean(startDate)}
          onClick={onOpenStartDate}
        />
        ~
        <ReadingPeriodButton
          label={MSG_ADD_RECORD_END_DATE}
          value={formatDateLabel(endDate)}
          isActive={Boolean(endDate)}
          onClick={onOpenEndDate}
        />
      </div>
    </section>
  );
};
