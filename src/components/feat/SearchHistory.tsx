import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { BiX } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import { getSearchHistories, removeSearchHistory, removeAllSearchHistory } from 'services/search';

import { SearchHistory as SearchHistoryType } from 'types/book';

const SearchHistory = () => {
  const queryClient = useQueryClient();

  const { data: histories } = useQuery({
    queryKey: ['searchHistory'],
    queryFn: getSearchHistories,
  });

  const { mutate: deleteHistory } = useMutation({
    mutationFn: removeSearchHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['searchHistory'] });
    },
  });

  const { mutate: deleteAllHistories } = useMutation({
    mutationFn: removeAllSearchHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['searchHistory'] });
    },
  });

  const handleRemove = (e: React.MouseEvent, { keyword, createdAt }: SearchHistoryType) => {
    e.preventDefault();
    deleteHistory({ keyword, createdAt });
  };

  return (
    <section className="relative px-4 py-2 text-base font-semibold">
      최근검색어
      {histories && histories.length !== 0 && (
        <button
          className="absolute right-4 top-3 text-xs text-sub"
          aria-label="clear button"
          type="button"
          onClick={() => deleteAllHistories()}
        >
          전체삭제
        </button>
      )}
      <ul className="scrollbar-hide mt-3 flex h-6 overflow-x-auto whitespace-nowrap">
        {histories &&
          histories.map(({ keyword, createdAt }) => (
            // TODO : 검색 결과 페이지로 이동
            <li className="mr-2 inline-flex rounded-full border border-sub px-2 py-1 text-xs text-sub" key={createdAt}>
              <Link to="/" className="flex items-center">
                {keyword}
                <button
                  aria-label="remove button"
                  type="button"
                  className="focus:outline-none"
                  onClick={(e) => handleRemove(e, { keyword, createdAt })}
                >
                  <BiX style={{ width: '14px', height: '14px', marginLeft: '4px' }} />
                </button>
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default SearchHistory;
