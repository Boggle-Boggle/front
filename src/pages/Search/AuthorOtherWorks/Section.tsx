import { Link, useNavigate } from 'react-router-dom';

import BookCover from 'components/BookCover';

import { useAuthorOtherWorksQuery } from './useAuthorOtherWorksQuery';
import { Title } from '../shared/Title';

const AUTHOR_NAME = '헤르만 헤세';
const MSG_SEARCH_AUTHOR_OTHER_WORKS_TITLE = `${AUTHOR_NAME}의 다른 작품`;
const MSG_SEARCH_AUTHOR_OTHER_WORKS_EMPTY_DESCRIPTION = '이 도서의 요약 설명이 존재하지 않습니다.';

export const AuthorOtherWorksSection = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useAuthorOtherWorksQuery(AUTHOR_NAME);

  const handleLoadMore = () => navigate(`/search/result?q=${encodeURIComponent(AUTHOR_NAME)}`);

  const books = data?.items ?? [];

  if (isLoading) return null;

  const primaryBook = books[0];

  return (
    <>
      <Title text={MSG_SEARCH_AUTHOR_OTHER_WORKS_TITLE} onLoadMore={handleLoadMore} />
      <ul className="flex justify-center px-mobile">
        <li className="flex h-[11.625rem] w-full rounded-[16px] border-[1px] border-neutral-20 shadow-[0_0.375rem_0.9375rem_0_#A0B1C040]">
          <Link to={`/books/${primaryBook.isbn13}`} className="flex h-full w-full min-w-0 gap-5 p-6">
            <div className="shrink-0">
              <BookCover className="w-[6.25rem]" url={primaryBook.coverUrl} variant="clear" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate pb-2 text-title3">{primaryBook.title}</p>
              <p className="line-clamp-5 break-all text-caption1 text-neutral-60">
                {primaryBook.description || MSG_SEARCH_AUTHOR_OTHER_WORKS_EMPTY_DESCRIPTION}
              </p>
            </div>
          </Link>
        </li>
      </ul>
    </>
  );
};
