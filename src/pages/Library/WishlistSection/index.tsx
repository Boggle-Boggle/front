import { RefObject, useState } from 'react';
import { Link } from 'react-router-dom';

import BookCover from 'components/BookCover';
import { TextButton } from 'components/Button';
import { InfiniteScrollTrigger } from 'components/InfiniteScrollTrigger';
import { ToggleButton } from 'components/ToggleButton';
import { IconArrowDown, IconHeart, IconHeartFilled } from 'components/icons';

import { WishlistSectionSkeleton } from './WishlistSectionSkeleton';
import type { MyBook } from '../queries/useLibraryQuery';
import { useToggleWishlistBookMutation } from '../queries/useToggleWishlistBookMutation';

type WishlistSectionProps = {
  books: MyBook[];
  totalCount: number;
  isLoading: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  observerTarget: RefObject<HTMLDivElement>;
  scrollContainerRef?: RefObject<HTMLDivElement>;
  sortLabel: string;
  onOpenSortLayer: () => void;
};

const MSG_MYBOOKS_WISHLIST_COUNT_SUFFIX = '개의 관심도서가 있어요';
const MSG_MYBOOKS_WISHLIST_ARIA_LABEL_KO = '{title} 관심 도서';
const MSG_MYBOOKS_WISHLIST_ARIA_LABEL_EN = '{title} wishlist book';
const getWishlistAriaLabel = (title: string) => {
  const browserLanguage = typeof navigator === 'undefined' ? 'ko' : navigator.language.toLowerCase();
  const ariaLabelTemplate = browserLanguage.startsWith('ko')
    ? MSG_MYBOOKS_WISHLIST_ARIA_LABEL_KO
    : MSG_MYBOOKS_WISHLIST_ARIA_LABEL_EN;

  return ariaLabelTemplate.replace('{title}', title);
};

const formatWishlistAddedDate = (createdAt = '') => {
  const [year, month, day] = createdAt.split('T')[0].split('-');
  return `${year}년 ${parseInt(month, 10)}월 ${parseInt(day, 10)}일에 추가 됨`;
};

export const WishlistSection = (props: WishlistSectionProps) => {
  const {
    books,
    totalCount,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    observerTarget,
    scrollContainerRef,
    sortLabel,
    onOpenSortLayer,
  } = props;
  const [unlikedItemIdSet, setUnlikedItemIdSet] = useState<Set<number>>(() => new Set());
  const toggleWishlistBookMutation = useToggleWishlistBookMutation({
    onAddMutate: (itemId) => {
      setUnlikedItemIdSet((prev) => {
        const next = new Set(prev);
        next.delete(itemId);
        return next;
      });
    },
    onDeleteMutate: (itemId) => {
      setUnlikedItemIdSet((prev) => new Set(prev).add(itemId));
    },
    onAddError: (itemId) => {
      setUnlikedItemIdSet((prev) => new Set(prev).add(itemId));
    },
    onDeleteError: (itemId) => {
      setUnlikedItemIdSet((prev) => {
        const next = new Set(prev);
        next.delete(itemId);
        return next;
      });
    },
  });

  const handleToggleWishlist = (itemId?: number | null) => () => {
    if (!itemId) return;

    toggleWishlistBookMutation.mutate({
      itemId,
      isInterested: !unlikedItemIdSet.has(itemId),
    });
  };

  if (isLoading) return <WishlistSectionSkeleton />;

  return (
    <>
      <div className="flex items-center justify-between px-mobile pb-3">
        <p className="text-caption1 text-neutral-60">
          {totalCount}
          {MSG_MYBOOKS_WISHLIST_COUNT_SUFFIX}
        </p>
        <TextButton variant="filled" size="sm" rightIcon={IconArrowDown} onClick={onOpenSortLayer} text={sortLabel} />
      </div>

      <div ref={scrollContainerRef} className="min-h-0 flex-1 overflow-y-auto">
        <ul className="flex flex-col px-mobile">
          {books.map((book) => (
            <li
              key={book.id}
              className="flex items-center justify-between gap-4 border-b border-neutral-20 py-4 last:border-b-0"
            >
              <Link
                to={book.itemId ? `/books/${book.itemId}` : '#'}
                className="flex min-w-0 flex-1 items-stretch self-stretch text-left"
              >
                <BookCover className="w-20 shrink-0" url={book.cover} label={book.title} variant="clear" rounded="sm" />
                <div className="flex min-w-0 flex-1 flex-col pl-4">
                  <p className="line-clamp-2 text-body1">{book.title}</p>
                  <p className="line-clamp-1 text-caption1 text-neutral-80">{book.author}</p>
                  <p className="mt-auto pt-1 text-caption1 text-neutral-40">
                    {formatWishlistAddedDate(book.createdAt)}
                  </p>
                </div>
              </Link>

              <ToggleButton
                variant="icon"
                selected={!book.itemId || !unlikedItemIdSet.has(book.itemId)}
                onClick={handleToggleWishlist(book.itemId)}
                icon={IconHeart}
                selectedIcon={IconHeartFilled}
                className="shrink-0"
                ariaLabel={getWishlistAriaLabel(book.title)}
              />
            </li>
          ))}
        </ul>
        <InfiniteScrollTrigger
          observerTarget={observerTarget}
          hasNextPage={hasNextPage}
          isFetching={isFetchingNextPage}
        />
      </div>
    </>
  );
};
