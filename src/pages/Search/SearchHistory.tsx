import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Link } from 'react-router-dom';

import Icon from 'components/Icon';

import { getSearchHistories, removeSearchHistory, removeAllSearchHistory } from 'services/search';

import { CommonCancel } from 'assets/icons';

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

  const handleRemove = (e: React.MouseEvent, keyword: string) => {
    e.preventDefault();
    deleteHistory(keyword);
  };

  return (
    <section className="relative mt-3 px-4 py-2 text-base font-semibold">
      최근검색어
      {histories && histories.length !== 0 && (
        <button
          className="absolute right-4 top-3 text-xs opacity-70"
          aria-label="clear button"
          type="button"
          onClick={() => deleteAllHistories()}
        >
          전체삭제
        </button>
      )}
      <ul className="scrollbar-hide mt-3 flex h-7 overflow-x-auto whitespace-nowrap">
        {histories &&
          histories.map((keyword) => (
            <li className="mr-3 inline-flex rounded-full border px-2 text-sm opacity-70" key={keyword}>
              <Link to={`?q=${keyword}`} className="flex items-center">
                {keyword}
                <button aria-label="remove button" type="button" onClick={(e) => handleRemove(e, keyword)}>
                  <Icon Component={CommonCancel} size="xs" style={{ marginLeft: '4px' }} />
                </button>
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default SearchHistory;
