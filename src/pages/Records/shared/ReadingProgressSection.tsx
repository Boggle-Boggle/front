import { ChangeEvent } from 'react';

import { Input } from 'components/Input';

import { SectionTitle } from './SectionTitle';

export type ReadingProgressType = 'PAGE' | 'PERCENTAGE';

interface ReadingProgressSectionProps {
  progressType: ReadingProgressType;
  progressValue: string;
  totalPageCount: string;
  onChangeProgressType: (progressType: ReadingProgressType) => void;
  onChangeProgressValue: (progressValue: string) => void;
  onOpenPageInfo: () => void;
}

const MSG_ADD_RECORD_PROGRESS_TITLE = '지금까지 읽은 독서량';
const MSG_ADD_RECORD_PAGE_EDIT = '총 페이지 수 추가/수정하기';
const MSG_ADD_RECORD_TOTAL_PAGE = (totalPageCount: string) => `총 ${totalPageCount}쪽 중에서`;
const MSG_ADD_RECORD_TOTAL_PERCENTAGE = (totalPercentage: number) => `총 ${totalPercentage}% 중에서`;
const MSG_ADD_RECORD_PROGRESS_PLACEHOLDER = (unit: string) => `0${unit} 읽었어요`;
const MSG_ADD_RECORD_PAGE_SEGMENT = '쪽';
const MSG_ADD_RECORD_PERCENTAGE_SEGMENT = '%';
const MIN_PROGRESS_VALUE = 0;
const MAX_PERCENTAGE_VALUE = 100;

export const ReadingProgressSection = (props: ReadingProgressSectionProps) => {
  const { progressType, progressValue, totalPageCount, onChangeProgressType, onChangeProgressValue, onOpenPageInfo } =
    props;

  const isPageType = progressType === 'PAGE';
  const progressUnit = isPageType ? MSG_ADD_RECORD_PAGE_SEGMENT : MSG_ADD_RECORD_PERCENTAGE_SEGMENT;
  const totalProgressText = isPageType
    ? MSG_ADD_RECORD_TOTAL_PAGE(totalPageCount)
    : MSG_ADD_RECORD_TOTAL_PERCENTAGE(MAX_PERCENTAGE_VALUE);
  const maxProgressValue = isPageType && totalPageCount ? Number(totalPageCount) : MAX_PERCENTAGE_VALUE;
  const progressPlaceholder = MSG_ADD_RECORD_PROGRESS_PLACEHOLDER(progressUnit);

  const handleSelectPageType = () => onChangeProgressType('PAGE');

  const handleSelectPercentageType = () => onChangeProgressType('PERCENTAGE');

  const handleProgressValueChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChangeProgressValue(event.target.value);
  };

  const handleClearProgressValue = () => onChangeProgressValue('');

  return (
    <section className="w-full">
      <div className="flex items-center justify-between">
        <SectionTitle title={MSG_ADD_RECORD_PROGRESS_TITLE} />
        {/* TODO: 변경 필요 ? */}
        <div className="flex h-7 overflow-hidden rounded border border-primary">
          <button
            type="button"
            onClick={handleSelectPageType}
            className={`px-4 text-title4 ${isPageType ? 'bg-primary text-neutral-0' : 'bg-neutral-0 text-neutral-60'}`}
          >
            {MSG_ADD_RECORD_PAGE_SEGMENT}
          </button>
          <button
            type="button"
            aria-pressed={!isPageType}
            onClick={handleSelectPercentageType}
            className={`px-2 text-title4 ${isPageType ? 'bg-neutral-0 text-neutral-60' : 'bg-primary text-neutral-0'}`}
          >
            {MSG_ADD_RECORD_PERCENTAGE_SEGMENT}
          </button>
        </div>
      </div>

      <p className="pb-1 pt-3 text-caption2 text-neutral-60">{totalProgressText}</p>
      <Input
        value={progressValue}
        onChange={handleProgressValueChange}
        onClear={handleClearProgressValue}
        type="number"
        min={MIN_PROGRESS_VALUE}
        max={maxProgressValue}
        placeholder={progressPlaceholder}
        variant="primary"
      />

      {isPageType ? (
        <button
          type="button"
          onClick={onOpenPageInfo}
          className="w-full pt-3 text-right text-caption1 text-information"
        >
          {MSG_ADD_RECORD_PAGE_EDIT}
        </button>
      ) : (
        <div className="h-8" />
      )}
    </section>
  );
};
