import { useMutation, useQueryClient } from '@tanstack/react-query';

import { RefObject } from 'react';
import { Link } from 'react-router-dom';
import { useToastStore } from 'stores/useToastStore';

import BookCover from 'components/BookCover';
import { InfiniteScrollTrigger } from 'components/InfiniteScrollTrigger';
import { ToggleButton } from 'components/ToggleButton';
import { IconHeart, IconHeartFilled } from 'components/icons';

import { deleteInterestedBook } from '../api';
import { MyBook } from '../useLibraryQuery';

type WishlistSectionProps = {
  books: MyBook[];
  totalCount: number;
  isLoading: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  observerTarget: RefObject<HTMLDivElement>;
};

const MSG_MYBOOKS_LOADING = '불러오는 중...';
const MSG_MYBOOKS_WISHLIST_COUNT_SUFFIX = '개의 관심도서가 있어요';
const MSG_MYBOOKS_WISHLIST_ARIA_LABEL_KO = '{title} 관심 도서';
const MSG_MYBOOKS_WISHLIST_ARIA_LABEL_EN = '{title} wishlist book';
const MSG_MYBOOKS_WISHLIST_DELETE_SUCCESS = '관심도서에서 해제되었습니다.';
const MSG_MYBOOKS_WISHLIST_DELETE_FAILED = '관심도서 해제에 실패했습니다.';

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
  const { books, totalCount, isLoading, hasNextPage, isFetchingNextPage, observerTarget } = props;
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  const { mutate: unlikeBook } = useMutation({
    mutationFn: (isbn13: string) => deleteInterestedBook(isbn13),
    onSuccess: (_, isbn13) => {
      queryClient.invalidateQueries({ queryKey: ['interested-books'] });
      queryClient.invalidateQueries({ queryKey: ['books', 'detail', isbn13] });
      addToast({
        description: MSG_MYBOOKS_WISHLIST_DELETE_SUCCESS,
        type: 'success',
      });
    },
    onError: () => {
      addToast({
        description: MSG_MYBOOKS_WISHLIST_DELETE_FAILED,
        type: 'error',
      });
    },
  });

  const handleToggleWishlist = (isbn13?: string) => () => {
    if (isbn13) {
      unlikeBook(isbn13);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-mobile">
        <p className="text-caption1 text-neutral-60">
          {totalCount}
          {MSG_MYBOOKS_WISHLIST_COUNT_SUFFIX}
        </p>
      </div>

      <ul className="flex flex-col overflow-y-auto px-mobile">
        {books.map((book) => (
          <li
            key={book.id}
            className="flex items-center justify-between gap-4 border-b border-neutral-20 py-4 last:border-b-0"
          >
            <Link
              to={book.isbn13 ? `/books/${book.isbn13}` : '#'}
              className="flex min-w-0 flex-1 items-stretch self-stretch text-left"
            >
              <BookCover className="w-20 shrink-0" url={book.cover} label={book.title} variant="clear" rounded="sm" />
              <div className="flex min-w-0 flex-1 flex-col pl-4">
                <p className="line-clamp-2 text-body1">{book.title}</p>
                <p className="line-clamp-1 text-caption1 text-neutral-80">{book.author}</p>
                <p className="mt-auto pt-1 text-caption1 text-neutral-40">{formatWishlistAddedDate(book.createdAt)}</p>
              </div>
            </Link>

            <ToggleButton
              variant="icon"
              selected
              onClick={handleToggleWishlist(book.isbn13)}
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
      {isLoading && (
        <div className="flex justify-center py-4">
          <span className="text-caption1 text-neutral-60">{MSG_MYBOOKS_LOADING}</span>
        </div>
      )}
    </>
  );
};
