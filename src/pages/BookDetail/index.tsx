import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { BottomButton } from 'components/Button';
import IconButton from 'components/Button/IconButton';
import { TextButton } from 'components/Button/TextButton';
import { Header } from 'components/Header';
import { Tabs, TabItem } from 'components/Tabs';
import { IconEllipsisVertical, IconHeart } from 'components/icons';

import { useHeaderTitleByScroll } from 'hooks/useHeaderTitleByScroll';

import { BookSummary } from './BookSummary';
import { InfoSection } from './InfoSection';
import { ReviewSection } from './ReviewSection';
import { useBookDetailQuery } from './useBookDetailQuery';

const MSG_BOOK_DETAIL_ADD_RECORD = '독서 기록 추가하기';
const MSG_BOOK_DETAIL_TAB_INFO = '정보';
const MSG_BOOK_DETAIL_TAB_REVIEW = '리뷰';

type DetailTabType = 'info' | 'review';

const BOOK_DETAIL_TABS: TabItem<DetailTabType>[] = [
  {
    id: 'info',
    label: MSG_BOOK_DETAIL_TAB_INFO,
  },
  {
    id: 'review',
    label: MSG_BOOK_DETAIL_TAB_REVIEW,
  },
];

export const BookDetail = () => {
  const { detailId = '' } = useParams();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tabSentinelRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<DetailTabType>('info');

  const { data, isLoading, isError } = useBookDetailQuery(detailId);
  const { isVisible } = useHeaderTitleByScroll({
    rootRef: scrollContainerRef,
    targetRef: tabSentinelRef,
  });
  const title = isVisible ? data?.title : undefined;

  const handleWishlistClick = () => {};

  const handleMenuClick = () => {};

  const handleChangeDetailTab = setActiveTab;

  return (
    <>
      <Header
        withBack
        title={title}
        rightBtn={
          <div className="flex items-center gap-2 pr-mobile">
            <TextButton onClick={handleWishlistClick} text="관심 도서" leftIcon={IconHeart} size="sm" variant="line" />
            <IconButton onClick={handleMenuClick} label="더보기" icon={IconEllipsisVertical} size="sm" />
          </div>
        }
      />

      <div className="flex h-full w-full flex-col overflow-y-auto px-mobile pb-safe-bottom">
        {!isLoading && !isError && data && (
          <>
            <BookSummary title={data.title} author={data.author} cover={data.cover} />
            <Tabs tabs={BOOK_DETAIL_TABS} value={activeTab} onChange={handleChangeDetailTab} />
            {activeTab === 'info' && (
              <InfoSection
                publisher={data.publisher}
                genre={data.genre}
                pubDate={data.pubDate}
                isbn={data.isbn}
                plot={data.plot}
              />
            )}
            {activeTab === 'review' && <ReviewSection />}
          </>
        )}

        <BottomButton onClick={() => {}}>{MSG_BOOK_DETAIL_ADD_RECORD}</BottomButton>
      </div>
    </>
  );
};

export default BookDetail;
