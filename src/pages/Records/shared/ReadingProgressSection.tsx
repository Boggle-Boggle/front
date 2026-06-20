import { Switch } from 'components/Switch';

import { SectionTitle } from './SectionTitle';
import { AddRecordStatus } from './recordStatus';

type ReadingProgressSectionProps = {
  status: AddRecordStatus;
  onOpenPageInfo: () => void;
};

const MSG_ADD_RECORD_PROGRESS_TITLE = '지금까지 읽은 독서량 (p)';
const MSG_ADD_RECORD_PAGE_EDIT = '총 페이지 수 추가/수정하기';

export const ReadingProgressSection = (props: ReadingProgressSectionProps) => {
  const { status, onOpenPageInfo } = props;

  return (
    <section className="w-full">
      <div className="flex items-center justify-between">
        <SectionTitle title={MSG_ADD_RECORD_PROGRESS_TITLE} />
        <Switch onChange={() => {}} />
      </div>

      <div>{status}</div>

      <button type="button" onClick={onOpenPageInfo} className="text-caption1 underline">
        {MSG_ADD_RECORD_PAGE_EDIT}
      </button>
    </section>
  );
};
