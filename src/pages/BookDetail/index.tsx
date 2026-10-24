import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';

import BookCover from 'components/BookCover';
import { BottomButton } from 'components/Button';
import { Header } from 'components/Header';
import { ResourceFallback } from 'components/ResourceFallback';
import { Skeleton } from 'components/Skeleton';
import { Tabs, TabItem } from 'components/Tabs';
import { ToggleButton } from 'components/ToggleButton';
import { IconHeart, IconHeartFilled } from 'components/icons';

import { useHeaderTitleByScroll } from 'hooks/useHeaderTitleByScroll';
import { useKeyboard } from 'hooks/useKeyboard';
import { useScrollRestoration } from 'hooks/useScrollRestoration';

import { InfoSection } from './InfoSection';
import { ReviewSection } from './ReviewSection';
import { AddRecordStatusBottomSheet } from './components/AddRecordStatusBottomSheet';
import { useBookDetailQuery } from './queries/useBookDetailQuery';
import { useToggleInterestedBookMutation } from './queries/useToggleInterestedBookMutation';

const MSG_BOOK_DETAIL_ADD_RECORD = '독서 기록 추가하기';
const MSG_BOOK_DETAIL_TAB_INFO = '정보';
const MSG_BOOK_DETAIL_TAB_REVIEW = '리뷰';
const LAYER_ID_BOOK_DETAIL_ADD_RECORD_STATUS = 'book-detail-add-record-status-bottom-sheet';

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
  const { isbn13 = '' } = useParams();
  const { push } = useLayerStore();

  const [activeTab, setActiveTab] = useState<DetailTabType>('info');
  const titleRef = useRef<HTMLParagraphElement>(null);

  const { data: bookDetail, isLoading: isBookDetailLoading, isError: isBookDetailError } = useBookDetailQuery(isbn13);
  const { mutate: toggleInterestedBook } = useToggleInterestedBookMutation();

  const scrollContainerRef = useScrollRestoration<HTMLDivElement>({ isReady: bookDetail !== undefined });
  const { isVisible } = useHeaderTitleByScroll({ rootRef: scrollContainerRef, targetRef: titleRef });
  const { isKeyboardActive } = useKeyboard();

  const handleWishlistClick = () => {
    if (!bookDetail) return;

    toggleInterestedBook({
      isbn13: bookDetail.isbn13,
      isInterested: bookDetail.isInterested,
    });
  };

  const handleAddRecordClick = () => {
    push({
      id: LAYER_ID_BOOK_DETAIL_ADD_RECORD_STATUS,
      component: <AddRecordStatusBottomSheet isbn13={isbn13} bookDetail={bookDetail} />,
    });
  };

  const handleChangeDetailTab = setActiveTab;

  if (isBookDetailError || (!isBookDetailLoading && !bookDetail)) return <ResourceFallback type="bookNotFound" />;

  const title = isVisible ? bookDetail?.title : '';
  const isAdultBook = Boolean(bookDetail?.isAdult && bookDetail.hideAdultContent);

  return (
    <>
      <Header
        withBack
        title={title}
        rightBtn={
          <ToggleButton
            variant="iconText"
            selected={bookDetail?.isInterested ?? false}
            onClick={handleWishlistClick}
            icon={IconHeart}
            selectedIcon={IconHeartFilled}
            label="관심 도서"
            className="mr-2"
            disabled={isBookDetailLoading}
          />
        }
      />

      <div ref={scrollContainerRef} className="flex h-full w-full flex-col overflow-y-auto px-mobile pb-safe-bottom">
        <section className="flex flex-col items-center py-5 text-center">
          <BookCover
            className="w-28"
            url={bookDetail?.coverUrl}
            variant="clear"
            isAdult={isAdultBook}
            isSkeleton={isBookDetailLoading}
          />
          <p ref={titleRef} className="pt-4 text-title2">
            {isBookDetailLoading ? <Skeleton className="h-7 w-52" /> : bookDetail?.title}
          </p>
          <p className="h-5 text-body2 text-neutral-60">
            {isBookDetailLoading ? <Skeleton className="h-5 w-28" /> : bookDetail?.author}
          </p>
        </section>

        <Tabs tabs={BOOK_DETAIL_TABS} value={activeTab} onChange={handleChangeDetailTab} />
        {activeTab === 'info' && (
          <InfoSection
            publisher={bookDetail?.publisher}
            category={bookDetail?.category}
            publishedDate={bookDetail?.publishedDate}
            isbn13={bookDetail?.isbn13}
            description={bookDetail?.description}
            isAdultBook={isAdultBook}
            isLoading={isBookDetailLoading}
          />
        )}
        {activeTab === 'review' && <ReviewSection />}

        {!isKeyboardActive && (
          <BottomButton onClick={handleAddRecordClick} disabled={isBookDetailLoading}>
            {MSG_BOOK_DETAIL_ADD_RECORD}
          </BottomButton>
        )}
      </div>
    </>
  );
};

export default BookDetail;
