import { RefObject } from 'react';

import BookCover from 'components/BookCover';
import { ToggleButton } from 'components/ToggleButton';
import { IconHeart, IconHeartFilled } from 'components/icons';

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

  const handleToggleWishlist = () => undefined;

  return (
    <>
      <ul className="flex flex-col overflow-y-auto px-mobile">
        {books.map((book) => (
          <li
            key={book.id}
            className="flex items-center justify-between gap-4 border-b border-neutral-20 py-4 last:border-b-0"
          >
            <div className="flex min-w-0 items-stretch self-stretch">
              <BookCover className="w-20 shrink-0" url={book.cover} label={book.title} variant="clear" rounded="sm" />
              <div className="flex min-w-0 flex-1 flex-col pl-4">
                <p className="line-clamp-2 text-body1">{book.title}</p>
                <p className="line-clamp-1 text-caption1 text-neutral-80">{book.author}</p>
                <p className="mt-auto pt-1 text-caption1 text-neutral-40">
                  {formatWishlistAddedDate(book.createdAt)}
                </p>
              </div>
            </div>

            <ToggleButton
              variant="icon"
              selected
              onClick={handleToggleWishlist}
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
