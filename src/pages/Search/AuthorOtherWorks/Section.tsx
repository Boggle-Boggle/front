import { Link, useNavigate } from 'react-router-dom';

import BookCover from 'components/BookCover';

import { useAuthorOtherWorksQuery } from './useAuthorOtherWorksQuery';
import { Title } from '../shared/Title';

const MSG_SEARCH_AUTHOR_OTHER_WORKS_TITLE = '{author}의 다른 작품';
const MSG_SEARCH_AUTHOR_OTHER_WORKS_EMPTY_DESCRIPTION = '이 도서의 요약 설명이 존재하지 않습니다.';

export const AuthorOtherWorksSection = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useAuthorOtherWorksQuery();

  if (isLoading || !data) return null;

  const { author, isbn13, title, coverUrl, description } = data;
  const titleText = MSG_SEARCH_AUTHOR_OTHER_WORKS_TITLE.replace('{author}', author);

  const handleLoadMore = () => navigate(`/search/result?q=${encodeURIComponent(author)}`);

  return (
    <>
      <Title text={titleText} onLoadMore={handleLoadMore} />
      <ul className="mb-3 flex justify-center px-mobile">
        <li className="flex h-[11.625rem] w-full rounded-[16px] border-[1px] border-neutral-20 shadow-[0_0.375rem_0.9375rem_0_#A0B1C040]">
          <Link to={`/books/${isbn13}`} className="flex h-full w-full min-w-0 gap-5 p-6">
            <div className="shrink-0">
              <BookCover className="w-[6.25rem]" url={coverUrl} variant="clear" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate pb-2 text-title3">{title}</p>
              <p className="line-clamp-5 break-all text-caption1 text-neutral-60">
                {description || MSG_SEARCH_AUTHOR_OTHER_WORKS_EMPTY_DESCRIPTION}
              </p>
            </div>
          </Link>
        </li>
      </ul>
    </>
  );
};
