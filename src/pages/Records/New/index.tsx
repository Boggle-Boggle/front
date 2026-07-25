import { useMutation, useQuery } from '@tanstack/react-query';

import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';
import { useToastStore } from 'stores/useToastStore';

import { BottomButton } from 'components/Button';
import { Header } from 'components/Header';
import { useBookDetailQuery } from 'pages/BookDetail/useBookDetailQuery';

import { createReadingLog } from './api';
import { DateSelectModal } from '../shared/DateSelectModal';
import { GroupDeleteConfirmModal } from '../shared/GroupDeleteConfirmModal';
import { GroupEditModal } from '../shared/GroupEditModal';
import { GroupSection } from '../shared/GroupSection';
import { PageInfoModal } from '../shared/PageInfoModal';
import { RatingSection } from '../shared/RatingSection';
import { ReadingPeriodSection } from '../shared/ReadingPeriodSection';
import { ReadingProgressSection, type ReadingProgressType } from '../shared/ReadingProgressSection';
import { VisibilitySection } from '../shared/VisibilitySection';
import { BOOKSHELVES_QUERY_KEY, getBookshelves, type BookshelfItem } from '../shared/api';
import { getAddRecordStatus } from '../shared/recordStatus';

const MSG_ADD_RECORD_SUBMIT = '입력을 끝내고 완료하기';
const MSG_ADD_RECORD_FAILED = '독서 기록을 저장하지 못했습니다. 다시 시도해주세요.';
const MSG_DATE_SELECT_START = '시작일 선택하기';
const MSG_DATE_SELECT_END = '종료일 선택하기';
const MOCK_START_DATE = '2026-01-01';
const MOCK_END_DATE = '2026-06-06';

export const NewRecord = () => {
  const [rating, setRating] = useState<number>(0);
  const [selectedBookshelfIds, setSelectedBookshelfIds] = useState<number[]>([]);
  // TODO 날짜 선택 모달 연결 후 사용자가 선택한 날짜로 교체한다.
  const [startDate] = useState<string>(MOCK_START_DATE);
  const [endDate] = useState<string>(MOCK_END_DATE);
  const [progressType, setProgressType] = useState<ReadingProgressType>('PAGE');
  const [progressValue, setProgressValue] = useState<string>('');
  const [totalPageCountOverride, setTotalPageCountOverride] = useState<string>('');
  const [isHidden, setIsHidden] = useState<boolean>(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { push, pop } = useLayerStore();
  const { addToast } = useToastStore();

  const bookId = searchParams.get('bookId') || '';
  const { data: bookDetail } = useBookDetailQuery(bookId);
  const { data: bookshelves = [] } = useQuery({
    queryKey: BOOKSHELVES_QUERY_KEY,
    queryFn: getBookshelves,
  });

  const { isPending, mutate: saveReadingLog } = useMutation({
    mutationFn: createReadingLog,
    onSuccess: () => {
      navigate('/records/new/completed');
    },
    onError: () => {
      addToast({
        description: MSG_ADD_RECORD_FAILED,
        type: 'error',
      });
    },
  });

  const handleSubmit = () => {
    if (!bookDetail || isPending) return;

    const validSelectedBookshelfIds = selectedBookshelfIds.filter((bookshelfId) =>
      bookshelves.some((bookshelf) => bookshelf.id === bookshelfId),
    );
    const progressParams =
      progressValue === ''
        ? {}
        : {
            progressType,
            progressValue: Number(progressValue),
          };
    const totalPagesOverrideParams =
      totalPageCountOverride === ''
        ? {}
        : {
            totalPagesOverride: Number(totalPageCountOverride),
          };

    saveReadingLog({
      isbn13: bookDetail.isbn13,
      mediaType: bookDetail.mediaType,
      status: getAddRecordStatus(searchParams.get('status')),
      rating,
      startDate,
      endDate,
      bookshelfIds: validSelectedBookshelfIds,
      isHidden,
      ...progressParams,
      ...totalPagesOverrideParams,
    });
  };

  const handleToggleBookshelf = (bookshelfId: number) => () => {
    setSelectedBookshelfIds((prev) =>
      prev.includes(bookshelfId) ? prev.filter((item) => item !== bookshelfId) : [...prev, bookshelfId],
    );
  };

  const handleDeleteBookshelfSuccess = (bookshelfId: number) => {
    setSelectedBookshelfIds((prev) => prev.filter((item) => item !== bookshelfId));
  };

  const handleTogglePrivate = () => {
    setIsHidden((prev) => !prev);
  };

  const handleOpenStartDate = () => {
    push({
      id: 'book-record-start-date-modal',
      component: <DateSelectModal title={MSG_DATE_SELECT_START} onClose={pop} />,
    });
  };

  const handleOpenEndDate = () => {
    push({
      id: 'book-record-end-date-modal',
      component: <DateSelectModal title={MSG_DATE_SELECT_END} onClose={pop} />,
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
    const initialPageCount = totalPageCountOverride || bookDetail?.totalPages?.toString() || '';

    push({
      id: 'book-record-page-info-modal',
      component: <PageInfoModal initialValue={initialPageCount} onClose={pop} onSubmit={setTotalPageCountOverride} />,
    });
  };

  const totalPageCount = totalPageCountOverride || bookDetail?.totalPages?.toString() || '';

  return (
    <div className="flex h-full flex-col">
      <Header withBack title={bookDetail?.title} />

      <div className="flex flex-1 flex-col gap-8 overflow-y-auto px-mobile pb-safe-bottom pt-safe-top">
        <RatingSection rating={rating} onChange={setRating} />
        <ReadingPeriodSection onOpenStartDate={handleOpenStartDate} onOpenEndDate={handleOpenEndDate} />
        <ReadingProgressSection
          progressType={progressType}
          progressValue={progressValue}
          totalPageCount={totalPageCount}
          onChangeProgressType={setProgressType}
          onChangeProgressValue={setProgressValue}
          onOpenPageInfo={handleOpenPageInfo}
        />
        <GroupSection
          bookshelves={bookshelves}
          selectedBookshelfIds={selectedBookshelfIds}
          onOpenGroupEdit={handleOpenGroupEdit}
          onToggleBookshelf={handleToggleBookshelf}
        />
        <VisibilitySection checked={isHidden} onChange={handleTogglePrivate} />
      </div>

      <BottomButton onClick={handleSubmit} disabled={!bookDetail} loading={isPending}>
        {MSG_ADD_RECORD_SUBMIT}
      </BottomButton>
    </div>
  );
};

export default NewRecord;
