import { ReadingPeriodButton } from './ReadingPeriodButton';
import { SectionTitle } from './SectionTitle';

type ReadingPeriodSectionProps = {
  onOpenStartDate: () => void;
  onOpenEndDate: () => void;
};

const MSG_ADD_RECORD_PERIOD_TITLE = '독서 기간';
const MSG_ADD_RECORD_START_DATE = '시작일';
const MSG_ADD_RECORD_END_DATE = '완료일';
const MSG_ADD_RECORD_READING_NOW = '읽는 중';
const MSG_ADD_RECORD_EMPTY_DATE = '00.00.00';

export const ReadingPeriodSection = (props: ReadingPeriodSectionProps) => {
  const { onOpenStartDate, onOpenEndDate } = props;

  return (
    <section className="w-full">
      <SectionTitle title={MSG_ADD_RECORD_PERIOD_TITLE} />
      <div className="flex items-center justify-center gap-4">
        {/* TODO Dialog 연결 */}
        <ReadingPeriodButton
          label={MSG_ADD_RECORD_START_DATE}
          value={MSG_ADD_RECORD_EMPTY_DATE}
          isActive
          onClick={onOpenStartDate}
        />
        ~
        <ReadingPeriodButton
          label={MSG_ADD_RECORD_END_DATE}
          value={MSG_ADD_RECORD_READING_NOW}
          onClick={onOpenEndDate}
        />
      </div>
    </section>
  );
};
