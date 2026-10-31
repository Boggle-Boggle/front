import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';

import BookCover from 'components/BookCover';
import { BottomButton } from 'components/Button';
import { Header } from 'components/Header';
import { ResourceFallback } from 'components/ResourceFallback';
import { Tabs, TabItem } from 'components/Tabs';
import { ToggleButton } from 'components/ToggleButton';
import { IconHeart, IconHeartFilled } from 'components/icons';

import { useHeaderTitleByScroll } from 'hooks/useHeaderTitleByScroll';
import { useKeyboard } from 'hooks/useKeyboard';
import { useScrollRestoration } from 'hooks/useScrollRestoration';

import { InfoSection } from './InfoSection';
import { ReviewSection } from './ReviewSection';
import { AddRecordStatusBottomSheet } from './components/AddRecordStatusBottomSheet';
import { BookDetailSkeleton } from './components/BookDetailSkeleton';
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
  const { itemId = '' } = useParams();
  const parsedItemId = Number(itemId);
  const { push } = useLayerStore();

  const [activeTab, setActiveTab] = useState<DetailTabType>('info');
  const titleRef = useRef<HTMLParagraphElement>(null);

  const { data: bookDetail, isLoading: isBookDetailLoading, isError: isBookDetailError } = useBookDetailQuery(parsedItemId);
  const { mutate: toggleInterestedBook } = useToggleInterestedBookMutation();

  const scrollContainerRef = useScrollRestoration<HTMLDivElement>({ isReady: bookDetail !== undefined });
  const { isVisible } = useHeaderTitleByScroll({ rootRef: scrollContainerRef, targetRef: titleRef });
  const { isKeyboardActive } = useKeyboard();

  const handleWishlistClick = () => {
    if (!bookDetail) return;

    toggleInterestedBook({
      itemId: bookDetail.itemId,
      isInterested: bookDetail.isInterested,
    });
  };

  const handleAddRecordClick = () => {
    push({
      id: LAYER_ID_BOOK_DETAIL_ADD_RECORD_STATUS,
      component: <AddRecordStatusBottomSheet itemId={parsedItemId} bookDetail={bookDetail} />,
    });
  };

  const handleChangeDetailTab = setActiveTab;

  if (isBookDetailLoading) return <BookDetailSkeleton />;

  if (!Number.isSafeInteger(parsedItemId) || parsedItemId <= 0 || isBookDetailError || !bookDetail) {
    return <ResourceFallback type="bookNotFound" />;
  }

  const title = isVisible ? bookDetail.title : '';
  const isAdultBook = bookDetail.isAdult && bookDetail.hideAdultContent;

  return (
    <>
      <Header
        withBack
        title={title}
        rightBtn={
          <ToggleButton
            variant="iconText"
            selected={bookDetail.isInterested}
            onClick={handleWishlistClick}
            icon={IconHeart}
            selectedIcon={IconHeartFilled}
            label="관심 도서"
            className="mr-2"
          />
        }
      />

      <div ref={scrollContainerRef} className="flex h-full w-full flex-col overflow-y-auto px-mobile pb-safe-bottom">
        <section className="flex flex-col items-center py-5 text-center">
          <BookCover className="w-28" url={bookDetail.coverUrl} variant="clear" isAdult={isAdultBook} />
          <p ref={titleRef} className="pt-4 text-title2">
            {bookDetail.title}
          </p>
          <p className="text-body2 text-neutral-60">{bookDetail.author}</p>
        </section>

        <Tabs tabs={BOOK_DETAIL_TABS} value={activeTab} onChange={handleChangeDetailTab} />
        {activeTab === 'info' && (
          <InfoSection
            publisher={bookDetail.publisher}
            category={bookDetail.category}
            publishedDate={bookDetail.publishedDate}
            isbn13={bookDetail.isbn13}
            description={bookDetail.description}
            isAdultBook={isAdultBook}
          />
        )}
        {activeTab === 'review' && <ReviewSection />}

        {!isKeyboardActive && <BottomButton onClick={handleAddRecordClick}>{MSG_BOOK_DETAIL_ADD_RECORD}</BottomButton>}
      </div>
    </>
  );
};

export default BookDetail;
