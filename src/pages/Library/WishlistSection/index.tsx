import { useMutation, useQueryClient } from '@tanstack/react-query';

import { RefObject } from 'react';
import { Link } from 'react-router-dom';
import { useToastStore } from 'stores/useToastStore';

import BookCover from 'components/BookCover';
import { ToggleButton } from 'components/ToggleButton';
import { IconHeart, IconHeartFilled } from 'components/icons';

import { deleteInterestedBook } from '../api';
import { MyBook } from '../useLibraryQuery';

type WishlistSectionProps = {
  books: MyBook[];
  isLoading: boolean;
  observerTarget: RefObject<HTMLDivElement>;
};

const MSG_MYBOOKS_LOADING = '불러오는 중...';
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
  const { books, isLoading, observerTarget } = props;
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  const { mutate: unlikeBook } = useMutation({
    mutationFn: (bookId: number) => deleteInterestedBook(bookId),
    onSuccess: (_, bookId) => {
      queryClient.invalidateQueries({ queryKey: ['interested-books'] });

      const deletedBook = books.find((b) => b.id === bookId);
      if (deletedBook?.isbn13) {
        queryClient.invalidateQueries({ queryKey: ['books', 'detail', deletedBook.isbn13] });
      }
    },
    onError: () => {
      addToast({
        description: '관심도서 해제에 실패했습니다.',
        type: 'error',
      });
    },
  });

  const handleToggleWishlist = (bookId: number) => () => {
    unlikeBook(bookId);
  };

  return (
    <>
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
                <p className="mt-auto pt-1 text-caption1 text-neutral-40">
                  {formatWishlistAddedDate(book.createdAt)}
                </p>
              </div>
            </Link>

            <ToggleButton
              variant="icon"
              selected
              onClick={handleToggleWishlist(book.id)}
              icon={IconHeart}
              selectedIcon={IconHeartFilled}
              className="shrink-0"
              ariaLabel={getWishlistAriaLabel(book.title)}
            />
          </li>
        ))}
      </ul>
      <div ref={observerTarget} className="h-20 w-full" />
      {isLoading && (
        <div className="flex justify-center py-4">
          <span className="text-caption1 text-neutral-60">{MSG_MYBOOKS_LOADING}</span>
        </div>
      )}
    </>
  );
};
