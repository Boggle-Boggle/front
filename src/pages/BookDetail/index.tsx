import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';

import BookCover from 'components/BookCover';
import { BottomButton } from 'components/Button';
import IconButton from 'components/Button/IconButton';
import { Header } from 'components/Header';
import { Tabs, TabItem } from 'components/Tabs';
import { ToggleButton } from 'components/ToggleButton';
import { IconEllipsisVertical, IconHeart, IconHeartFilled } from 'components/icons';

import { useHeaderTitleByScroll } from 'hooks/useHeaderTitleByScroll';

import { BookMenuActionSheet } from './BookMenuActionSheet';
import { InfoSection } from './InfoSection';
import { ReviewSection } from './ReviewSection';
import { AddRecordStatusBottomSheet } from './shared/AddRecordStatusBottomSheet';
import { useBookDetailQuery } from './useBookDetailQuery';

const MSG_BOOK_DETAIL_ADD_RECORD = '독서 기록 추가하기';
const MSG_BOOK_DETAIL_TAB_INFO = '정보';
const MSG_BOOK_DETAIL_TAB_REVIEW = '리뷰';
const LAYER_ID_BOOK_DETAIL_MENU = 'book-detail-menu-bottom-sheet';
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
  const { bookId = '' } = useParams();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tabSentinelRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<DetailTabType>('info');
  const [isWishlistSelected, setIsWishlistSelected] = useState<boolean>(false);
  const { push } = useLayerStore();

  const { data, isLoading, isError } = useBookDetailQuery(bookId);
  const { isVisible } = useHeaderTitleByScroll({
    rootRef: scrollContainerRef,
    targetRef: tabSentinelRef,
  });
  const title = isVisible ? data?.title : undefined;

  const handleWishlistClick = () => {
    setIsWishlistSelected((prev) => !prev);
  };

  const handleOpenStoreClick = () => {
    if (!data) return;

    window.location.href = data.link;
  };

  const handleShareClick = () => {};

  const handleMenuClick = () => {
    push({
      id: LAYER_ID_BOOK_DETAIL_MENU,
      component: <BookMenuActionSheet onOpenStore={handleOpenStoreClick} onShare={handleShareClick} />,
    });
  };

  const handleChangeDetailTab = setActiveTab;

  const handleAddRecordClick = () => {
    push({
      id: LAYER_ID_BOOK_DETAIL_ADD_RECORD_STATUS,
      component: <AddRecordStatusBottomSheet bookId={bookId} />,
    });
  };

  return (
    <>
      <Header
        withBack
        title={title}
        rightBtn={
          <div className="flex items-center gap-2 pr-mobile">
            <ToggleButton
              variant="iconText"
              selected={isWishlistSelected}
              onClick={handleWishlistClick}
              icon={IconHeart}
              selectedIcon={IconHeartFilled}
              label="관심 도서"
            />
            <IconButton onClick={handleMenuClick} label="더보기" icon={IconEllipsisVertical} size="sm" />
          </div>
        }
      />

      <div className="flex h-full w-full flex-col overflow-y-auto px-mobile pb-safe-bottom">
        {!isLoading && !isError && data && (
          <>
            <section className="flex flex-col items-center py-5 text-center">
              <BookCover className="w-28" url={data.cover} />
              <p className="pt-4 text-title1">{data.title}</p>
              <p className="text-body2 text-neutral-60">{data.author}</p>
            </section>

            <Tabs tabs={BOOK_DETAIL_TABS} value={activeTab} onChange={handleChangeDetailTab} />
            {activeTab === 'info' && (
              <InfoSection
                publisher={data.publisher}
                genre={data.genre}
                pubDate={data.pubDate}
                isbn={data.isbn}
                plot={data.plot}
                sourceLink={data.link}
              />
            )}
            {activeTab === 'review' && <ReviewSection />}
          </>
        )}

        <BottomButton onClick={handleAddRecordClick}>{MSG_BOOK_DETAIL_ADD_RECORD}</BottomButton>
      </div>
    </>
  );
};

export default BookDetail;
