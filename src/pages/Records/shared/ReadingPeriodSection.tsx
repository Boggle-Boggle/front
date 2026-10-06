import { formatToShortDotDate } from 'utils/date';

import type { AddRecordStatus } from 'types';

import { ReadingPeriodButton } from './ReadingPeriodButton';
import { SectionTitle } from './SectionTitle';

type ReadingPeriodSectionProps = {
  startDate: string;
  endDate: string;
  status?: AddRecordStatus;
  onOpenStartDate: () => void;
  onOpenEndDate: () => void;
  isEdit?: boolean;
};

const MSG_ADD_RECORD_PERIOD_TITLE = '독서 기간';
const MSG_ADD_RECORD_START_DATE = '시작일';
const MSG_ADD_RECORD_END_DATE = '완료일';
const MSG_ADD_RECORD_DROPPED_DATE = '중단일';

export const ReadingPeriodSection = (props: ReadingPeriodSectionProps) => {
  const { startDate, endDate, status = 'COMPLETED', onOpenStartDate, onOpenEndDate, isEdit } = props;

  const isReading = status === 'READING';
  const endDateLabel = status === 'DROPPED' ? MSG_ADD_RECORD_DROPPED_DATE : MSG_ADD_RECORD_END_DATE;

  return (
    <section className="w-full" data-isedit={isEdit}>
      <SectionTitle title={MSG_ADD_RECORD_PERIOD_TITLE} />
      <div className="flex items-center justify-center gap-4">
        <ReadingPeriodButton
          label={MSG_ADD_RECORD_START_DATE}
          value={formatToShortDotDate(startDate)}
          isActive={isEdit && Boolean(startDate)}
          disabled={!isEdit}
          onClick={onOpenStartDate}
        />
        ~
        <ReadingPeriodButton
          label={endDateLabel}
          value={isReading ? '읽는 중' : formatToShortDotDate(endDate)}
          isActive={isEdit && !isReading && Boolean(endDate)}
          disabled={!isEdit}
          onClick={isReading ? () => {} : onOpenEndDate}
        />
      </div>
    </section>
  );
};
