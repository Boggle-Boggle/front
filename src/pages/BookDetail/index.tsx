import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';
import { useToastStore } from 'stores/useToastStore';

import BookCover from 'components/BookCover';
import { BottomButton } from 'components/Button';
import IconButton from 'components/Button/IconButton';
import { Header } from 'components/Header';
import { Tabs, TabItem } from 'components/Tabs';
import { ToggleButton } from 'components/ToggleButton';
import { IconEllipsisVertical, IconHeart, IconHeartFilled } from 'components/icons';

import { useHeaderTitleByScroll } from 'hooks/useHeaderTitleByScroll';

import type { BookDetail as BookDetailType } from 'types';

import { BookMenuActionSheet } from './BookMenuActionSheet';
import { InfoSection } from './InfoSection';
import { ReviewSection } from './ReviewSection';
import { addInterestedBook, deleteInterestedBookByIsbn13 } from './api';
import { AddRecordStatusBottomSheet } from './shared/AddRecordStatusBottomSheet';
import { useBookDetailQuery } from './useBookDetailQuery';

const MSG_BOOK_DETAIL_ADD_RECORD = '독서 기록 추가하기';
const MSG_BOOK_DETAIL_TAB_INFO = '정보';
const MSG_BOOK_DETAIL_TAB_REVIEW = '리뷰';
const MSG_BOOK_DETAIL_WISHLIST_FAILED = '관심도서 처리에 실패했습니다.';
const LAYER_ID_BOOK_DETAIL_MENU = 'book-detail-menu-bottom-sheet';
const LAYER_ID_BOOK_DETAIL_ADD_RECORD_STATUS = 'book-detail-add-record-status-bottom-sheet';
const ALADIN_BOOK_DETAIL_URL = 'https://www.aladin.co.kr/shop/wproduct.aspx';

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

const getAladinBookDetailUrl = (itemId: number) => `${ALADIN_BOOK_DETAIL_URL}?ItemId=${itemId}`;

export const BookDetail = () => {
  const { isbn13 = '' } = useParams();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tabSentinelRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<DetailTabType>('info');
  const { push } = useLayerStore();
  const { addToast } = useToastStore();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useBookDetailQuery(isbn13);

  const { isVisible } = useHeaderTitleByScroll({
    rootRef: scrollContainerRef,
    targetRef: tabSentinelRef,
  });
  const title = isVisible ? data?.title : undefined;

  const { mutate: toggleWishlist } = useMutation({
    mutationFn: async (isInterested: boolean) => {
      if (!data) return;
      if (isInterested) await deleteInterestedBookByIsbn13(data.isbn13);
      else await addInterestedBook(data.isbn13);
    },
    onMutate: async (isInterested) => {
      // 1. 진행 중인 리페칭을 취소합니다.
      await queryClient.cancelQueries({ queryKey: ['books', 'detail', isbn13] });

      // 2. 이전 상태 데이터를 보관(스냅샷)합니다.
      const previousDetail = queryClient.getQueryData<BookDetailType>(['books', 'detail', isbn13]);

      // 3. 캐시 데이터를 낙천적으로 업데이트합니다.
      queryClient.setQueryData<BookDetailType>(['books', 'detail', isbn13], (prev) => {
        if (!prev) return prev;
        return { ...prev, isInterested: !isInterested };
      });

      // 4. 에러 발생 시 원래 상태로 복구하기 위한 컨텍스트를 반환합니다.
      return { previousDetail };
    },
    onError: (err, isInterested, context) => {
      // 5. 에러 발생 시 원래 상태로 롤백합니다.
      if (context?.previousDetail) {
        queryClient.setQueryData(['books', 'detail', isbn13], context.previousDetail);
      }
      addToast({
        description: MSG_BOOK_DETAIL_WISHLIST_FAILED,
        type: 'error',
      });
    },
    onSettled: () => {
      // 6. 완료 시 서버 동기화를 위해 인밸리데이션을 진행합니다.
      queryClient.invalidateQueries({ queryKey: ['books', 'detail', isbn13] });
      queryClient.invalidateQueries({ queryKey: ['interested-books'] });
    },
  });

  const handleWishlistClick = () => {
    toggleWishlist(data?.isInterested ?? false);
  };

  const handleOpenStoreClick = () => {
    if (!data) return;

    const searchQuery = data.isbn13 || data.title;
    window.location.href = `https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=All&SearchWord=${encodeURIComponent(searchQuery)}`;
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
      component: <AddRecordStatusBottomSheet isbn13={isbn13} bookDetail={data} />,
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
              selected={data?.isInterested ?? false}
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
              <BookCover
                className="w-28"
                url={data.coverUrl}
                variant="clear"
                isAdult={data.isAdult && data.hideAdultContent}
              />
              <p className="pt-4 text-title1">{data.title}</p>
              <p className="text-body2 text-neutral-60">{data.author}</p>
            </section>

            <Tabs tabs={BOOK_DETAIL_TABS} value={activeTab} onChange={handleChangeDetailTab} />
            {activeTab === 'info' && (
              <InfoSection
                publisher={data.publisher}
                category={data.category}
                publishedDate={data.publishedDate}
                isbn13={data.isbn13}
                description={data.description}
                sourceLink={getAladinBookDetailUrl(data.itemId)}
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
