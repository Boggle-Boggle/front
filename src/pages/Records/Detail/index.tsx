import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { ResourceFallback } from 'components/ResourceFallback';
import { Tabs, type TabItem } from 'components/Tabs';

import { useScrollRestoration } from 'hooks/useScrollRestoration';

import { READING_STATUS_LABEL_BY_CODE } from 'types';

import { BookInfoTab } from './BookInfoTab';
import { MyInfoTab } from './MyInfoTab';
import { NoteTab } from './NoteTab';
import { RecordDetailHero } from './components/RecordDetailHero';
import { RecordDetailSkeleton } from './components/RecordDetailSkeleton';
import { useReadingLogDetailQuery } from './queries/useReadingLogDetailQuery';

type DetailTabType = 'info' | 'note' | 'myInfo';

const RECORD_DETAIL_TABS: TabItem<DetailTabType>[] = [
  {
    id: 'info',
    label: '책 정보',
  },
  {
    id: 'note',
    label: '독서노트',
  },
  {
    id: 'myInfo',
    label: '내 독서 정보',
  },
];

export const RecordDetailPage = () => {
  const { recordId = '' } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<DetailTabType>((location.state?.activeTab as DetailTabType) || 'info');

  const {
    data: readingLogDetail,
    isLoading: isReadingLogDetailLoading,
    isError: isReadingLogDetailError,
  } = useReadingLogDetailQuery(recordId);

  const scrollContainerRef = useScrollRestoration<HTMLDivElement>({
    isReady: !!readingLogDetail,
  });

  if (isReadingLogDetailLoading) return <RecordDetailSkeleton />;

  if (isReadingLogDetailError || !readingLogDetail) return <ResourceFallback type="readingLogNotFound" />;

  const readingStatusLabel = READING_STATUS_LABEL_BY_CODE[readingLogDetail.readingLog.status] || '읽는중';

  return (
    <div className="h-full overflow-y-auto pb-safe-bottom" ref={scrollContainerRef}>
      <RecordDetailHero
        recordId={recordId}
        bookId={readingLogDetail.book.id}
        bookSource={readingLogDetail.book.source}
        isbn13={readingLogDetail.book.isbn13}
        scrollContainerRef={scrollContainerRef}
        cover={readingLogDetail.book.coverUrl}
        title={readingLogDetail.book.title}
        author={readingLogDetail.book.author}
        publisher={readingLogDetail.book.publisher}
        isbn={readingLogDetail.book.isbn}
        description={readingLogDetail.book.description}
        totalPages={readingLogDetail.book.totalPages}
        rating={String(readingLogDetail.readingLog.rating)}
        readingStatus={readingStatusLabel}
        noteCount={`${readingLogDetail.readingLog.noteCount}개`}
      />

      <div className="px-mobile">
        <Tabs tabs={RECORD_DETAIL_TABS} value={activeTab} onChange={setActiveTab} className="mb-6" />
        {activeTab === 'info' && <BookInfoTab book={readingLogDetail.book} />}
        {activeTab === 'note' && <NoteTab readingLogId={recordId} bookTitle={readingLogDetail.book.title} />}
        {activeTab === 'myInfo' && <MyInfoTab readingLog={readingLogDetail.readingLog} />}
      </div>
    </div>
  );
};

export default RecordDetailPage;
