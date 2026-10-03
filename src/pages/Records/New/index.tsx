import { useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';

import { BottomButton } from 'components/Button';
import { Header } from 'components/Header';

import { getTodayDateString } from 'utils/date';

import type { AddRecordStatus, BookDetail, CustomBookDto, ReadingLogProgressType } from 'types';

import { useBookshelvesQuery } from './queries/useBookshelvesQuery';
import { useCreateCustomReadingLogMutation } from './queries/useCreateCustomReadingLogMutation';
import { useCreateReadingLogMutation } from './queries/useCreateReadingLogMutation';
import { DateSelectModal } from '../shared/DateSelectModal';
import { GroupDeleteConfirmModal } from '../shared/GroupDeleteConfirmModal';
import { GroupEditModal } from '../shared/GroupEditModal';
import { GroupSection } from '../shared/GroupSection';
import { PageInfoModal } from '../shared/PageInfoModal';
import { RatingSection } from '../shared/RatingSection';
import { ReadingPeriodSection } from '../shared/ReadingPeriodSection';
import { ReadingProgressSection } from '../shared/ReadingProgressSection';
import { VisibilitySection } from '../shared/VisibilitySection';
import type { BookshelfItem } from '../shared/api';
import { getAddRecordStatus } from '../shared/recordStatus';

const MSG_ADD_RECORD_SUBMIT = '입력을 끝내고 완료하기';
const MSG_DATE_SELECT_START = '시작일 선택하기';
const MSG_DATE_SELECT_END = '종료일 선택하기';

const requiresEndDate = (status: AddRecordStatus) => status !== 'READING';

const getAddRecordDatePayload = (status: AddRecordStatus, startDate: string, endDate: string) => ({
  startDate,
  endDate: requiresEndDate(status) ? endDate : undefined,
});

export const NewRecord = () => {
  const [rating, setRating] = useState<number>(0);
  const [selectedBookshelfIds, setSelectedBookshelfIds] = useState<number[]>([]);
  const [progressType, setProgressType] = useState<ReadingLogProgressType>('PAGE');
  const [progressValue, setProgressValue] = useState<string>('');
  const [totalPageCountOverride, setTotalPageCountOverride] = useState<string>('');
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>(getTodayDateString);
  const [endDate, setEndDate] = useState<string>(getTodayDateString);

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { push, pop } = useLayerStore();

  const customBook = location.state?.customBook as CustomBookDto | undefined;
  const customStatus = location.state?.status as AddRecordStatus | undefined;
  const bookDetail = location.state?.bookDetail as BookDetail | undefined;
  const status = customStatus || getAddRecordStatus(searchParams.get('status'));
  const isCompletedStatus = status === 'COMPLETED';

  const { data: bookshelves = [] } = useBookshelvesQuery();
  const { isPending: isCreateCustomReadingLogPending, mutate: saveCustomReadingLog } =
    useCreateCustomReadingLogMutation();
  const { isPending: isCreateReadingLogPending, mutate: saveReadingLog } = useCreateReadingLogMutation();

  const totalPageCount =
    totalPageCountOverride || customBook?.totalPages?.toString() || bookDetail?.totalPages?.toString() || '';
  const completedProgressValue = progressType === 'PAGE' ? totalPageCount : '100';
  const resolvedProgressValue = isCompletedStatus ? completedProgressValue : progressValue;

  const handleSubmit = () => {
    // 중복 요청 방지
    if (isCreateCustomReadingLogPending || isCreateReadingLogPending) return;

    if (customBook) {
      // [분기 A] 사용자가 직접 입력(수동)한 도서 정보를 짊어지고 진입한 경우
      saveCustomReadingLog({
        book: {
          ...customBook,
          totalPages: totalPageCount ? Number(totalPageCount) : undefined,
        },
        readingLog: {
          status,
          rating,
          ...getAddRecordDatePayload(status, startDate, endDate),
          bookshelfIds: selectedBookshelfIds,
          isHidden,
          // 값이 기입되어 있을 때만 안전하게 인라인 변환 전송 (비어 있으면 undefined 로 가드해 전송 누락)
          progressType: resolvedProgressValue ? progressType : undefined,
          progressValue: resolvedProgressValue ? Number(resolvedProgressValue) : undefined,
        },
      });

      return;
    }

    if (!bookDetail) return;

    // [분기 B] 일반 검색(알라딘) 연동 도서 정보로 진입하여 기록을 추가하는 경우
    saveReadingLog({
      isbn13: bookDetail.isbn13,
      mediaType: bookDetail.mediaType,
      status,
      rating,
      ...getAddRecordDatePayload(status, startDate, endDate),
      bookshelfIds: selectedBookshelfIds,
      isHidden,
      // 값이 기입되어 있을 때만 안전하게 인라인 변환 전송 (비어 있으면 undefined 로 가드해 전송 누락)
      progressType: resolvedProgressValue ? progressType : undefined,
      progressValue: resolvedProgressValue ? Number(resolvedProgressValue) : undefined,
      totalPagesOverride: totalPageCountOverride ? Number(totalPageCountOverride) : undefined,
    });
  };

  const handleToggleBookshelf = (bookshelfId: number) =>
    setSelectedBookshelfIds((prev) =>
      prev.includes(bookshelfId) ? prev.filter((item) => item !== bookshelfId) : [...prev, bookshelfId],
    );

  const handleDeleteBookshelfSuccess = (bookshelfId: number) =>
    setSelectedBookshelfIds((prev) => prev.filter((item) => item !== bookshelfId));

  const handleTogglePrivate = () => setIsHidden((prev) => !prev);

  const handleOpenStartDate = () => {
    push({
      id: 'book-record-start-date-modal',
      component: (
        <DateSelectModal
          title={MSG_DATE_SELECT_START}
          initialDate={startDate}
          maxDate={getTodayDateString()}
          onSubmit={setStartDate}
          onClose={pop}
        />
      ),
    });
  };

  const handleOpenEndDate = () => {
    push({
      id: 'book-record-end-date-modal',
      component: (
        <DateSelectModal
          title={MSG_DATE_SELECT_END}
          initialDate={endDate}
          minDate={startDate}
          maxDate={getTodayDateString()}
          onSubmit={setEndDate}
          onClose={pop}
        />
      ),
    });
  };

  const handleOpenDeleteGroupModal = (bookshelf: BookshelfItem) => {
    push({
      id: 'book-record-group-delete-modal',
      component: (
        <GroupDeleteConfirmModal bookshelf={bookshelf} onClose={pop} onDeleted={handleDeleteBookshelfSuccess} />
      ),
    });
  };

  const handleOpenGroupEdit = () => {
    push({
      id: 'book-record-group-edit-modal',
      component: <GroupEditModal onClose={pop} onDeleteGroup={handleOpenDeleteGroupModal} />,
    });
  };

  const handleOpenPageInfo = () => {
    push({
      id: 'book-record-page-info-modal',
      component: <PageInfoModal initialValue={totalPageCount} onClose={pop} onSubmit={setTotalPageCountOverride} />,
    });
  };

  return (
    <div className="flex h-full flex-col">
      <Header withBack title={customBook ? customBook.title : bookDetail?.title} />

      <div className="flex flex-1 flex-col gap-8 overflow-y-auto px-mobile pb-safe-bottom">
        <RatingSection rating={rating} onChange={setRating} isEdit />
        <ReadingPeriodSection
          status={status}
          startDate={startDate}
          endDate={endDate}
          onOpenStartDate={handleOpenStartDate}
          onOpenEndDate={handleOpenEndDate}
          isEdit
        />
        <ReadingProgressSection
          progressType={progressType}
          progressValue={resolvedProgressValue}
          totalPageCount={totalPageCount}
          onChangeProgressType={setProgressType}
          onChangeProgressValue={setProgressValue}
          onOpenPageInfo={handleOpenPageInfo}
          isEdit
          disabled={isCompletedStatus}
        />
        <GroupSection
          bookshelves={bookshelves}
          selectedBookshelfIds={selectedBookshelfIds}
          onOpenGroupEdit={handleOpenGroupEdit}
          onToggleBookshelf={handleToggleBookshelf}
          isEdit
        />
        <VisibilitySection checked={isHidden} onChange={handleTogglePrivate} isEdit />
      </div>

      <BottomButton
        onClick={handleSubmit}
        disabled={isCreateReadingLogPending || isCreateCustomReadingLogPending}
        loading={isCreateReadingLogPending || isCreateCustomReadingLogPending}
      >
        {MSG_ADD_RECORD_SUBMIT}
      </BottomButton>
    </div>
  );
};

export default NewRecord;
