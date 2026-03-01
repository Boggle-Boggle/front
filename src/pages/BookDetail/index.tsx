import { useRef } from 'react';
import { useParams } from 'react-router-dom';

import { BottomButton } from 'components/Button';
import IconButton from 'components/Button/IconButton';
import { TextButton } from 'components/Button/TextButton';
import { Header } from 'components/Header';
import { IconEllipsisVertical, IconHeart } from 'components/icons';

import { useHeaderTitleByScroll } from 'hooks/useHeaderTitleByScroll';

import { BookSummary } from './BookSummary';
import { DetailTabs } from './DetailTabs';
import { InfoSection } from './InfoSection';
import { useBookDetailQuery } from './useBookDetailQuery';

const MSG_BOOK_DETAIL_ADD_RECORD = '독서 기록 추가하기';

export const BookDetail = () => {
  const { detailId = '' } = useParams();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tabSentinelRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError } = useBookDetailQuery(detailId);
  const { isVisible } = useHeaderTitleByScroll({
    rootRef: scrollContainerRef,
    targetRef: tabSentinelRef,
  });
  const title = isVisible ? data?.title : undefined;

  const handleWishlistClick = () => {};

  const handleMenuClick = () => {};

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
            <DetailTabs />
            <InfoSection
              publisher={data.publisher}
              genre={data.genre}
              pubDate={data.pubDate}
              isbn={data.isbn}
              plot={data.plot}
            />
          </>
        )}

        <BottomButton onClick={() => {}}>{MSG_BOOK_DETAIL_ADD_RECORD}</BottomButton>
      </div>
    </>
  );
};

export default BookDetail;
